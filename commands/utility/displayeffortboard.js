// Module Imports
const { SlashCommandBuilder, TextDisplayBuilder, MessageFlags} = require('discord.js');
const { activeBgsSystems, activePowerplaySystems } = require('/Users/quinnmcfarland/Repos/NEWPBot2/effortdata.js');
const { createTable } = require('@visulima/tabular');

// Variables
const displayTable = createTable({
    showHeader: true,
    style: {
        paddingLeft: 2,
        paddingRight: 2,
    },
});

// Helper Functions
async function displayTableBuilder(startingArray) {
    // Create arrays for each of the necessary dynamic output values
    let headingArray = [];
    let keyArray = Object.keys(startingArray[0]);

    // Header Builder (row a)
    try {
        for (let a = 0; a < startingArray.length; a++) {
            headingArray.push(startingArray[a].name);
        }
        await displayTable.setHeaders(headingArray);
    } catch(error) {
        console.error(error);
    }

    // Row Builder
    try {
        for (let b = 1; b < keyArray.length; b++) {
            let currentRow = [];

            for (let c = 0; c < startingArray.length; c++) {
                let valueArray = Object.values(startingArray[c]);
                currentRow.push(`${keyArray[b].substring(1)}: ${valueArray[b]}`);
            }
            await displayTable.addRow(currentRow);
        }
    } catch(error) {
        console.error(error);
    }
}

// Text Display Component
const effortBoardTextDisplay = new TextDisplayBuilder().setContent(
    '```' + displayTable.toString() + '```',
);

// Command Execution
module.exports = {
    data: new SlashCommandBuilder()
        .setName('displayeffortboard')
        .setDescription('Create an effort board and send it to a channel to be tracked')
        .addStringOption((option) =>
            option
                .setName('boardtype')
                .setDescription('Is this a BGS or Powerplay board')
                .setRequired(true)),
    async execute(interaction) {
        // Defer reply
        await interaction.deferReply();

        // Grab Interaction Data
        const boardType = (interaction.options.getString('boardtype')).toLowerCase();
        let channel;

        // Differentiate what happens between BGS or Powerplay
        try {
            if (boardType === 'bgs') {
                await displayTableBuilder(activeBgsSystems);
                channel = await client.channels.fetch('1483314368748847308');
                await channel.send({
                    components: [effortBoardTextDisplay],
                    flags: MessageFlags.IsComponentV2,
                });
            } else if (boardType === 'powerplay') {
                await displayTableBuilder(activePowerplaySystems);
                channel = await client.channels.fetch('1483314368748847308');
                await channel.send({
                    components: [effortBoardTextDisplay],
                    flags: MessageFlags.IsComponentV2,
                });
            } else {
                await interaction.editReply({
                    content: `[ERROR] boardtype must be either BGS or Powerplay`,
                    flags: MessageFlags.Ephemeral,
                });
            }
        } catch (error) {
            console.error(error);
            interaction.editReply(`[ERROR] ${error}`);
        }
    },
};