import { ConfigInterface } from "./interfaces";
import { homedir as osHomedir } from "os";
import { join as joinPath } from "path";
import * as vscode from "vscode";

import { promises as fsp } from "fs";

/**
 * Config class which handles the .pseudoconfig file in the home directory
 */
export class Config {
    /** Stores the config file in JSON format */
    private _config: ConfigInterface;
    /** Read-only access to the config file in JSON format */
    get config(): ConfigInterface {
        return this._config;
    }

    /**
     * Constructor for {@link Config}
     * @param callback - The callback for whatever instantiated {@link Config} to continue in after the config file has been loaded
     */
    constructor(callback: () => void) {
        this._config = {};
        this.findConfigFile(callback);
    }

    /** Finds the config file with the highest priority
     * (currently only supports config file in home directory)
     * @param callback - The callback for whatever instantiated {@link Config} to continue in after the config file has been loaded
     */
    findConfigFile(callback: () => void): void {
        var homeDirectory = osHomedir();
        console.log(homeDirectory);

        var homeDirFile = joinPath(homeDirectory, ".pseudoconfig");
        console.log("Home Dir File", homeDirFile);
        console.log(vscode.workspace.workspaceFolders);

        fsp.readFile(homeDirFile)
            .then(data => {
                this._config = JSON.parse(data.toString());
                callback();
            })
            .catch(() => {
                console.log("Pseudocode: Error loading .pseudoconfig file");
            });
    }
}
