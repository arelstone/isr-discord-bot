import { ArgsOf, CommandMessage, CommandNotFound, Discord, On } from "@typeit/discord";
import { Client } from "discord.js";
import * as Path from "path";

@Discord("!", {
    import: [
      Path.join(__dirname, "..", "commands", "*.ts"),
    ],
})

  export class DiscordApp {
    @On("message")
    onMessage([message]: ArgsOf<"message">,client: Client) {
      console.log(message);
    }

    @CommandNotFound()
    notFoundA(command: CommandMessage) {
      command.reply("Command not found");
    }
  }