import { Command, CommandMessage, Description } from '@typeit/discord';
import steerlocks from './stubs/steerlocks';

export default abstract class Steerlock {
    @Command('steerlock :query')
    @Description('Need to know the steerlock for a car?')
    async execute(command: CommandMessage){
        const {query} = command.args;

        if (!query){
            return await command.reply('Invalid query');
        }

        const cars = steerlocks.filter(lock => lock.car.toLowerCase().includes(`${query}`.toLowerCase()));        

        if (!cars) {
            return await command.reply(`No results for ${query}`);
        }

        return await command.channel.send({
            embed: {
                title: `Quering steerlock for: "${query}"`,
                description: '[Read more about steerlock in acc](https://coachdaveacademy.com/tutorials/correct-steering-locks-and-ratios-in-acc/)',
                type: 'article',
                fields: cars.map(car => ({
                    inline: false,
                    name: car.car,
                    value: car.value,
                })),
            },
        });
    }
}
