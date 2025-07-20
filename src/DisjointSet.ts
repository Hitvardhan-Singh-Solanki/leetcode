interface IDisjointSet {
  union(u: number, v: number): void;
  find(nodeIndex: number): number;
}

export class DisjointSet implements IDisjointSet {
  parent: number[];
  size: number[];

  constructor(n: number) {
    this.parent = [];
    this.size = [];

    for (let i = 0; i <= n; i++) {
      this.parent.push(i);
      this.size.push(i);
    }
  }

  union(u: number, v: number) {
    const ulp_u = this.find(u);
    const ulp_v = this.find(v);
    if (ulp_u === ulp_v) return;

    if (this.size[ulp_u] < this.size[ulp_v]) {
      this.parent[ulp_u] = ulp_v;
      this.size[ulp_v] += this.size[ulp_u];
    } else {
      this.parent[ulp_v] = ulp_u;
      this.size[ulp_u] += this.size[ulp_v];
    }
  }

  find(nodeIndex: number): number {
    if (this.parent[nodeIndex] === nodeIndex) return nodeIndex;

    return (this.parent[nodeIndex] = this.find(this.parent[nodeIndex]));
  }
}
