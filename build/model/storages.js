import { readFile } from "fs/promises";
const CONSTANTS = JSON.parse(await readFile("./config/constant.json", 'utf8'));
export class MetalStorage {
    constructor() {
        this.level = 0;
        this.robotLevel = 0;
        this.naniteLevel = 0;
        this.lifeformStorageBonus = 0;
    }
    updateContext() {
        this.level = 10;
        this.robotLevel = 10;
        this.naniteLevel = 2;
        this.lifeformStorageBonus = 1.04;
    }
    computeCapacity(level) {
        return 5000 * Math.floor(2.5 * Math.exp((20 / 33) * level)) * this.lifeformStorageBonus;
    }
    get capacity() {
        this.updateContext();
        return this.computeCapacity(this.level);
    }
    get upgradedCapacity() {
        this.updateContext();
        return this.computeCapacity(this.level + 1);
    }
    get upgradeCost() {
        this.updateContext();
        return {
            metal: 500 * Math.pow(2, this.level + 1),
            crystal: 0,
            deuterium: 0,
            energy: 0
        };
    }
    get upgradeDuration() {
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
}
export class CrystalStorage {
    constructor() {
        this.level = 0;
        this.robotLevel = 0;
        this.naniteLevel = 0;
        this.lifeformStorageBonus = 0;
    }
    updateContext() {
        this.level = 9;
        this.robotLevel = 10;
        this.naniteLevel = 2;
        this.lifeformStorageBonus = 1.04;
    }
    computeCapacity(level) {
        return 5000 * Math.floor(2.5 * Math.exp((20 / 33) * level)) * this.lifeformStorageBonus;
    }
    get capacity() {
        this.updateContext();
        return this.computeCapacity(this.level);
    }
    get upgradedCapacity() {
        this.updateContext();
        return this.computeCapacity(this.level + 1);
    }
    get upgradeCost() {
        this.updateContext();
        return {
            metal: 500 * Math.pow(2, this.level + 1),
            crystal: 250 * Math.pow(2, this.level + 1),
            deuterium: 0,
            energy: 0
        };
    }
    get upgradeDuration() {
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
}
export class DeuteriumStorage {
    constructor() {
        this.level = 0;
        this.robotLevel = 0;
        this.naniteLevel = 0;
        this.lifeformStorageBonus = 0;
    }
    updateContext() {
        this.level = 8;
        this.robotLevel = 10;
        this.naniteLevel = 2;
        this.lifeformStorageBonus = 1.04;
    }
    computeCapacity(level) {
        return 5000 * Math.floor(2.5 * Math.exp((20 / 33) * level)) * this.lifeformStorageBonus;
    }
    get capacity() {
        this.updateContext();
        return this.computeCapacity(this.level);
    }
    get upgradedCapacity() {
        this.updateContext();
        return this.computeCapacity(this.level + 1);
    }
    get upgradeCost() {
        this.updateContext();
        return {
            metal: 500 * Math.pow(2, this.level + 1),
            crystal: 500 * Math.pow(2, this.level + 1),
            deuterium: 0,
            energy: 0
        };
    }
    get upgradeDuration() {
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
}
//# sourceMappingURL=storages.js.map