import { Command, CommandMessage, Infos } from '@typeit/discord';

export default abstract class Channels {
    @Command('whois :user')
    @Infos({description: 'Get info about a user', hidden: true})
    async execute(command: CommandMessage) {
        const {user} = command.args;

        const u = await command.guild.members.fetch({user: user.replace('<@!', '').replace('>', '')});
        
        return await command.reply(JSON.stringify(u, null, 2));
    }
}
