// Module imports
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;

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
async function writeCmdrData(nick) {
    // Update the object information with new cmdr data
    user.username = nick;
    user.rank = 'Factions Ops';
    // Stringify the data as it stands
    const jsonString = JSON.stringify(user, null, 4);
    // Write the new user data to file
    try {
       await fs.writeFile(`./userdata/${nick}.json`, jsonString);
    } catch (err) {
        console.error(err);
    }
}

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

        await writeCmdrData(targetName);
        await interaction.reply(`Created new user: ${targetName}`)
    },
};