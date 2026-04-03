const {SlashCommandBuilder} = require("discord.js");
const effortdata = require('/Users/quinnmcfarland/Repos/NEWPBot2/effortdata.js');

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
        const systemName = interaction.options.getString('name');
        const systemType = interaction.options.getString('type');

        // Search for the system and mark it for garbage collection
        if (systemType.toLowerCase() === 'bgs') {
            for (let i = 0; i < effortdata.activeBgsSystems.length; i++) {
                if (effortdata.activeBgsSystems[i].name === systemName) {
                    effortdata.activeBgsSystems[i] = null;
                    break;
                }
            }
        } else if (systemType.toLowerCase() === 'powerplay') {
            for (let i = 0; i < effortdata.activePowerplaySystems.length; i++) {
                if (effortdata.activePowerplaySystems[i].name === systemName) {
                    effortdata.activePowerplaySystems[i] = null;
                    break;
                }
            }
        } else {
            interaction.reply ({
                content: `[ERROR] System ${systemName} not found.`,
                flags: MessageFlags.Ephemeral
            });
        }
    },
};