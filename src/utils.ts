export const  trimString = (multiLineString: string) => {
    const lines = multiLineString.split('\n');
    if (lines[0] === '') {
      lines.shift();
    }

    const extraSpaces = lines[0].length - lines[0].trimStart().length;
    return lines.map(line => line.slice(extraSpaces)).join('\n');
}
