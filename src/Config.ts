const cfg = {
    env: process.env.ENV,
    token: process.env.TOKEN,
    botSaysChannelId: process.env.BOT_SAYS_CHANNEL_ID,
    welcomeChannelId: process.env.WELCOME_CHANNEL_ID,
    guildId: process.env.GUILS_ID,
};

export default class Config {
    static get(key: keyof typeof cfg): string {
        return cfg[key];
    }

    static all(): Record<keyof Config, string>{
        return cfg;
    }

    static isProduction(): boolean{
        return !cfg.env
            ? true
            : cfg.env === 'production';
    }
}
