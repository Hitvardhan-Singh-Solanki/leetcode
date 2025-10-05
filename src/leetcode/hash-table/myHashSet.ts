import { log } from 'console';

class MyHashSet<T> {
  #map = new Map<T, boolean>();

  add(key: T): void {
    this.#map.set(key, true);
  }

  remove(key: T): void {
    this.#map.set(key, false);
  }

  contains(key: T): boolean {
    if (this.#map.has(key) && this.#map.get(key)) return true;
    return false;
  }

  print(): void {
    console.log(this.#map);
  }
}

/**
 * 
// constant time add, constant time lookup but removal can be O(1)
 * MyHashSet myHashSet = new MyHashSet();
myHashSet.add(1);      // set = [1]
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(1); // return True
myHashSet.contains(3); // return False, (not found)
myHashSet.add(2);      // set = [1, 2]
myHashSet.contains(2); // return True
myHashSet.remove(2);   // set = [1]
myHashSet.contains(2); // return False, (already removed)
 */

const set = new MyHashSet<number>();

set.add(1);
set.add(2);
set.add(2);
set.contains(2);
set.print();

console.log(set.contains(1));
console.log(set.contains(3));
log(set.contains(2));
set.remove(2);
set.print();
log(set.contains(2));
