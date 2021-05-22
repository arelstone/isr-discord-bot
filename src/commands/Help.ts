import { Client, Command, CommandInfos, CommandMessage, Infos } from '@typeit/discord';
import { EmbedField, MessageAttachment } from 'discord.js';

export default abstract class Help {
    @Command('help')
    @Infos({
        description: 'Need help?',
        inWelcomeMessage: true,
    })
    async execute(command: CommandMessage){
        return await command.reply(this.message(this.isAdmin(command)));
    }

    isAdmin(command: CommandMessage): boolean {
        console.log(command);
        
        const role = command.guild?.roles?.cache?.find(r => r.name === 'admin');
        
        console.log('###role', role);

        if (!role) {
            return false;
        }
        
        return command.member?.roles?.cache.has(role.id);
    }

    private message(isAdmin: boolean = false) {
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
                fields: this.commands(isAdmin).map(this.field),
            },
        };
    }

    private commands(userIsAdmin: boolean){
        return Client.getCommands().filter(cmd => {
            return userIsAdmin ? cmd : !cmd.infos.hidden;
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
