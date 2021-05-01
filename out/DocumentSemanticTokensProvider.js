"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentSemanticTokensProvider = void 0;
const vscode = __importStar(require("vscode"));
const tokenTypes_1 = require("./tokenTypes");
/**
 * Deals with processing the document for the tokens to highlight
 */
class DocumentSemanticTokensProvider {
    constructor() {
        /**
         * The index required for the class to work
         *
         * It *must* be set.
         */
        this.index = {};
    }
    async provideDocumentSemanticTokens(document, token) {
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
    extractTokens(text) {
        var tokens = [];
        var lines = text.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var re = /([A-Z]|[a-z])+/g;
            var matches = lines[i].matchAll(re);
            var match = matches.next();
            while (!match.done) {
                var matchType = this.determineType(match.value[0]);
                if (matchType !== -1 && match.value.index !== undefined)
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
    cleanText(text) {
        var cleaned = "";
        var inString = false;
        var isEscaped = false;
        for (var i = 0; i < text.length; i++) {
            var skip = false;
            if (text[i] === '"' && !isEscaped) {
                inString = !inString;
                skip = true;
            }
            if (text[i] === "\\" && inString)
                isEscaped = !isEscaped;
            if (text[i] !== "\\")
                isEscaped = false;
            // console.log(
            //     `text[i]:${text[i]} isEscaped:${isEscaped} inString:${inString} skip:${skip}`
            // );
            if (inString || skip) {
                if (text[i] === "\n" || text[i] === "\r")
                    cleaned += text[i];
                else
                    cleaned += "#";
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
    determineType(tokenText) {
        var typeNum = -1;
        Object.keys(this.index).forEach(typeVal => {
            if (this.index[typeVal].includes(tokenText)) {
                var code = tokenTypes_1.tokenCodes.get(typeVal);
                if (code !== undefined)
                    typeNum = code;
            }
        });
        return typeNum;
    }
}
exports.DocumentSemanticTokensProvider = DocumentSemanticTokensProvider;
