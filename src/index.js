require('dotenv').config();

const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, IntentsBitField, EmbedBuilder, Collection } = require('discord.js');
const { Player } = require('@discord-player');

const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates,
    ],
});

client.on('ready', (c) => {
    console.log("DJ Bad has entered the building")
}); 

//Load Commands
const commands = [];
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);
    commands.push(command);
}

//Creating Player
client.Player =  new Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});

client.on('ready', () => {
    const guild_ids = client.guilds.cache.map(guild => guild.id);

    const rest = new REST({version: '9'}).setToken(process.env.TOKEN);
    for(const guildId of guild_ids){
        rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
            body: commands
        }).then(() => console.log(`Added commands to ${guildId}`)).catch(console.error);
    }
} );

//handle commands
client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try{
        await command.execute({client, interaction});
    }
    catch(error){
        console.error(error);
        await interaction.reply('An error occurred while executing that command.');
    }
});


client.on('messageCreate', (message) =>{
    console.log(message);
    if(message.content.toLowerCase().includes('pink floyd')){
        message.reply('Great f band');
    }
});

client.login(process.env.TOKEN);