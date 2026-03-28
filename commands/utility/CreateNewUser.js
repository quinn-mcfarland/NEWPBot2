// Module imports
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

// Global Variables
const user = {
    username: '',
    rank: '',
    blackMarket: 0,
    bonds: 0,
    bounties: 0,
    exploration: 0,
    warEffort: 0,
    influence: 0,
    installationDefense: 0,
    murder: 0,
    paxFails: 0,
    warBand: 0,
};

// Helper Functions

// Command Function
module.exports = {
    data: new SlashCommandBuilder().setName('createnewuser').setDescription('Writes a new CMDR file'),
    async execute(interaction) {
        const jsonData = JSON.stringify(user, null, 4);
        fs.writeFile(`userdata/${user.username}.json`, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file', err);
            } else {
                console.log(`Data written to output as ${user.username}`);
            }
        })
        await interaction.reply(`Created a new file for user ${user.username}`);
    },
};