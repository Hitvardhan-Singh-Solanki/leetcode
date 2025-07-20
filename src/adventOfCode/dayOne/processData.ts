export function processData(s: string[]): number {
  let sum = 0;
  for (const x of s) {
    sum += findTwoDigits(x);
  }
  return sum;
}

function findTwoDigits(str: string): number {
  const spelledDigits: {
    [key: string]: string;
  } = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  let digit1 = '0';
  let digit2 = '0';

  for (let i = 0; i < str.length; i++) {
    const spelledDigit = findSpelledDigit(str.slice(i), spelledDigits);
    if (spelledDigit) {
      digit1 = spelledDigit;
      break;
    }
    if (/\d/.test(str[i])) {
      digit1 = str[i];
      break;
    }
  }

  for (let i = str.length - 1; i >= 0; i--) {
    const spelledDigit = findSpelledDigit(str.slice(i + 1), spelledDigits);
    if (spelledDigit) {
      digit2 = spelledDigit;
      break;
    }
    if (/\d/.test(str[i])) {
      digit2 = str[i];
      break;
    }
  }
  return Number(digit1 + digit2);
}

const findSpelledDigit = (
  substring: string,
  spelledDigits: { [key: string]: string }
) => {
  for (const key in spelledDigits) {
    if (substring.startsWith(key)) {
      return spelledDigits[key];
    }
  }
  return null;
};
