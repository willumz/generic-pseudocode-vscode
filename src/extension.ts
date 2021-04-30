import * as vscode from "vscode";
import { Token, Iindex } from "./interfaces";

const index: Iindex = {
    "keyword": [
        "test",
        "test3"
    ]
};

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

class DocumentSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens> {
        var documentText = document.getText();
        var tokens = this.extractTokens(this.cleanText(documentText));

        const builder = new vscode.SemanticTokensBuilder();
        tokens.forEach(val => {
            builder.push(
                val.line,
                val.startCharacter,
                val.length,
                val.type
            );
        });

        return builder.build();
    }

    // TODO: Extract tokens from cleaned text
    extractTokens(text: string): Token[] {
        var tokens: Token[] = [];

        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var re = /([A-Z]|[a-z])+/g;
            var matches = lines[i].matchAll(re);

            var match = matches.next();
            while (!match.done) {
                //console.log(match.value);
                var matchType = this.determineType(match.value[0]);
                if (matchType !== -1 && match.value.index !== undefined)
                    tokens.push({
                        line: i,
                        startCharacter: match.value.index,
                        length: match.value[0].length,
                        type: matchType
                    });
                match = matches.next();
            }
        }

        console.log(tokens);

        return tokens;
    }

    // Remove string literals
    // Replaces the contents of strings (including the '"' but excluding any instances of '\n' or '\r') with '#'
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
            if (text[i] === "\\" && inString) isEscaped = !isEscaped;
            if (text[i] !== "\\") isEscaped = false;

            // console.log(
            //     `text[i]:${text[i]} isEscaped:${isEscaped} inString:${inString} skip:${skip}`
            // );

            if (inString || skip) {
                if (text[i] === "\n" || text[i] === "\r") cleaned += text[i];
                else cleaned += "#";
                continue;
            }

            cleaned += text[i];
        }

        return cleaned;
    }

    determineType(tokenText: string): number {
        var typeNum = -1;

        console.log(tokenText);
        Object.keys(index).forEach(typeVal => {
            console.log(typeVal);
            if (index[typeVal].includes(tokenText)) {
                console.log("yes");
                var code = tokenCodes.get(typeVal);
                console.log(code);
                if (code !== undefined) typeNum = code;
            }
        });

        return typeNum;
    }

}
