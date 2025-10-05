export function generate(numRows: number): number[][] {
  const res = [[1]];
  for (let i = 1; i < numRows; i++) {
    const currRow = [];
    for (let j = 0; j <= i; j++) {
      if (j === 0 || j === i) currRow.push(1);
      else currRow.push(res[i - 1][j] + res[i - 1][j - 1]);
    }
    res.push(currRow);
  }
  return res;
}

export function generate2(rowIndex: number): number[] {
  const row = [1];
  for (let i = 1; i <= rowIndex; ++i)
    row.push(Math.floor((row[i - 1] * (rowIndex - i + 1)) / i));
  return row;
}
