import { ArgsOf, CommandMessage, CommandNotFound, Discord, On, Once } from "@typeit/discord";
import { Client } from "discord.js";
import * as Path from "path";

@Discord("!", {
    import: [
      Path.join(__dirname, "..", "commands", "*.ts"),
    ],
})

  export class DiscordApp {
    @Once('ready')
    onReady(){
      console.info('Im ready!')
    }

    @On("message")
    onMessage([message]: ArgsOf<"message">, client: Client) {
      console.log(`[command]: ${message.content} by ${message.author.username} `)
    }

    @CommandNotFound()
    notFoundA(command: CommandMessage) {
      command.reply("Command not found");
    }
  }