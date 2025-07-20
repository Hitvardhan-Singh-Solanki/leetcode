export function reverseWords(s: string): string {
  const stringAsArray = s.split(' ');
  let result = '';

  for (let i = stringAsArray.length - 1; i >= 0; i--) {
    const word = stringAsArray[i];
    if (word) {
      result += word + ' ';
    }
  }

  return result.trim();
}
