import { ArgsOf, On } from '@typeit/discord';

export default abstract class WelcomeUser {
    @On('guildMemberAdd')
    async execute([member]: ArgsOf<'guildMemberAdd'>){
        const msg = [
            ['Welcome', member.displayName].join(' '),
            '',
            'I am Max Power, and I am here to help you.',
            'I can do all sort of helpfull things...',
            'To find out more use the command **!help**',
            'To see our event you can use the command **!calendar**',
        ].join('\n');

        await member.send(msg);
    }
}
