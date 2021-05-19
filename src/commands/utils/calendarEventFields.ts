import { CommandMessage } from '@typeit/discord';
import calendar from '../stubs/calendar';

export const calendarEventsFields = ({guild}: CommandMessage)=> {
    return Object.keys(calendar).map(day => {
        const value = calendar[day].map(({game, startingAt, host, description, channel}) => {
            const channelId = channel &&  guild.channels.cache.find(c => c.name === channel);
            const hostId = host&& guild.members.cache.find(member => member.displayName === host);
            
            return [
                `Game: **${game}**`,
                `When: **${startingAt}**`,
                `Host: ${hostId ?? host}`,
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
};
