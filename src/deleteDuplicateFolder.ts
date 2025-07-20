// export function deleteDuplicateFolder(paths: string[][]): string[][] {}

class Node {
  children: Map<string, Node> = new Map();
  deleted = false;
}

export function deleteDuplicateFolder(paths: string[][]): string[][] {
  const root = new Node();
  // Build trie
  for (const path of paths) {
    let cur = root;
    for (const name of path) {
      if (!cur.children.has(name)) {
        cur.children.set(name, new Node());
      }
      cur = cur.children.get(name)!;
    }
  }
  // Encode subtrees
  const groups = new Map<string, Node[]>();
  encode(root, groups);
  // Mark duplicates
  for (const nodes of groups.values()) {
    if (nodes.length > 1) {
      for (const n of nodes) {
        n.deleted = true;
      }
    }
  }
  // Collect remaining paths
  const result: string[][] = [];
  collect(root, [], result);
  return result;
}

function encode(node: Node, groups: Map<string, Node[]>): string {
  if (node.children.size === 0) {
    return '()';
  }
  const parts: string[] = [];
  for (const [name, child] of node.children) {
    parts.push(name + encode(child, groups));
  }
  parts.sort();
  const sign = `(${parts.join('')})`;
  if (!groups.has(sign)) groups.set(sign, []);
  groups.get(sign)!.push(node);
  return sign;
}

function collect(node: Node, path: string[], res: string[][]) {
  for (const [name, child] of node.children) {
    if (child.deleted) continue;
    const newPath = [...path, name];
    res.push(newPath);
    collect(child, newPath, res);
  }
}
