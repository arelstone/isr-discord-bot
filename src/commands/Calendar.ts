import { Command, CommandMessage, Description } from '@typeit/discord';
import { MessageAttachment } from 'discord.js';
import { calendarEventsFields } from './utils/calendarEventFields';

export default abstract class Calendar {
    @Command('calendar')
    @Description('Wanna know when we have events?')
    async execute(command: CommandMessage){
        return await command.channel.send({
            embed: {
                title: `${command.guild.name} event calendar`,
                description: `We love racing.
                
Our event calendar is as follows.
Find the event suited for you, join channel and start racing`,
                files: [new MessageAttachment('./src/assets/cover-image.png')],
                fields: calendarEventsFields(command),
            },
        });
    }
}
