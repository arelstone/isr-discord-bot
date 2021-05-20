import { Client, Command, CommandInfos, CommandMessage, Infos } from '@typeit/discord';
import { EmbedField, MessageAttachment } from 'discord.js';

export default abstract class Help {
    @Command('help')
    @Infos({description: 'Need help?'})
    async execute(command: CommandMessage){
        const { type } = command.channel;

        return await command[type === 'dm' ? 'author' : 'member'].send(this.message());
    }

    private message() {
        const cmds = Client.getCommands().filter(cmd => !cmd.infos.hidden);

        return {
            embed: {
                title: 'Need help?',
                description: [
                    'Dont worry... I got you!',
                    'All commands should be prefixed with **!**',
                    'Some commands takes a variable. Variables is marked with a **:**',
                    'This is a list of avialable commands',
                ].join('\n\n'),
                files: [new MessageAttachment('./src/assets/max-power.jpeg')],
                fields: cmds.map(this.field),
            },
        };
    }

    private field({commandName, description, prefix}: CommandInfos): EmbedField {
        return {
            inline: false,
            name: `${prefix}${commandName}`,
            value: description,
        };
    }
}
