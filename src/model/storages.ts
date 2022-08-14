import {ICost} from "./IMine";
import {readFile} from "fs/promises";
const CONSTANTS = JSON.parse(await readFile("./config/constant.json", 'utf8'));

export class MetalStorage {

    private level: number = 0;
    private robotLevel: number = 0;
    private naniteLevel: number = 0;
    private lifeformStorageBonus: number = 0;

    constructor() {}

    updateContext(): void {
        this.level = 10;
        this.robotLevel = 10;
        this.naniteLevel = 2;
        this.lifeformStorageBonus = 1.04;
    }

    computeCapacity(level: number): number {
        return 5000 * Math.floor(2.5 * Math.exp((20/33) * level)) * this.lifeformStorageBonus;
    }

    get capacity(): number {
        this.updateContext();
        return this.computeCapacity(this.level);
    }

    get upgradedCapacity(): number {
        this.updateContext();
        return this.computeCapacity(this.level + 1);
    }

    get upgradeCost(): ICost {
        this.updateContext();
        return {
            metal: 500 * Math.pow(2, this.level + 1),
            crystal: 0,
            deuterium: 0,
            energy: 0
        };
    }

    get upgradeDuration(): number {
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
}

export class CrystalStorage {

    private level: number = 0;
    private robotLevel: number = 0;
    private naniteLevel: number = 0;
    private lifeformStorageBonus: number = 0;

    constructor() {}

    updateContext(): void {
        this.level = 9;
        this.robotLevel = 10;
        this.naniteLevel = 2;
        this.lifeformStorageBonus = 1.04;
    }

    computeCapacity(level: number): number {
        return 5000 * Math.floor(2.5 * Math.exp((20/33) * level)) * this.lifeformStorageBonus;
    }

    get capacity(): number {
        this.updateContext();
        return this.computeCapacity(this.level);
    }

    get upgradedCapacity(): number {
        this.updateContext();
        return this.computeCapacity(this.level + 1);
    }

    get upgradeCost(): ICost {
        this.updateContext();
        return {
            metal: 500 * Math.pow(2, this.level+1),
            crystal: 250 * Math.pow(2, this.level+1),
            deuterium: 0,
            energy: 0
        };
    }

    get upgradeDuration(): number {
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
}

export class DeuteriumStorage {

    private level: number = 0;
    private robotLevel: number = 0;
    private naniteLevel: number = 0;
    private lifeformStorageBonus: number = 0;

    constructor() {}

    updateContext(): void {
        this.level = 8;
        this.robotLevel = 10;
        this.naniteLevel = 2;
        this.lifeformStorageBonus = 1.04;
    }

    computeCapacity(level: number): number {
        return 5000 * Math.floor(2.5 * Math.exp((20/33) * level)) * this.lifeformStorageBonus;
    }

    get capacity(): number {
        this.updateContext();
        return this.computeCapacity(this.level);
    }

    get upgradedCapacity(): number {
        this.updateContext();
        return this.computeCapacity(this.level + 1);
    }

    get upgradeCost(): ICost {
        this.updateContext();
        return {
            metal: 500 * Math.pow(2, this.level + 1),
            crystal: 500 * Math.pow(2, this.level + 1),
            deuterium: 0,
            energy: 0
        };
    }

    get upgradeDuration(): number {
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
}