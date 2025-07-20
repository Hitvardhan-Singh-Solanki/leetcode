type Molecule = Record<string, number>;

export function countOfAtoms(formula: string): string {
  const molecules: Molecule[] = [{}];
  for (let i = 0; i < formula.length; ) {
    if (formula[i] === '(') {
      molecules.push({});
      i++;
      continue;
    }
    if (formula[i] === ')') {
      const mol = molecules.pop()!;
      let molCount;
      [molCount, i] = getCount(formula, ++i);
      const parentMol = molecules[molecules.length - 1];
      mergeMols(parentMol, mol, molCount);
      continue;
    }
    let atom = formula[i++];
    while (/[a-z]/.test(formula[i] ?? '')) {
      atom = `${atom}${formula[i++]}`;
    }
    let atomCount;
    [atomCount, i] = getCount(formula, i);
    const mol = molecules[molecules.length - 1];
    mol[atom] = (mol[atom] ?? 0) + atomCount;
  }
  const finalMol = molecules.pop();
  let ans = '';
  for (const atom of Object.keys(finalMol ?? {}).sort()) {
    if (finalMol) {
      const atomCount = finalMol[atom];
      const atomCountStr = atomCount > 1 ? `${atomCount}` : '';
      ans = `${ans}${atom}${atomCountStr}`;
    }
  }
  return ans;
}

function mergeMols(mol1: Molecule, mol2: Molecule, mol2Count: number): void {
  for (const [atom, count] of Object.entries(mol2)) {
    const atomCount = count * mol2Count;
    mol1[atom] = (mol1[atom] ?? 0) + atomCount;
  }
}

function getCount(formula: string, i: number): [number, number] {
  let count = 0;
  while (/\d/.test(formula[i] ?? '')) {
    count = count * 10 + parseInt(formula[i++]);
  }
  if (count === 0) count = 1;
  return [count, i];
}
