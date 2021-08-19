import { ArgsOf, On, Client, Command, Infos, CommandMessage } from '@typeit/discord';
import { Message, MessageEmbed } from 'discord.js';
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
            .setTitle(`Welcome ${member?.username || ''}. Nice of you to join us!`)
            .setColor(colors.info)
        );

        await member.send(
            new MessageEmbed().
                setTitle('Welcome to the ISR discord server')
                .setDescription('Welcome to the ISR discord server. I\'m Max Power, the ISR discord bot.')
                .setColor(colors.info)
                .addField(
                    'Welcome',
                    [
                        'Welcome to the ISR discord server. I\'m Max Power, the ISR discord bot.',
                        '',
                        'I\'m here to help you. Below you will see what to do and what channels to join for all of our championchips.',
                        'For information about when we are racing type the **!calendar** command',
                        '',
                        'Got any other questions. Feel free to post them in #isr-general',
                    ].join('\n'),
                    false
                )
                .addField(
                    'Gran Turismo Sport', 
                    [
                        'If you are here for gtsport, all the channels prefixed with **gtsport-**',
                        '',
                        '**Friday**',
                        'If you are here for the friday championship, please write @axel_racing in #gtsport-friday',
                        '',
                        '** Sunday**',
                        'Sunday is the main event on gtsport. Where we race in two rooms. If you with to part take in this please singup in #gtsport-sunday-signup',
                        'After signing up you will be allocated to one of the two rooms.',
                    ].join('\n'),
                    false)
                .addField(
                    'Assetto Corsa Competizione',
                    [
                        'If you are here for one of the acc leagues, we are currently running one on Saturdays and one on wednesday',
                        '',
                        '** Wednesday **',
                        'The midweek league runs on Wednesdays. Join #acc-midweek-league for more info',
                        '',
                        '** Saturday **',
                        'If you are here for the saturday leagues please join #acc-saturday-league for more info',
                    ].join('\n'),
                    false)
                
        );

        /**
         * // '**Gran Turismo Sport**',
                            // 'If you are here for gran turismio sport, and want to join the sunday league, you can signup in the #gtsport-sunday-signup channel.',
                            // 'After signing up you will be reffered to either room one or two.',
                            // '',
                            // '**Asseto Corsa Competizione**',
                            // 'If you here for one of the acc leagues, join can find them in the channels prefixed with acc.',
                            // '',
                            // '',
         */

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
