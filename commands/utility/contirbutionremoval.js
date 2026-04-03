const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const { activeBgsSystems, activePowerplaySystems} = require('/Users/quinnmcfarland/Repos/NEWPBot2/effortdata.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('contributionremoval')
        .setDescription('Remove an erroneous contribution')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('The name of the system to log')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('activity')
                .setDescription('The activity you are logging.')
                .setRequired(true))
        .addNumberOption((option) =>
            option
                .setName('amount')
                .setDescription('How much of this activity you did')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

        // Get Interaction data
        const systemName = (interaction.options.getString('name')).toLowerCase();
        const activity = (interaction.options.getString('activity')).toLowerCase();
        let contributionAmount = interaction.options.getNumber('amount');
        const fileName = './userdata/' + interaction.user.username + '.json';

        // Get other relevant data
        let userData = JSON.parse(await fs.readFile(fileName, 'utf8'));
        let amountToWrite;
        const powerplayIndex = activePowerplaySystems.findIndex((system) => {
            return system.name === systemName;
        });
        const bgsIndex = activeBgsSystems.findIndex((system) => {
            return system.name === systemName;
        });

        // Powerplay Logging to System

        // BGS Logging to System
        try {
            if (bgsIndex > -1) {
                // non-war contributions
                if (activity === 'blackMarket' || activity === 'bonds' || activity === 'bounties' || activity === 'exploration' ||
                    activity === 'influence' || activity === 'installationdefense' || activity === 'murder' || activity === 'paxfails' || activity === 'warband') {
                    activeBgsSystems[bgsIndex][activity] -= contributionAmount;
                }
                // Space War Effort Contributions
                else if (activity === 'lcz') {
                    activeBgsSystems[bgsIndex].spaceWarEffort -= contributionAmount;
                } else if (activity === 'mcz') {
                    contributionAmount *= 2;
                    activeBgsSystems[bgsIndex].spaceWarEffort -= contributionAmount;
                } else if (activity === 'hcz') {
                    contributionAmount *= 3;
                    activeBgsSystems[bgsIndex].spaceWarEffort -= contributionAmount;
                }
                // Ground War Effort Contributions
                else if (activity === 'glcz') {
                    activeBgsSystems[bgsIndex].groundWarEffort -= contributionAmount;
                } else if (activity === 'gmcz') {
                    contributionAmount *= 2;
                    activeBgsSystems[bgsIndex].groundWarEffort -= contributionAmount;
                } else if (activity === 'ghcz') {
                    contributionAmount *= 3;
                    activeBgsSystems[bgsIndex].groundWarEfforrt -= contributionAmount;
                } else {
                    interaction.editReply({
                        content: `[ERROR] ${activity} is not a valid contribution activity.`,
                        flags: MessageFlags.Ephemeral
                    });
                }
            }

            if (powerplayIndex > -1) {
                if (activity === 'acquisition') {
                    activePowerplaySystems[powerplayIndex].acquisition -= contributionAmount;
                    activePowerplaySystems[powerplayIndex].controlPoints -= Math.floor(contributionAmount / 4);
                } else if (activity === 'reinforcement') {
                    activePowerplaySystems[powerplayIndex].reinforcement -= contributionAmount;
                    activePowerplaySystems[powerplayIndex].controlPoints -= Math.floor(contributionAmount / 2.08);
                } else if (activity === 'undermining') {
                    activePowerplaySystems[powerplayIndex].undermining -= contributionAmount;
                    activePowerplaySystems[powerplayIndex].controlPoints -= Math.floor(contributionAmount / 4.6);
                } else {
                    interaction.editReply({
                        content: `[ERROR] ${activity} is not a valid contribution activity.`,
                        flags: MessageFlags.Ephemeral
                    });
                }
            }

            if (powerplayIndex === -1 && bgsIndex === -1)
            {
                interaction.editReply({
                    content: `[ERROR] ${systemName} not found as a current system.`,
                    flags: MessageFlags.Ephemeral
                });
            }
        } catch (error) {
            console.error(error);
        }

        // Write data to the user file
        try {
            // Overwrite old data with new data
            amountToWrite = userData[activity] - contributionAmount;
            userData[activity] = amountToWrite;

            // Write new data to file
            let newUserData = JSON.stringify(userData, null, 4);
            await fs.writeFile(fileName, newUserData, 'utf8');

            interaction.editReply(`${contributionAmount} points removed from ${activity} in ${systemName}, logged by ${userData.username}`);
        } catch (error) {
            console.error(error);
        }
    },
};