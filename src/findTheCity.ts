export function findTheCity(
  n: number,
  edges: number[][],
  distanceThreshold: number
): number {
  const graph: Map<number, [number, number][]> = new Map();
  for (let i = 0; i < n; i++) {
    graph.set(i, []);
  }
  for (const [from, to, weight] of edges) {
    graph.get(from)!.push([to, weight]);
    graph.get(to)!.push([from, weight]);
  }

  const dijkstra = (start: number) => {
    const distances: number[] = Array(n).fill(Infinity);
    distances[start] = 0;
    const pq: [number, number][] = [];
    pq.push([0, start]);

    while (pq.length > 0) {
      const [currDist, node] = pq.shift()!;
      if (currDist > distances[node]) continue;

      for (const [neighbor, weight] of graph.get(node)!) {
        const newDist = currDist + weight;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          pq.push([newDist, neighbor]);
        }
      }

      pq.sort((a, b) => a[0] - b[0]);
    }

    return distances;
  };

  let minReachableCities = n;
  let resultCity = 0;

  for (let i = 0; i < n; i++) {
    const distances = dijkstra(i);
    const reachableCities = distances.filter(
      (distance) => distance <= distanceThreshold
    ).length;

    if (reachableCities <= minReachableCities) {
      minReachableCities = reachableCities;
      resultCity = i;
    }
  }

  return resultCity;
}
