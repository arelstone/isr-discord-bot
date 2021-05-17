import { Command, CommandMessage, Description } from "@typeit/discord";
import { EmbedField } from "discord.js";
import steerlocks from './stubs/steerlocks'

export default abstract class Steerlock {
    @Command('steerlock :car')
    @Description("Need to know the steerlock for a car?")
    async execute(command: CommandMessage){
        const {car} = command.args

        if (!car){
            command.reply('Steerlock for ${car} was not found')
            return 
        }

        const cars = steerlocks.filter(lock => lock.car.toLowerCase().includes(car.toLowerCase()))        

        command.channel.send({
            embed: {
                title: `Quering steerlock for: "${car}"`,
                description: '[Read more about steerlock](https://coachdaveacademy.com/tutorials/correct-steering-locks-and-ratios-in-acc/)',
                type: 'article',
                fields: cars.map(car => ({
                    inline: false,
                    name: car.car,
                    value: car.value
                }))
            }
        })
    }
}