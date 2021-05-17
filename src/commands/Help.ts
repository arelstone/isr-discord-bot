import { Client, Command, CommandInfos, CommandMessage, Description } from "@typeit/discord";
import { EmbedField } from "discord.js";

export default abstract class Help {
    @Command('help')
    @Description('Need help?')
    async execute(command: CommandMessage){
        return await command.channel.send({
            embed: {
                title: 'Need help?',
                description: ['Dont worry...','I got you! This is a list of avialable commands'].join('\n\n'),
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