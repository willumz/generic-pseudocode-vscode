import * as vscode from "vscode";
import { TokenInterface, IndexInterface } from "./interfaces";
import { tokenCodes } from "./tokenTypes";

/**
 * Deals with processing the document for the tokens to highlight
 */
export class DocumentSemanticTokensProvider implements vscode.DocumentSemanticTokensProvider {
    /**
     * The index required for the class to work
     *
     * It *must* be set.
     */
    index: IndexInterface = {};

    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens> {
        var documentText = document.getText();
        var tokens = this.extractTokens(this.cleanText(documentText));

        const builder = new vscode.SemanticTokensBuilder();
        tokens.forEach(val => {
            builder.push(val.line, val.startCharacter, val.length, val.type);
        });

        return builder.build();
    }

    /**
     * Extracts tokens from the contents of the file
     * @param text - The contents of the open file (should be cleaned first using {@link cleanText})
     * @returns The list of processed tokens
     */
    extractTokens(text: string): TokenInterface[] {
        var tokens: TokenInterface[] = [];

        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var re = /([A-Z]|[a-z])+/g;
            var matches = lines[i].matchAll(re);

            var match = matches.next();
            while (!match.done) {
                var matchType = this.determineType(match.value[0]);
                if (
                    matchType !== -1 &&
                    match.value.index !== undefined &&
                    this.checkNotInComment(i, match.value.index, lines)
                )
                    tokens.push({
                        line: i,
                        startCharacter: match.value.index,
                        length: match.value[0].length,
                        type: matchType,
                    });
                match = matches.next();
            }
        }

        return tokens;
    }

    /**
     * Removes string literals
     *
     * Replaces the contents of strings (including the '"' but excluding any instances of '\n' or '\r') with '#'
     * @param text - The text to be cleaned
     * @returns The cleaned text
     */
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

    /**
     * Determines the type of the token so it can be correctly highlighted
     * @param tokenText - the value of the token e.g. `if`
     * @returns The numerical type of the token
     */
    determineType(tokenText: string): number {
        var typeNum = -1;

        Object.keys(this.index).forEach(typeVal => {
            if (this.index[typeVal].includes(tokenText)) {
                var code = tokenCodes.get(typeVal);
                if (code !== undefined) typeNum = code;
            }
        });

        return typeNum;
    }

    /**
     * Checks whether a word is in a comment or not
     * @param line - the line number of the word
     * @param startCharacter - the position of the first character of the word to be checked
     * @param lines - the lines of the text the word is in
     * @returns true if the word is not in a comment
     */
    checkNotInComment(line: number, startCharacter: number, lines: string[]): boolean {
        var inLineComment = false;
        var inBlockComment = false;
        var maybeStartComment = false;
        var maybeEndComment = false;
        for (var i = 0; i < lines.length; i++) {
            inLineComment = false;
            maybeStartComment = false;
            maybeEndComment = false;
            for (var ci = 0; ci < lines[i].length; ci++) {
                if (!(inLineComment || inBlockComment)) {
                    if (maybeStartComment) {
                        if (lines[i][ci] == "/") inLineComment = true;
                        if (lines[i][ci] == "*") inBlockComment = true;
                        maybeStartComment = false;
                    } else {
                        if (lines[i][ci] == "/") maybeStartComment = true;
                    }
                } else {
                    if (lines[i][ci] == "/" && maybeEndComment) inBlockComment = false;
                    maybeEndComment = false;
                    if (lines[i][ci] == "*" && !maybeEndComment) maybeEndComment = true;
                }
                if (i == line && ci == startCharacter) {
                    return !(inLineComment || inBlockComment);
                }
            }
        }
        return true;
    }
}
