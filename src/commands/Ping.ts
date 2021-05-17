
import { Command, CommandMessage, Description } from '@typeit/discord';

export default abstract class Ping {
  @Command('ping')
  @Description('Pong')
    async execute(command: CommandMessage) {
        console.log('Command: Ping');
        
        return await command.reply('Pong');
    }
}
