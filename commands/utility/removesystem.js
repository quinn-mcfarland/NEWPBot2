const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('removesystem')
        .setDescription('Remove a system from contribution board')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('name of the system')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Is this a bgs or powerplay system')
                .setRequired(true)),
    async execute (interaction) {
        const systemName = interaction.option.getString('name');
        const systemType = interaction.option.getString('type');

        // Search for the system and mark it for garbage collection
        if (systemType.toLowerCase() === 'bgs') {
            for (let i = 0; i < activeBgsSystems.length; i++) {
                if (activeBgsSystems[i].name === systemName) {
                    await activeBgsSystems[i] = null;
                    break;
                }
            }
        } else if (systemType.toLowerCase() === 'powerplay') {
            for (let i = 0; i < activePowerplaySystems.length; i++) {
                if (activePowerplaySystems[i].name === systemName) {
                    await activePowerplaySystems[i] = null;
                    break;
                }
            }
        }
    },
};