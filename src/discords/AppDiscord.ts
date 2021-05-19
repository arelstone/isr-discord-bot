import { ArgsOf, CommandMessage, CommandNotFound, Discord, On, Once } from '@typeit/discord';
import * as Path from 'path';
import Config from '../Config';

@Discord('!', {
    import: [
        Config.isProduction() 
            ? Path.join(__dirname, '..', '..', 'build', 'commands', '*.js')
            : Path.join(__dirname, '..', 'commands', '*.ts'),
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
    onMessage([{author, content}]: ArgsOf<'message'>) {
        if (author.bot) {
            return;
        }
        const response = [
            `[${this.now()}]`,
            `[username]: ${author.username} (${author.id})`,
            `Content: ${content}`,
            '',
        ].join('\n');

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
