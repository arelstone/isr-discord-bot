import { CommandMessage } from '@typeit/discord'
import Config from '../../Config'
import calendar from '../stubs/calendar'

export const calendarEventsFields = ({guild: {channels, members}}: CommandMessage)=> {
    return Object.keys(calendar).map(day => {
        const value = calendar[day].map(({game, startingAt, host, description, channel}) => {
            const channelId = channels.cache.find(c => c.name === channel)
            const hostId = members.cache.find(member => member.displayName === host)
            
            return [
                `Game: **${game}**`,
                `When: **${startingAt}**`,
                `Host: ${hostId || host}`,
                !!channelId && `${channelId} for more info`,
                !!description && `${description}`,
            ]
            .filter(Boolean)
            .join('\n')
        }).join('\n\n')

        return {
            inline: false,
            name: day,
            value: value || ''
        }
    })
}