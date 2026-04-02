const {SlashCommandBuilder} = require('discord.js');
const effortdata = require('/Users/quinnmcfarland/Documents/GitHub/NEWPBot2/effortdata.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addsystem')
        .setDescription('Add a system to the contribution board')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('The name of the system to add')
                .setRequired(true))
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Is this a BGS or Powerplay system')
                .setRequired(true)),
    async execute(interaction) {
        // Defer reply as early as possible (this should be on all commands)
        await interaction.deferReply();

        // Get relevant interaciton data
        const systemName = interaction.options.getString('name');
        const systemType = (interaction.options.getString('type')).toLowerCase();

        // Create the new system in the relevant array
        try {
            if (systemType === 'bgs') {
                effortdata.activeBgsSystems.push(new effortdata.BGSSystem(systemName));
            } else if (systemType === 'powerplay') {
                effortdata.activePowerplaySystems.push(new effortdata.PowerplaySystem(systemName));
                await interaction.editReply(`Created new system ${systemName}`);
            } else {
                await interaction.editReply({
                    content: `Error creating new system. System must be either BGS or Powerplay.`,
                    flags: MessageFlags.Ephemeral,
                });
            }
        } catch (error) {
            console.error(error);
        }
    },
};