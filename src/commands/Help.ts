import { Client, Command, CommandInfos, CommandMessage, Description, Rule, Rules } from "@typeit/discord";
import { EmbedField, MessageAttachment } from "discord.js";

export default abstract class Help {
    @Command('help')
    @Description('Need help?')
    async execute(command: CommandMessage){
        return await command.channel.send({
            embed: {
                title: 'Need help?',
                description: [
                    'Dont worry... I got you!',
                    'All commands should be prefixed with **!**',
                    'Some commands takes a variable. Variables is marked with a **:**',
                    'This is a list of avialable commands'
                ].join('\n\n'),
                files: [new MessageAttachment('./src/assets/max-power.jpeg')],
                fields: Client.getCommands().map(this.field)
            }
        })
    }

    field({commandName, description, prefix}: CommandInfos): EmbedField{
        return {
            inline: false,
            name: `${prefix}${commandName}`,
            value: description
        }
    }
}