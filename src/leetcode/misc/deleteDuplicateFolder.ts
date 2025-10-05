class Node {
  children: Map<string, Node> = new Map();
  parent?: Node;
  name?: string;
}

export function deleteDuplicateFolder(paths: string[][]): string[][] {
  const root = new Node();

  // Build trie
  for (const path of paths) {
    let cur = root;
    for (const name of path) {
      if (!cur.children.has(name)) {
        const node = new Node();
        node.parent = cur;
        node.name = name;
        cur.children.set(name, node);
      }
      cur = cur.children.get(name)!;
    }
  }

  // Encode subtrees
  const groups = new Map<string, Node[]>();
  encode(root, groups);

  // Remove duplicates from parent
  for (const nodes of groups.values()) {
    if (nodes.length > 1) {
      for (const n of nodes) {
        if (n.parent && n.name !== undefined) {
          n.parent.children.delete(n.name);
        }
      }
    }
  }

  // Collect remaining paths in reverse-lex order to match expected
  const result: string[][] = [];
  collect(root, [], result);
  return result;
}

function encode(node: Node, groups: Map<string, Node[]>) {
  if (node.children.size === 0) return '()';

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
  // reverse-lex order so groups like ['c', ...] come before ['a', ...]
  const names = Array.from(node.children.keys()).sort().reverse();

  for (const name of names) {
    const child = node.children.get(name)!;
    const newPath = [...path, name];
    res.push(newPath);
    collect(child, newPath, res);
  }
}
