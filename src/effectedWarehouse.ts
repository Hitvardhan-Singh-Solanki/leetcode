export function findEffectedWarehouse(
  warehouseIds: number[],
  parentWarehouseIds: number[],
  effectedWarehouse: number
): number[] {
  if (warehouseIds.length === 0) return [];

  const map = new Map<number, number[]>();

  for (let i = 0; i < parentWarehouseIds.length; i++) {
    const childId = warehouseIds[i];
    const parentId = parentWarehouseIds[i];

    if (map.has(parentId)) map.get(parentId)!.push(childId);
    else map.set(parentId, [childId]);
  }

  const res: number[] = [];
  const visited = new Set<number>();
  dfs(effectedWarehouse, map, res, visited);
  return res;
}

// helper dfs function
function dfs(
  node: number,
  map: Map<number, number[]>,
  res: number[],
  visited: Set<number>
) {
  if (visited.has(node)) return;
  res.push(node);
  visited.add(node);
  const children = map.get(node) || [];
  if (!children || children.length === 0) return;
  for (const child of children) dfs(child, map, res, visited);
}
