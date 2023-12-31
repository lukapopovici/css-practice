//declaring Backpack class with 
//the ACTIONS
//->pack()
//->unpack()
var Backpack = /** @class */ (function () {
    function Backpack(capacities) {
        this.capacities = capacities;
        this.items = {
            small: [],
            medium: [],
            big: []
        };
    }
    Backpack.prototype.canPack = function (size) {
        return this.capacities[size] > 0;
    };
    Backpack.prototype.pack = function (size, id) {
        if (this.canPack(size)) {
            this.capacities[size]--;
            this.items[size].push(id);
            return id;
        }
        return -1;
    };
    Backpack.prototype.unpack = function (size) {
        if (this.items[size].length > 0) {
            var id = this.items[size].pop();
            this.capacities[size]++;
            return id;
        }
        return -2;
    };
    return Backpack;
}());
//declarig the PackingService class with Backpack component
var PackingService = /** @class */ (function () {
    function PackingService(capacities, actions) {
        this.backpack = new Backpack(capacities);
        this.itemIdCounter = 1;
        this.results = [];
        this.performActions(actions);
    }
    PackingService.prototype.Pack = function (size) {
        var id = this.backpack.pack(size, this.itemIdCounter);
        this.results.push(id);
        if (id !== -1) {
            this.itemIdCounter++;
        }
    };
    PackingService.prototype.Unpack = function (size) {
        var id = this.backpack.unpack(size);
        this.results.push(id);
    };
    PackingService.prototype.performActions = function (actions) {
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var action = actions_1[_i];
            var actionType = action[0], size = action[1];
            if (actionType === "pack") {
                this.Pack(size);
            }
            else if (actionType === "unpack") {
                this.Unpack(size);
            }
        }
    };
    return PackingService;
}());
//exemplul din enunt
var capacities = {
    small: 8,
    medium: 4,
    big: 2
};
var actions = [
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
var packingService = new PackingService(capacities, actions);
console.log(packingService.results);
