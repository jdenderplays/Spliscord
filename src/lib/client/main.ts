//#region Because barrels
import {
    Collection,
    BotConfig,
    walk,
    readdirAsync,
    Command,
    flattenDeep,
    Logger,
    executeCmd,
    storage,
} from './client.b';
//#endregion

//#region Because typescript
export class Spliscord extends Logger {

    public commands: Collection < string, Command > = new Collection();
    public cooldowns: Collection < string, Collection < string, any > > = new Collection();

    public storage = storage;

    public constructor(public config: BotConfig) {
        super();

        this._registerEvents();
        this._import();

        this.on('message', (message: any) => executeCmd(this, message));

        this.login(require(config.token.path)[config.token.name]);
    }

    private async _import(): Promise < void > {

        //#region Command Importer
        const rawCommandFiles: string[] = flattenDeep(await walk('./dist/commands/'));
        const commandFiles: string[] = rawCommandFiles.filter((file: string) => file.split('.')[2] !== 'map');

        console.info(`[init] [load] Loading ${commandFiles.length} commands.`);

        for (const file of commandFiles) {
            if (file.split('.')[1] !== 'js') return;

            const { default: command } = require(`../../${file}`); // The `..` is needed.

            this.commands.set(command.name, command);
        }
        //#endregion
    }
}
//#endregion