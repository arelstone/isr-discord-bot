import { ArgsOf, On, Client, Command, Infos, CommandMessage } from '@typeit/discord';
import { MessageEmbed } from 'discord.js';
import colors from '../colors';
import Config from '../Config';
export default abstract class WelcomeUser {
    @Command('welcome :user')
    @Infos({
        description: 'Send welcome message to a user',
        hidden: true,
    })
    async welcome(command: CommandMessage<{user: string;}>){
        const user = await command.client.users.fetch(command.args.user.replace(/\D/g, ''));
        
        // @ts-expect-error ignore this
        return command.client.emit('guildMemberAdd', user);
    }

    @On('guildMemberAdd')
    async execute(
        [member]: ArgsOf<'guildMemberAdd'>,
        client: Client,
    ){
        const channel = client.channels.cache.get(Config.get('welcomeChannelId'));        

        // @ts-expect-error ignore
        await channel.send(new MessageEmbed()
            // @ts-expect-error ignore
            .setTitle(`Welcome ${member.username}`)
            .setDescription(`We are currently ${client.users.cache.size} members`)
            .setColor(colors.info)
        );

        return await member.send(
            new MessageEmbed()
                .setTitle('I am so glad to meet you.')
                .setDescription('I can do all sorts of cool stuff')
                .setColor(colors.info)
                .addFields([
                    {
                        name: 'Commands',
                        value: 'I can do all sort of cool stuff.\n\nHere is a  preview of what I can do',
                    },
                    ...Client.getCommands()
                        .filter(cmd => cmd.infos.inWelcomeMessage)
                        .map(cmd => ({
                            name: `${cmd.prefix}${cmd.commandName}`,
                            value: `${cmd.description}`,
                        })),
                ])
        );
    }
}
