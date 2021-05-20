import { Command, CommandMessage, Infos } from '@typeit/discord';

export default abstract class Channels {
    @Command('channels')
    @Infos({description: 'Get a list of all channels', hidden: true})
    async execute(command: CommandMessage) {
        const channels = command.guild.channels.cache.map(channel => ({id: channel.id, name: channel.name}));
        
        return await command.author.send(JSON.stringify(channels, null, 2));
    }
}
