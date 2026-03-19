// Library Inclusions
#include<dpp/dpp.h>

// Header Inclusions
#include"MyBot.h"
#include"cmdrClass.h"

// Global Constants
const std::string BOT_TOKEN = "MTQ4MTQ2NzY4NDEyMDk1MzAzNQ.GsvzZn.kr-GlGNkiXCuPSMuqEIEaFhkKgbbzKjk8nuZ5A";
const dpp::snowflake MY_GUILD_ID = 529089208254464001;

// Global Variables

// Function Prototypes

// Main Function
int main() {
	// Create a new bot cluster
	dpp::cluster bot(BOT_TOKEN);

	// Output log information to console
	bot.on_log(dpp::utility::cout_logger());

	// Handle slash commands
	bot.on_slashcommand([](const dpp::slashcommand_t& event) {
		// Check which command was used
	});

	// Register bot commands on ready
	bot.on_ready([&bot](const dpp::ready_t& event) {
		if (dpp::run_once<struct register_bot_commands>()) {
			// Create commands here
		}
	});

	// Start the bot
	bot.start(dpp::st_wait);
	
	return 0;
}

// Function Definitions
