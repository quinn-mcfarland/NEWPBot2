// Module Imports
const { SlashCommandBuilder, TextDisplayBuilder, MessageFlags } = require('discord.js');
const { activeBgsSystems, activePowerplaySystems, BGSSystem } = require('/Users/quinnmcfarland/Repos/NEWPBot2/effortdata.js');

// Variables

// Helper Functions
async function displayTableBuilder(startingArray, tableType) {

}

// Text Display Component

// Command Execution
activeBgsSystems.push(new BGSSystem('test1'));
activeBgsSystems.push(new BGSSystem('test2'));
activeBgsSystems.push(new BGSSystem('test3'));
displayTableBuilder(activeBgsSystems, 'BGS');