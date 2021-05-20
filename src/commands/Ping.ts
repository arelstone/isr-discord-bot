
import { Command, CommandMessage, Infos } from '@typeit/discord';

export default abstract class Ping {
  @Command('ping')
  @Infos({description: 'Pong', hidden: true})
    async execute(command: CommandMessage) {
        const duration = Date.now() - command.createdTimestamp;
        const { type } = command.channel;

        return await command[type === 'dm' ? 'author' : 'member'].send(`Pong! ${duration}ms`);
    }
}
