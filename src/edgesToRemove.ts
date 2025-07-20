/*
Alice and Bob have an undirected graph of n nodes and three types of edges:

Type 1: Can be traversed by Alice only.
Type 2: Can be traversed by Bob only.
Type 3: Can be traversed by both Alice and Bob.

Given an array edges where edges[i] = [typei, ui, vi] represents a bidirectional edge 
of type typei between nodes ui and vi, find the maximum number of edges you can remove 
so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. 
The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.

Return the maximum number of edges you can remove, or return -1 if Alice and Bob cannot fully traverse the graph.

*/

import { DisjointSet } from './DisjointSet';

export function maxNumEdgesToRemove(n: number, edges: number[][]): number {
  const dsA = new DisjointSet(n);
  const dsB = new DisjointSet(n);
  let edgesRemoved = 0;

  for (const [type, u, v] of edges) {
    if (type === 3) {
      if (dsA.find(u) === dsB.find(v)) edgesRemoved++;
      else {
        dsA.union(u, v);
        dsB.union(u, v);
      }
    }
  }

  for (const [type, u, v] of edges) {
    if (type === 1) {
      if (dsA.find(u) === dsA.find(v)) {
        edgesRemoved++;
      } else {
        dsA.union(u, v);
      }
    } else if (type === 2) {
      if (dsB.find(u) === dsB.find(v)) {
        edgesRemoved++;
      } else {
        dsB.union(u, v);
      }
    }
  }

  let totalCompA = 0;
  let totalCompB = 0;

  for (let i = 1; i <= n; i++) {
    if (dsA.find(i) === i) totalCompA++;
    if (dsB.find(i) === i) totalCompB++;

    if (totalCompA > 1 || totalCompB > 1) return -1;
  }

  return edgesRemoved;
}
