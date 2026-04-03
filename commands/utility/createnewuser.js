// Module imports
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const { User } = require('/Users/quinnmcfarland/Repos/NEWPBot2/effortdata.js');

// Command Function
module.exports = {
    data: new SlashCommandBuilder()
        .setName('createnewuser')
        .setDescription('Writes a new CMDR file')
        .addUserOption((option) =>
            option
                .setName('target')
                .setDescription('The new user to onboard')
                .setRequired(true)),
    async execute(interaction) {
        const targetName = interaction.options.getUser('target').username;

        // Create a new User object
        let user = new User(targetName);
        // Stringify the data as it stands
        const jsonString = JSON.stringify(user, null, 4);
        // Write the new user data to file
        try {
            await fs.writeFile(`./userdata/${targetName}.json`, jsonString);
            user = null;
        } catch (err) {
            console.error(err);
        }
        await interaction.reply(`Created new user: ${targetName}`);
    },
};