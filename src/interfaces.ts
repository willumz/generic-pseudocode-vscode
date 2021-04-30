export interface Iindex {
    [key: string]: string[];
}

export interface Token {
    line: number;
    startCharacter: number;
    length: number;
    type: number;
}
