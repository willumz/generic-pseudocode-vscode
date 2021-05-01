import * as vscode from "vscode";
import { DocumentSemanticTokensProvider } from "./DocumentSemanticTokensProvider";
import { tokenTypesLegend, tokenModifiersLegend } from "./tokenTypes";


/** Entry point for the extension which runs when a file with the language
 * type "pseudocode" is opened
 */
export function activate(context: vscode.ExtensionContext) {
    const legend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { language: "pseudocode" },
            new DocumentSemanticTokensProvider(),
            legend
        )
    );
}
