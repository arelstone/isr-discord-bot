const cfg = {
    env: process.env.ENV,
    token: process.env.TOKEN
}

export default class Config {
    static get(key: keyof typeof cfg): string {
        return cfg[key]
    }

    static all(){
        return cfg
    }

    static isProduction(){
        return !cfg.env
        ? true
        : cfg.env === 'production'
    }
}