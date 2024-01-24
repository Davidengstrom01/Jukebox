require('dotenv').config();

const { REST, Routes, Application, ApplicationCommand, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'play_music',
        description: 'Lets jamm some',
        options: [
            {
                name: 'plattform',
                description: 'Play music from Youtube or Spotify',
                type: ApplicationCommandOptionType.String,               
                choices: [
                    {
                        name:'spotify',
                        value:'spotify'
                    },
                    {
                        name:'youtube',
                        value:'spotify'
                    }
                ],
                required: true
            },            
            {
                name: 'music_link',
                description: 'Play music from link',
                type: ApplicationCommandOptionType.String,
            },
        ],
    },
];

const rest = new REST({version:'10'}).setToken(process.env.TOKEN);

(async () => {
    try{

        console.log('Registering slash Commands');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Commands registered');

    }catch (error){
        console.log(`There was an error: ${error}`);
    }
})();
