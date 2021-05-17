
import { Command, CommandMessage, Description, Guard } from "@typeit/discord";

export default abstract class Ping {
  @Command('ping')
  @Description('Pong')
  async execute(command: CommandMessage) {
    return await command.reply("Pong");
  }
}