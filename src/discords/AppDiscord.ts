import { ArgsOf, CommandMessage, CommandNotFound, Discord, DiscordEvents, On, Once } from "@typeit/discord";
import * as Path from "path";
import Config from "../Config";

@Discord("!", {
    import: [
      Config.isProduction() 
        ? Path.join(__dirname, "..", "..", "build", "commands", "*.js")
        : Path.join(__dirname, "..", "commands", "*.ts")
    ],
})

  export class DiscordApp {
    @Once('ready')
    onReady(){
      console.info('Im ready!')
    }

    @On("message")
    onMessage([message]: ArgsOf<"message">) {
      console.log(`[${new Date().toISOString()}]: ${message.content} by ${message.author.username}\n`)
    }

    @CommandNotFound()
    async commandNotFound(command: CommandMessage) {
      return await command.reply(
        [
          `I'm sorry. I did not understand.`,
          "Try __!help__ to get help",
        ].join('\n')
      );
    }
  }