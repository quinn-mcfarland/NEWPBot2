const {SlashCommandBuilder} = require("discord.js");
const effortdata = require("effortdata.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('displayeffortboard')
        .setDescription('Display current systems')
        .addChannelOption((option) =>
            option
                .setName('channel')
                .setDescription('The channel to post an effort board into')
                .setRequired(true)),
    async execute(interaction) {

    },
};