// Library and Module Imports
const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const effortdata = require('effortdata.js');

// Command Execution
module.exports = {
    data: new SlashCommandBuilder()
        .setName('contribute')
        .setDescription('Log your contributions')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('Name of star system')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('activity')
                .setDescription('Your contribution activity')
                .setRequired(true))
        .addNumberOption((option) =>
            option
                .setName('amount')
                .setDescription('How much you did')
                .setRequired(true)),
    async execute (interaction) {
        const systemName = interaction.option.getString('name');
        const activity = interaction.option.getString('activity');
        const contributionValue = interaction.option.getNumber('amount');

        // Comb the user data and add their contributions in

        if (activity.toLowerCase() === 'acquisition' || activity.toLowerCase() === 'reinforcement' || activity.toLowerCase() === 'undermining') {
            for (let i = 0; i < effortdata.activePowerplaySystems.length; i++) {
                if (systemName === effortdata.activePowerplaySystems[i].name) {
                    if (activity.toLowerCase() === 'acquisition') {
                        effortdata.activePowerplaySystems[i].acquisition += contributionValue;
                    } else if (activity.toLowerCase() === 'reinforcement') {
                        effortdata.activePowerplaySystems[i].reinforcement += contributionValue;
                    } else {
                        effortdata.activePowerplaySystems[i].undermining += contributionValue;
                    }
                    effortdata.activePowerplaySystems[i].merits += contributionValue;
                    break;
                }
            }
        } else {
            for (let i = 0; i < effortdata.activeBgsSystems.length; i++) {
                if (systemName === effortdata.activeBgsSystems[i].name) {
                    if (activity.toLowerCase() === 'bonds') {
                        await effortdata.activeBgsSystems[i].bonds += contributionValue;
                    } else if (activity.toLowerCase() === 'bounties') {
                        await effortdata.activeBgsSystems[i].bounties += contributionValue;
                    } else if (activity.toLowerCase() === 'exploration') {
                        await effortdata.activeBgsSystems[i].exploration += contributionValue;
                    } // War Effort calculations
                    else if (activity.toLowerCase() === 'lcz') {
                        await effortdata.activeBgsSystems[i].warEffort += contributionValue;
                    } else if (activity.toLowerCase() === 'mcz') {
                        await effortdata.activeBgsSystems[i].warEffort += (contributionValue * 2);
                    } else if (activity.toLowerCase() === 'hcz') {
                        await effortdata.activeBgsSystems[i].warEffort += (contributionValue * 4);
                    } else if (activity.toLowerCase() === 'glcz') {
                        await effortdata.activeBgsSystems[i].warEffort += (contributionValue / 4);
                    } else if (activity.toLowerCase() === 'gmcz') {
                        await effortdata.activeBgsSystems[i].warEffort += (contributionValue / 2);
                    } else if (activity.toLowerCase() === 'ghcz') {
                        await effortdata.activeBgsSystems[i].warEffort += contributionValue;
                    } // Continue other non-War Effort calculations
                    else if (activity.toLowerCase() === 'influence') {
                        await effortdata.activeBgsSystems[i].influence += contributionValue
                    } else if (activity.toLowerCase() === 'installationdefense') {
                        await effortdata.activeBgsSystems[i].installationDefense += contributionValue;
                    } else if (activity.toLowerCase() === 'murder') {
                        await effortdata.activeBgsSystems[i].murder += contributionValue;
                    } else if (activity.toLowerCase() === 'paxfails') {
                        await effortdata.activeBgsSystems[i].paxFails += contributionValue;
                    } else if (activity.toLowerCase() === 'trade') {
                        await effortdata.activeBgsSystems[i].trade += contributionValue;
                    } else if (activity.toLowerCase() === 'warband') {
                        await effortdata.activeBgsSystems[i].warband += contributionValue;
                    } else if (activity.toLowerCase() === 'blackmarket') {
                        await effortdata.activeBgsSystems[i].blackMarket += contributionValue;
                    } else {
                        await interaction.reply({
                            content: 'You did not enter a valid activity. Check the pins for syntax',
                            flags: MessageFlags.Ephemeral
                        });
                    }
                    break;
                }
            }
        }
    }
};