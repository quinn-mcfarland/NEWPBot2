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

const filename = user.username + '.json';

// Helper Functions
async function writeCmdrData() {
    user.username = //username argument;
        user.rank = 'Factions Ops';
    // Grant Faction Ops role here (will need manage roles permission)

    // Write the new user data to file
    let fileHandle;

    try {
        // Open file for writing and create it if it doesn't exist
        fileHandle = await fs.open(filename, 'w');

        // Write JSON content to file
        await fileHande.write(user);

        console.log(`Successfully wrote data to ${fileHandle}`);
    } catch (err) {
        console.error(`Error writing to file:`, err);
    } finally {
        // Close file handle
        if (fileHandle) {
            await fileHandle.close();
        }
    }
}

// Command Function
module.exports = {
    data: new SlashCommandBuilder().setName('createnewuser').setDescription('Writes a new CMDR file'),
    async execute(interaction) {
        writeCmdrData();
        interaction.reply(`Created new user ${user.username}`)
    },
};