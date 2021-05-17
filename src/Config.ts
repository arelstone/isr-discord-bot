const cfg = {
    token: process.env.TOKEN,
    welcomeChannelName: 'welcome'
}

export default class Config {
    static get(key: keyof typeof cfg): string {
        return cfg[key]
    }

    static all(){
        return cfg
    }
}