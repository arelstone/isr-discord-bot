import { Client, Command, CommandInfos, CommandMessage, Infos } from '@typeit/discord';
import { EmbedField, MessageAttachment } from 'discord.js';

export default abstract class Help {
    @Command('help')
    @Infos({description: 'Need help?'})
    async execute(command: CommandMessage){
        const { type } = command.channel;

        return await command[type === 'dm' ? 'author' : 'member'].send(this.message(command));
    }


    private message({member}: CommandMessage) {
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
                fields: this.commands().map(this.field),
            },
        };
    }

    private commands(){        
        return Client.getCommands().filter(cmd => {
            return !cmd.infos.hidden;
        });
    }

    private field({commandName, description, prefix}: CommandInfos): EmbedField {
        return {
            inline: false,
            name: `${prefix}${commandName}`,
            value: description,
        };
    }
}
