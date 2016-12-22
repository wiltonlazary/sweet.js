// @flow
export type SourceInfo = {
  filename: string,
  position: number
};

const sourceInfo = new WeakMap();

export default class CharStream {
  constructor(source: string, filename: string = '') {
    sourceInfo.set(this, {
      source,
      filename,
      position: 0
    });
  }

  get sourceInfo(): SourceInfo {
    const { filename, position/*, source*/ } = sourceInfo.get(this);
    return { filename, position/*, source*/ };
  }

  // returns the Unicode character charsToSkip ahead.
  peek(charsToSkip: number = 0): string {
    const { source, position } = sourceInfo.get(this);
    if (position + charsToSkip >= source.length) return '';
    return source[position + charsToSkip];
  }

  // returns a string containing the next numChars characters.
  readString(numChars: number = 1): string {
    const info = sourceInfo.get(this);
    const { source, position } = info;
    const str = source.slice(position, position + numChars);
    info.position += str.length;
    return str;
  }

  getSlice(start: number): string {
    const { source, position } = sourceInfo.get(this);
    return source.slice(start, position);
  }
}

export function isEOS(char: string): boolean {
  return char === '';
}
