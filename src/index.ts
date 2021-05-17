require('dotenv').config()

import { Client } from "@typeit/discord";
import Config from "./Config";

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    this._client = new Client({
      classes: [
        `${__dirname}/discords/*.ts`, // glob string to load the classes
        `${__dirname}/discords/*.js` // If you compile your bot, the file extension will be .js
      ],
      silent: true,
      variablesChar: ':',
    });

    this._client.login(Config.get('token'));    
  }
}

Main.start();