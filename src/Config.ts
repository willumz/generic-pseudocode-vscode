import { ConfigInterface } from "./interfaces";
import { homedir as osHomedir } from "os";
import { join as joinPath } from "path";
import * as vscode from "vscode";

import { promises as fsp } from "fs";

/**
 * Config class which handles loading .pseudoconfig files
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
     * (workspace directory first, then home directory)
     * @param callback - The callback for whatever instantiated {@link Config} to continue in after the config file has been loaded
     */
    findConfigFile(callback: () => void): void {
        var homeDirectory = osHomedir();
        var homeDirFile = joinPath(homeDirectory, ".pseudoconfig");
        var candidateFiles: string[] = [];

        var workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders !== undefined && workspaceFolders.length > 0) {
            var workspaceDirFile = joinPath(workspaceFolders[0].uri.fsPath, ".pseudoconfig");
            candidateFiles.push(workspaceDirFile);
        }
        candidateFiles.push(homeDirFile);

        var tryLoadFile = (index: number): void => {
            if (index >= candidateFiles.length) {
                callback();
                return;
            }

            fsp.readFile(candidateFiles[index])
                .then(data => {
                    this._config = JSON.parse(data.toString());
                    callback();
                })
                .catch(() => {
                    tryLoadFile(index + 1);
                });
        };

        tryLoadFile(0);
    }
}
