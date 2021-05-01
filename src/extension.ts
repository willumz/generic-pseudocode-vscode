import * as vscode from "vscode";
import { Config } from "./Config";
import { DocumentSemanticTokensProvider } from "./DocumentSemanticTokensProvider";
import { tokenTypesLegend, tokenModifiersLegend } from "./tokenTypes";

/** Entry point for the extension which runs when a file with the language
 * type "pseudocode" is opened
 */
export function activate(context: vscode.ExtensionContext) {
    const legend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
    var DocSemTokProv = new DocumentSemanticTokensProvider();
    var conf = new Config(() => {
        if (conf.config.custom !== undefined) DocSemTokProv.index = conf.config.custom;
        context.subscriptions.push(
            vscode.languages.registerDocumentSemanticTokensProvider(
                { language: "pseudocode" },
                DocSemTokProv,
                legend
            )
        );
    });
}
