import { Command, CommandMessage, Infos } from '@typeit/discord';
import { MessageAttachment } from 'discord.js';
import calendar from './stubs/calendar';

export default abstract class Calendar {
    @Command('calendar')
    @Infos({
        description: 'Wanna know when we have events?',
    })

    async execute(command: CommandMessage){
        const { type } = command.channel;

        return await command[type === 'dm' ? 'author' : 'member'].send(this.message(command));
    }

    private message(command: CommandMessage) {
        return {
            embed: {
                title: `${command?.guild?.name ?? 'Our'} event calendar`,
                description: [
                    '**We love racing.**',
                    'Find the event suited for you, join channel and start racing',
                    'Our event calendar is as follows.',
                ].join('\n'),
                files: [new MessageAttachment('./src/assets/cover-image.png')],
                fields: this.events(command),
            },
        };
    }

    private events(command: CommandMessage){        
        return Object.keys(calendar).map(day => {
            const value = calendar[day].map(({game, startingAt, host, description, channel}) => {
                const channelId = channel &&  command.guild?.channels.cache.find(c => c.name === channel);
                const hostId = host && command.guild?.members.cache.find(member => member.displayName === host);
                
                return [
                    `Game: **${game}**`,
                    `When: **${startingAt}**`,
                    (host || hostId) && `Host: ${hostId ?? host}`,
                    !!channelId && `${channelId} for more info`,
                    !!description && `${description}`,
                ]
                    .filter(Boolean)
                    .join('\n');
            }).join('\n\n');
    
            return {
                inline: false,
                name: day,
                value: value || '',
            };
        });
    }
}
