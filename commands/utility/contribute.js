const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs').promises;
const { StarSystem, BGSSystem, PowerplaySystem, activeBgsSystems, activePowerplaySystems } = require('/Users/quinnmcfarland/Documents/GitHub/NEWPBot2/effortdata.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('contribute')
        .setDescription('Log your effort contributions')
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
        const contributionAmount = interaction.options.getNumber('amount');
        const fileName = './userdata/' + interaction.user.username + '.json';

        // Get other relevant data
        let userData = await fs.readFile(fileName, 'utf8');
        let amountToWrite = contributionAmount;
        // Arrays are not finding indices properly
        const powerplayIndex = activePowerplaySystems.findIndex((system) => {
            return system == systemName;
        });
        const bgsIndex = activeBgsSystems.findIndex((system) => {
            return system == systemName;
        });

        // Write data to the relevant system

        // Powerplay Logging
        if (powerplayIndex > -1) {
            if (activity === 'acquisition' || activity === 'reinforcement' || activity === 'undermining') {
                activePowerplaySystems[powerplayIndex][activity] += contributionAmount;
                activePowerplaySystems[powerplayIndex].merits += contributionAmount;
                console.log(activePowerplaySystems[powerplayIndex]);
                console.log(userData);
                console.log(fileName);
            }
        }
    },
};