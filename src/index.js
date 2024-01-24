require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js');

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

client.on('messageCreate', (message) =>{
    console.log(message);
    if(message.content.toLowerCase().includes('pink floyd')){
        message.reply('Great f band');
    }
});

client.login(process.env.TOKEN);