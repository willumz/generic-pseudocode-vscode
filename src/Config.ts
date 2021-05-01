import { ConfigInterface, IndexInterface } from "./interfaces";
import { homedir as osHomedir } from "os";
import { join as joinPath } from "path";
import * as vscode from "vscode";

import { readFile } from "fs/promises";

/**
 * Config class which handles the .pseudoconfig file in the home directory
 */
class Config {
    /** Stores the config file in JSON format */
    private _config: ConfigInterface;
    /** Read-only access to the config file in JSON format */
    get config(): ConfigInterface {
        return this._config;
    }

    constructor() {
        this._config = {};
        this.findConfigFile();
    }

    /** Finds the config file with the highest priority
     * (currently only supports config file in home directory)
     */
    findConfigFile(): void {
        var homeDirectory = osHomedir();
        console.log(homeDirectory);

        var homeDirFile = joinPath(homeDirectory, ".pseudoconfig");
        console.log(homeDirFile);
        console.log(vscode.workspace.workspaceFolders);

        readFile(homeDirFile)
            .then(data => {
                this._config = JSON.parse(data.toString());
                console.log();
            })
            .catch();
    }

}

var a = new Config();
a.config

a.findConfigFile();
