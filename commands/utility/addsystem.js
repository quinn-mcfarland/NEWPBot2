const {SlashCommandBuilder} = require("discord.js");
const effortdata = require("effortdata.js");

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
        const systemName = interaction.options.getString('name');
        const systemType = interaction.options.getString('type');

        try {
            if (systemType.toLowerCase() === 'bgs') {
                effortdata.activeBgsSystems.push(new effortdata.BGSSystem(systemName));
            } else if (systemType.toLowerCase() === 'powerplay') {
                effortdata.activePowerplaySystems.push(new effortdata.PowerplaySystem(systemName));
            } else {
                await interaction.reply({
                    content: `Error creating new system. System must be either BGS or Powerplay.`,
                    flags: MessageFlags.Ephemeral,
                });
            }
        } catch (error) {
            console.error(error);
        }
    },
};