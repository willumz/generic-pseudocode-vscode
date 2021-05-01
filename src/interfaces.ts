/**
 * Contains the custom words which should be highlighted
 *
 * e.g.
 * ```json
 * {
 *     "keyword": [
 *         "test",
 *         "example"
 *     ]
 * }
 * ```
 */
export interface IndexInterface {
    [key: string]: string[];
}

/**
 * Contains the information neccesary to highlight a token in the file
 */
export interface TokenInterface {
    /** The line number the token is on */
    line: number;
    /** The character number the token begins on */
    startCharacter: number;
    /** The length of the token */
    length: number;
    /** The type of token it is */
    type: number;
}

/**
 * The config file structure
 */
export interface ConfigInterface {
    /**
     * The custom words to be highlighted
     */
    custom?: IndexInterface;
}
