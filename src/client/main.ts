//#region Because barrels
import {
    Collection,
    Client,
    BotConfig,
    readdirAsync,
    Command,
    logger,
    loader,
    executer,
    storage,
    cache,
} from './client.b';
//#endregion

//#region Because typescript
export class Spliscord extends Client {

    public commands: Collection < string, Command > = new Collection();
    public cooldowns: Collection < string, Collection < string, any > > = new Collection();

    public storage = storage;
    public cache = cache;

    public prefixMention: RegExp;
    public inviteLink: string;

    public constructor(public config: BotConfig) {
        super();

        logger(this);
        loader(this);

        this.on('message', (message: any) => executer(this, message));

        this.login(require(config.token.path)[config.token.name]);
    }
}
//#endregion