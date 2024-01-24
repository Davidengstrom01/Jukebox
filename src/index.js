require('dotenv').config();

const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

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

client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'play_music'){
               
        if (interaction.member.voice.channel) {
            const channel = interaction.member.voice.channel;
            try {
                // Join the voice channel
                const connection = joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                });
                await interaction.reply('Joined your voice channel!');
            } catch (error) {
                console.error(error);
                await interaction.reply('Failed to join your voice channel.');
            }
        } else {
            await interaction.reply('You need to be in a voice channel!');
        }

        const platform = interaction.options.getString('plattform');
        
        const embed = new EmbedBuilder()
        .setTitle('DJ_Bad is playing')
        .setDescription('platform')
        .setColor('Random');
    }
});


client.on('messageCreate', (message) =>{
    console.log(message);
    if(message.content.toLowerCase().includes('pink floyd')){
        message.reply('Great f band');
    }
});

client.login(process.env.TOKEN);