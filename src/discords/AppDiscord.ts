import { ArgsOf, CommandMessage, CommandNotFound, Discord, On, Once } from '@typeit/discord';
import * as Path from 'path';
import Config from '../Config';

const PREFIX = '!';

@Discord(PREFIX, {
    import: [
        Config.isProduction() 
            ? Path.join(__dirname, '..', '..', 'build', 'commands', '*.js')
            : Path.join(__dirname, '..', 'commands', '*.ts'),
        Config.isProduction() 
            ? Path.join(__dirname, '..', '..', 'build', 'events', '*.js')
            : Path.join(__dirname, '..', 'events', '*.ts'),
    ],
})

export class DiscordApp {
    private now(): string {
        return new Date().toISOString();
    }

    @Once('ready')
    onReady(){        
        console.info(`[${this.now()}] Im ready`);
    }

    @On('message')
    async onMessage([{author, content}]: ArgsOf<'message'>) {
        if (author.bot || !content.startsWith(PREFIX)) {
            return;
        }
        
        const response = [
            `__[${this.now()}]__ **${author.username}** send command: **${content}**`,
            '',
        ].join('\n');
        
        // await guild?.channels?.cache.get(Config.get('botSaysChannelId')).send(response);

        return console.log(response);
    }

    @CommandNotFound()
    async commandNotFound(command: CommandMessage) {
        return await command.reply(
            [
                'I\'m sorry. I did not understand.',
                'Try __!help__ to get help',
            ].join('\n')
        );
    }
}
