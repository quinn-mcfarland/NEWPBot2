// Library Inclusions
#include <dpp/dpp.h>
// Header Inclusions
#include "cmdrClass.h"
// Global Constants
const std::string BOT_TOKEN = "MTQ4MTQ2NzY4NDEyMDk1MzAzNQ.GYTeL8.c72ITdD6ulT3BRuKeaM6Cwbv_a9ukG0ZRyEv0c";
// Global Variables
// Function Prototypes
// Main Function
int main() {
	// Create new bot cluster
	dpp::cluster bot(BOT_TOKEN);

	// log events to stdcout
	bot.on_log(dpp::utility::cout_logger());

	// Handle slash commands
	bot.on_slashcommand([](const dpp::slashcommand_t& event) {
		if (event.command.get_command_name() == "ping") {
			event.reply("Pong!");
		}
	});

	// Register slash commands
	bot.on_ready([&bot](const dpp::ready_t& event) {
		if (dpp::run_once<struct register_bot_commands>()) {
			bot.global_command_create(dpp::slashcommand("ping", "Ping pong!", bot.me.id));
		}
	});

	// Start the bot
	bot.start(dpp::st_wait);

	return 0;
}
// Function Definitions