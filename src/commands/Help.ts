import { Client, Command, CommandInfos, CommandMessage, Infos } from '@typeit/discord';
import { EmbedField, MessageAttachment } from 'discord.js';

export default abstract class Help {
    @Command('help')
    @Infos({
        description: 'Need help?',
        inWelcomeMessage: true,
    })
    async execute(command: CommandMessage){
        return await command.reply(this.message());
    }

    private message() {
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
                fields: this.commands(false).map(this.field),
            },
        };
    }

    private commands(userIsAdmin: boolean){      
        if (userIsAdmin) {
            return Client.getCommands();
        }  

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
