import { getThreadId } from "./forums-of-loathing/Parser"

const SCRIPT_SETTINGS = "fmu:settings";
const GAME_INFO = "fmu:config"
const GAME_DATA = "fmu:data";
const PLATFORM_DATA = "fmu:platform";
const INTERFACE_DATA = "fmu:interface";
let gameId: number = -1;

function convertStringToObject(str: string): {} {
    try {
        const obj = JSON.parse(str) || {};
        return obj;
    } catch {
    }

    return {};
}

function getGameId(): number {
    if (gameId === -1) {
        gameId = getThreadId();
    }

    return gameId;
}

function gameInfoKey(): string {
    return GAME_INFO + ":" + getGameId();
}

function gameDataKey(): string {
    return GAME_DATA + ":" + getGameId();
}

function interfaceKey(): string {
    return INTERFACE_DATA + ":" + getGameId();
}

function gameInfoKeyById(id: number): string {
    return GAME_INFO + ":" + id;
}

function gameDataKeyById(id: number): string {
    return GAME_DATA + ":" + id;
}

function interfaceKeyById(id: number): string {
    return INTERFACE_DATA + ":" + id;
}

function getAsObjectFromLocalStorage(key: string): any {
    const s: string = localStorage.getItem(key) || "";

    return convertStringToObject(s);
}

export function getGameInfo(): any {
    return getAsObjectFromLocalStorage(gameInfoKey());
}

export function getGameData(): any {
    return getAsObjectFromLocalStorage(gameDataKey());
}

export function getInterfaceData(): any {
    return getAsObjectFromLocalStorage(interfaceKey());
}

export function getSettings(): any {
    return getAsObjectFromLocalStorage(SCRIPT_SETTINGS);
}

export function getPlatform(): any {
    return getAsObjectFromLocalStorage(PLATFORM_DATA);
}

export function saveSettings(obj: any): void {
    localStorage.setItem(SCRIPT_SETTINGS, JSON.stringify(obj));
}

export function saveGameInfo(obj: any): void {
    localStorage.setItem(gameInfoKey(), JSON.stringify(obj));
}

export function saveGameData(obj: any): void {
    localStorage.setItem(gameDataKey(), JSON.stringify(obj));
}

export function savePlatform(obj: any): void {
    localStorage.setItem(PLATFORM_DATA, JSON.stringify(obj));
}

export function saveInterfaceData(obj: any): void {
    localStorage.setItem(interfaceKey(), JSON.stringify(obj));
}

const decimalPlaces = 1000;

function sizeInMegabytes(str: string): number {
    return Math.round(unescape(encodeURIComponent(str)).length * 2 / 1024 / 1024 * decimalPlaces) / decimalPlaces;
}

export function totalMemoryUsed(): number {
    return sizeInMegabytes(JSON.stringify(localStorage));
}

export function memoryUsageByGame(id: number): number {
    let gameInfo: string = localStorage.getItem(gameInfoKeyById(id)) || "";
    let gameData: string = localStorage.getItem(gameDataKeyById(id)) || "";
    let interfaceData: string = localStorage.getItem(interfaceKeyById(id)) || "";

    return sizeInMegabytes(gameInfo + gameData + interfaceData);
}

export function resetGame(): void {
    localStorage.removeItem(gameInfoKey());
    localStorage.removeItem(gameDataKey());
    localStorage.removeItem(interfaceKey());
}

export function resetGameById(id: number): void {
    localStorage.removeItem(gameInfoKeyById(id));
    localStorage.removeItem(gameDataKeyById(id));
    localStorage.removeItem(interfaceKeyById(id));
}

export function reset(): void {
    localStorage.clear();
}