//custom data type for Backpack
type BackpackSize = "big" | "medium" | "small";

//declaring Backpack class with 
//the ACTIONS
//->pack()
//->unpack()
class Backpack {
    private capacities: Record<string, number>;
    private items: Record<string, number[]>;
  
    constructor(capacities: Record<string, number>) {
      this.capacities = capacities;
      this.items = {
        small: [],
        medium: [],
        big: []
      };
    }
  
    canPack(size: BackpackSize): boolean {
      return this.capacities[size] > 0;
    }
  
    pack(size: BackpackSize, id: number): number {
      if (this.canPack(size)) {
        this.capacities[size]--;
        this.items[size].push(id);
        return id;
      }
      return -1;
    }
  
    unpack(size: BackpackSize): number {
      if (this.items[size].length > 0) {
        const id = this.items[size].pop()!;
        this.capacities[size]++;
        return id;
      }
      return -2; 
    }
  }
  
  //declarig the PackingService class with Backpack component
  class PackingService {
    private backpack: Backpack;
    private itemIdCounter: number;
    public results: number[];
  
    constructor(capacities: Record<string, number>, actions: [string, BackpackSize][]) {
      this.backpack = new Backpack(capacities);
      this.itemIdCounter = 1;
      this.results = [];
      
      this.performActions(actions); 
    }
  
    private Pack(size: BackpackSize): void {
      const id = this.backpack.pack(size, this.itemIdCounter);
      this.results.push(id);
      if (id !== -1) {
        this.itemIdCounter++;
      }
    }
  
    private Unpack(size: BackpackSize): void {
      const id = this.backpack.unpack(size);
      this.results.push(id);
    }
  
    private performActions(actions: [string, BackpackSize][]): void {
      for (const action of actions) {
        const [actionType, size] = action;
  
        if (actionType === "pack") {
          this.Pack(size);
        } else if (actionType === "unpack") {
          this.Unpack(size);
        }
      }
    }
  }
  
  //exemplul din enunt
  
  const capacities = {
  small: 8,
  medium: 4,
  big: 2
};

const actions: [string, BackpackSize][] = [
  ["pack", "small"],
  ["pack", "big"],
  ["pack", "big"],
  ["pack", "big"],
  ["unpack", "big"],
  ["pack", "medium"]
];

//empty declaration
/*
const capacities = {};  
const actions: [string, string][] = [];
*/
//code test
const packingService = new PackingService(capacities,actions);
console.log(packingService.results);