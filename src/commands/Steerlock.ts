import { Command, CommandMessage, Description } from '@typeit/discord';
import steerlocks from './stubs/steerlocks';

export default abstract class Steerlock {
    @Command('steerlock :query')
    @Description('Need to know the steerlock for a car?')
    async execute(command: CommandMessage<{query: string;}>){
        const {query} = command.args;

        if (!query){
            return await command.reply('Invalid query');
        }

        const results = steerlocks.filter(lock => lock.car.toLowerCase().includes(query.toLowerCase()));        

        if (!results) {
            return await command.reply(`No results for ${query}`);
        }
        
        return await command.channel.send({
            embed: {
                title: `Quering steerlock for: "${query}"`,
                description: '[Read more about steerlock](https://coachdaveacademy.com/tutorials/correct-steering-locks-and-ratios-in-acc/)',
                type: 'article',
                fields: results.map(car => ({
                    inline: false,
                    name: car.car,
                    value: car.value,
                })),
            },
        });
    }
}
