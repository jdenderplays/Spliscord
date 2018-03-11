// Will move to Yatsul soontm.
import { join } from 'path';
import { readdir, stat } from 'fs';
import { promisify } from 'util';
import flattenDeep = require('lodash/flattenDeep');
import { Spliscord } from './client';
import { inspect } from 'util';


//#region Types
export type Constructor < T > = new(...args: any[]) => T;

export interface RecursiveArray < T > extends Array < T | RecursiveArray < T >> {}
//#endregion


//#region Functions
export const readdirAsync = promisify(readdir);
export const statAsync = promisify(stat);


export const walk = async (dir: string): Promise < string | RecursiveArray < string > > =>
    (await statAsync(dir)).isDirectory() ?
    await Promise.all(
        (await readdirAsync(dir))
        .map(async file =>
            await walk(join(dir, file)))) :
    dir;


export const walkflat = async (dir: string, _w: string | RecursiveArray < string > ): Promise < string[] > =>
    typeof(_w = await walk(dir)) === 'string' ? [] :
    flattenDeep < string > (_w);


export const pipe = (...funcs: Function[]) =>
    funcs.reduce(
        (f1, f2) =>
        (...args: any[]) =>
        f2(f1(...args))
    );


export const clean = async (client: Spliscord, text: any, depth ? : number | null, color ? : boolean, ): Promise < string > => (
    text instanceof Promise && (text = await text),
    typeof text !== 'string' && (text = inspect(text, false, depth, color)),
    text
    .replace(/`/g, '`' + String.fromCharCode(8203))
    .replace(/@/g, '@' + String.fromCharCode(8203))
    .replace(client.token, 'mfa.VkO_2v3T--NO--lWetW_tjND--TOKEN--QFTm--FOR--zq9PH--YOU--tG')
)
//#endregion


//#region Strings
declare global {
    interface String {
        multiSearch(pattern: RegExp): RegExpExecArray[]
        toCammelCase(): string;
    }
}


String.prototype.multiSearch = function(pattern) {
    return this
        .match(new RegExp(pattern.source, pattern.flags)) !
        .map(match =>
            new RegExp(pattern.source, pattern.flags).exec(match) !);
}


String.prototype.toCammelCase = function() {
    return this.replace(/\-(\w)/g,
        (i, m) => m.toUpperCase())
}
//#endregion