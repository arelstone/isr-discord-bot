import { Command, CommandMessage, Infos } from '@typeit/discord';

export default abstract class Channels {
    @Command('channels')
    @Infos({description: 'Get a list of all channels', hidden: true})
    async execute(command: CommandMessage) {
        // console.log(command.client.channels);
        const channels = command.client.channels.cache.filter(c => c.isText());

        console.log(channels);
        
        
        return await command.reply(JSON.stringify(channels, null, 2));
    }
}
