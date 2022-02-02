#!/usr/bin/env node
/// <reference path="../../../react-native-command/global.d.ts" />
export declare const theParams: {};
export declare const ROOT_PATH: string;
export declare const THE_COMMAND = "r-native";
declare const COLORS: {
    _Reset: string;
    Bright: string;
    Dim: string;
    Underscore: string;
    Blink: string;
    Reverse: string;
    Hidden: string;
    FgBlack: string;
    FgRed: string;
    FgGreen: string;
    FgYellow: string;
    FgBlue: string;
    FgMagenta: string;
    FgCyan: string;
    FgWhite: string;
    BgBlack: string;
    BgRed: string;
    BgGreen: string;
    BgYellow: string;
    BgBlue: string;
    BgMagenta: string;
    BgCyan: string;
    BgWhite: string;
};
export declare function colorize(color?: keyof typeof COLORS): string;
export declare function prettyConsole(...objects: any[]): void;
export declare function thread(command: string): Promise<true | Error>;
export {};
