import * as vscode from "vscode";

const tokenCodes = new Map<string, number>();
tokenCodes.set("keyword", 0);

const tokenTypesLegend = ["keyword"];

const tokenModifiersLegend: string[] = [];

const legend = new vscode.SemanticTokensLegend(tokenTypesLegend, tokenModifiersLegend);

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider(
            { language: "pseudocode" },
            new DocumentSemanticTokensProvider(),
            legend
        )
    );
}

interface Token {
    line: number;
    startCharacter: number;
    length: number;
    type: number;
}

class DocumentSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens> {
        var documentText = document.getText();
        var tokens = this.extractTokens(this.cleanText(documentText));

        const builder = new vscode.SemanticTokensBuilder();
        builder.push(0, 3, 5, 0, 0);

        return builder.build();
    }

    // TODO: Extract tokens from cleaned text
    extractTokens(text: string): Token[] {
        var tokens: Token[] = [];

        //var re = //

        return tokens;
    }

    // Remove string literals
    cleanText(text: string): string {
        var cleaned = "";
        var inString = false;
        var isEscaped = false;

        for (var i = 0; i < text.length; i++) {
            var skip = false;

            if (text[i] === '"' && !isEscaped) {
                inString = !inString;
                skip = true;
            }
            if (text[i] === "\\") isEscaped = !isEscaped;
            if (text[i] !== "\\") isEscaped = false;

            console.log(`text[i]:${text[i]} isEscaped:${isEscaped} inString:${inString}`);

            if (inString || skip) continue;

            cleaned += text[i];
        }

        return cleaned;
    }
}
