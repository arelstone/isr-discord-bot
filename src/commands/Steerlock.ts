import { Command, CommandMessage, Description } from '@typeit/discord';
import steerlocks from './stubs/steerlocks';

export default abstract class Steerlock {
    @Command('steerlock :car')
    @Description('Need to know the steerlock for a car?')
    async execute(command: CommandMessage){
        const {car} = command.args;

        if (!car){
            return await command.reply('Steerlock for ${car} was not found');
        }

        const cars = steerlocks.filter(lock => lock.car.toLowerCase().includes(car.toLowerCase()));        

        return await command.channel.send({
            embed: {
                title: `Quering steerlock for: "${car}"`,
                description: '[Read more about steerlock](https://coachdaveacademy.com/tutorials/correct-steering-locks-and-ratios-in-acc/)',
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
