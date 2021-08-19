import { Command, CommandMessage, Infos } from '@typeit/discord';
import steerlocks from './stubs/steerlocks';

export default abstract class Steerlock {
    @Command('steerlock :query')
    @Infos({
        description: 'Playing Assetto Corsa Competizione? Need to know the steerlock for a car?',
        inWelcomeMessage: true
    })
    async execute(command: CommandMessage<{query: string;}>){
        const {
            args: { query },
        } = command;

        
        if (!query){
            return await this.reply(command, 'Invalid query');
        }

        if (!this.results(query)) {
            return await this.reply(command, `No results for ${query}`);
        }
        
        return this.reply(command, this.message(query));
    }

    private async reply(command: CommandMessage, message: any) {
        return await command.reply(message);
    }

    private results(query: string){
        return steerlocks.filter(lock => lock.car.toLowerCase().includes(query.toLowerCase()));
    }

    private message(query: string) {
        return {
            embed: {
                title: `Quering steerlock for: "${query}"`,
                description: '[Read more about steerlock](https://coachdaveacademy.com/tutorials/correct-steering-locks-and-ratios-in-acc/)',
                type: 'article',
                fields: this.results(query).map(car => ({
                    inline: false,
                    name: car.car,
                    value: car.value,
                })),
            },
        };
    }
}
