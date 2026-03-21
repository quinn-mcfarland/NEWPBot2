/* Current Issues
 * Memory is leaking on what should be dynamically allocated objects, which means they need to be created, backed up
 * to storage, and then destroyed. Consider databasing locally, writing to JSON file, or txt file. ENSURE MEMORY IS
 * DEALLOCATED, THE PROGRAM CURRENTLY LEAKS MEMORY AND ASSIGNS IT TO OBJECTS INEFFICIENTLY. Memory inefficiency doesn't
 * matter as much when it's deallocated properly.
 */

// Library Inclusions
#include <dpp/dpp.h>
#include <string>
#include <fstream>
// Header Inclusions
#include "cmdrClass.h"
// Global Constants
const std::string BOT_TOKEN = "MTQ4MTQ2NzY4NDEyMDk1MzAzNQ.GYTeL8.c72ITdD6ulT3BRuKeaM6Cwbv_a9ukG0ZRyEv0c";
// Global Variables
std::string userNickname; // server nickname of a user
std::string dynamicFilename = userNickname + ".bin"; // This will set each binary file named after the cmdr whose data it contains
std::ofstream outFile(dynamicFilename); // Variable to write to file
std::ifstream inFile(dynamicFilename); // Variable to read from file
// Function Prototypes
// Main Function
int main() {
	// Create new bot cluster
	dpp::cluster bot(BOT_TOKEN);

	// log events to stdcout
	bot.on_log(dpp::utility::cout_logger());

	// Handle slash commands
	bot.on_slashcommand([](const dpp::slashcommand_t& event) {
		if (event.command.get_command_name() == "createnewuser") {
			// Fetch parameter value from command options
			dpp::snowflake user_id = std::get<dpp::snowflake>(event.get_parameter("user"));

			// Get member object from resolved list
			dpp::guild_member resolved_member = event.command.get_resolved_member(user_id);

			// Create new cmdr class object for the user, set nickname, and rank
			cmdrClass* cmdr = new cmdrClass();
			cmdr->setCmdrName(resolved_member.get_nickname());
			cmdr->setRank("Faction Ops");

			// Write data to a binary file named after them
			userNickname = resolved_member.get_nickname();
			outFile.open(dynamicFilename);
			outFile << &cmdr;

			// Close the file
			outFile.close();

			// Reply that a new member was created
			event.reply("Object for " + cmdr->getCmdrName() + " was created.");

			// Destroy the object and deallocate memory
			delete cmdr;
			cmdr = nullptr;
		}
	});

	// Clear slash command before running new ones
	bot.on_ready([&bot](const dpp::ready_t& event) {
		if (dpp::run_once<struct clear_bot_commands>()) {
			bot.global_bulk_command_delete();
		}
	});

	// Register slash commands
	bot.on_ready([&bot](const dpp::ready_t& event) {
		if (dpp::run_once<struct register_bot_commands>()) {
			// Register command name
			dpp::slashcommand createnewuser("createnewuser", "Create a new user", bot.me.id);

			// Add command options
			createnewuser.add_option(dpp::command_option(dpp::co_user, "user", "user to create", true));

			// Creat the command
			bot.global_command_create(createnewuser);
		}
	});

	// Start the bot
	bot.start(dpp::st_wait);

	return 0;
}
// Function Definitions