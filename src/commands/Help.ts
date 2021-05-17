import { Client, Command, CommandInfos, CommandMessage, Description } from "@typeit/discord";
import { EmbedField } from "discord.js";

export default abstract class Help {
    @Command('help')
    @Description('Need help?')
    async execute(command: CommandMessage){
        const commands = Client.getCommands()

        return await command.channel.send({
            embed: {
                title: 'Need help?',
                description: ['Dont worry...','I got you! This is a list of avialable commands'].join('\n\n'),
                fields: commands.map(this.field)
            }
        })
    }

    field(command: CommandInfos): EmbedField{
        return {
            inline: false,
            name: `${command.prefix}${command.commandName}`,
            value: command.description
        }
    }
}