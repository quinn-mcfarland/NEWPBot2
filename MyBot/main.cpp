#include "MyBot.h"
#include <dpp/dpp.h>

const std::string BOT_TOKEN = "MTQ4MTQ2NzY4NDEyMDk1MzAzNQ.GcMJLi.sBMBK5Asc74bHEjfSAQBn316nVStZeNVn-OI3Q";
const std::string 

int main()
{
	/* Create bot cluster */
	dpp::cluster bot(BOT_TOKEN);

	/* Output simple log messages to stdout */
	bot.on_log(dpp::utility::cout_logger());

	/* Register slash command here in on_ready */
	bot.on_ready([&bot](const dpp::ready_t& event) {
		/* Wrap command registration in run_once to make sure it doesnt run on every full reconnection */
		if (dpp::run_once<struct register_bot_commands>()) {
			std::vector<dpp::slashcommand> commands {
				{ "ping", "Ping pong!", bot.me.id }
			};

			bot.global_bulk_command_create(commands);
		}
	});

	/* Handle slash command with the most recent addition to D++ features, coroutines! */
	bot.on_slashcommand([](const dpp::slashcommand_t& event) -> dpp::task<void> {
		if (event.command.get_command_name() == "ping") {
			co_await event.co_reply("Pong!");
		}
		co_return;
	});

	/* Start the bot */
	bot.start(dpp::st_wait);

	return 0;
}
