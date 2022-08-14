import { readFile } from "fs/promises";
const CONSTANTS = JSON.parse(await readFile("./config/constant.json", 'utf8'));
export class MetalMine {
    constructor() {
        this.level = 0;
        this.planetPosition = 0;
        this.plasmaLevel = 0;
        this.geologistStatus = false;
        this.allStaffStatus = false;
        this.metalLifeformMult = 0;
        this.robotLevel = 0;
        this.naniteLevel = 0;
    }
    updateContext() {
        this.level = 22;
        this.planetPosition = 8;
        this.plasmaLevel = 7;
        this.geologistStatus = true;
        this.allStaffStatus = true;
        this.metalLifeformMult = (0.24 + 0.16 * 1.01) / 100;
        this.robotLevel = 10;
        this.naniteLevel = 2;
    }
    get upgradeCost() {
        this.updateContext();
        const power = CONSTANTS.building.mine.metal.cost.base.power;
        const metalBaseCost = CONSTANTS.building.mine.metal.cost.base.metal;
        let metalCost = Math.floor(metalBaseCost * Math.pow(power, this.level));
        const crystalBaseCost = CONSTANTS.building.mine.metal.cost.base.crystal;
        let crystalCost = Math.floor(crystalBaseCost * Math.pow(power, this.level));
        const deuteriumBaseCost = CONSTANTS.building.mine.metal.cost.base.deuterium;
        let deuteriumCost = Math.floor(deuteriumBaseCost * Math.pow(power, this.level));
        return { metal: metalCost, crystal: crystalCost, deuterium: deuteriumCost, energy: 0 };
    }
    computeProduction(planetPosition, mineLevel, plasmaLevel, metalLifeformMult) {
        const posMult = CONSTANTS.building.mine.metal.production.positionFactor[planetPosition - 1];
        const uniSpeed = CONSTANTS.universe.speed;
        const basicIncome = Math.floor(CONSTANTS.building.mine.metal.production.basicIncome * uniSpeed * posMult);
        const baseMult = CONSTANTS.building.mine.metal.production.baseMultiplier;
        const base = CONSTANTS.building.mine.metal.production.power;
        const mineIncome = Math.floor(baseMult * mineLevel * Math.pow(base, mineLevel) * uniSpeed * posMult);
        const plasmaMult = CONSTANTS.building.mine.metal.production.plasmaMultiplier;
        const plasmaIncome = mineIncome * plasmaMult * plasmaLevel;
        const geologistMult = this.geologistStatus ? CONSTANTS.staff.geologist.metalMult : 0;
        const geologistIncome = mineIncome * geologistMult;
        const allStaffMult = this.allStaffStatus ? CONSTANTS.staff.all.metalMult : 0;
        const allStaffIncome = mineIncome * allStaffMult;
        const classIncome = 0;
        const allianceIncome = 0;
        const lifeformIncome = mineIncome * metalLifeformMult;
        const production = basicIncome + mineIncome + plasmaIncome + geologistIncome + allStaffIncome + classIncome + allianceIncome + lifeformIncome;
        return Math.floor(production);
    }
    get production() {
        this.updateContext();
        return this.computeProduction(this.planetPosition, this.level, this.plasmaLevel, this.metalLifeformMult);
    }
    get upgradedProduction() {
        this.updateContext();
        return this.computeProduction(this.planetPosition, this.level + 1, this.plasmaLevel, this.metalLifeformMult);
    }
    computeConsumption(mineLevel) {
        const baseMult = CONSTANTS.building.mine.metal.consumption.multiplier;
        const power = CONSTANTS.building.mine.metal.consumption.power;
        return Math.floor(baseMult * mineLevel * Math.pow(power, mineLevel));
    }
    get consumption() {
        this.updateContext();
        return this.computeConsumption(this.level);
    }
    get upgradedConsumption() {
        this.updateContext();
        return this.computeConsumption(this.level + 1);
    }
    get upgradeDuration() {
        this.updateContext();
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
    get upgradeRoI() {
        this.updateContext();
        const upgradeCost = this.upgradeCost;
        const c2mRatio = CONSTANTS.universe.ratio.metal / CONSTANTS.universe.ratio.crystal;
        return ((upgradeCost.metal + (upgradeCost.crystal * c2mRatio)) / (this.upgradedProduction - this.production)) + this.upgradeDuration;
    }
}
export class CrystalMine {
    constructor() {
        this.level = 0;
        this.planetPosition = 0;
        this.plasmaLevel = 0;
        this.geologistStatus = false;
        this.allStaffStatus = false;
        this.crystalLifeformMult = 0;
        this.robotLevel = 0;
        this.naniteLevel = 0;
    }
    updateContext() {
        this.level = 20;
        this.planetPosition = 8;
        this.plasmaLevel = 7;
        this.geologistStatus = true;
        this.allStaffStatus = true;
        this.crystalLifeformMult = (0.24 + 0.32 * 1.01) / 100;
        this.robotLevel = 10;
        this.naniteLevel = 2;
    }
    get upgradeCost() {
        this.updateContext();
        const power = CONSTANTS.building.mine.crystal.cost.base.power;
        const metalBaseCost = CONSTANTS.building.mine.crystal.cost.base.metal;
        let metalCost = Math.floor(metalBaseCost * Math.pow(power, this.level));
        const crystalBaseCost = CONSTANTS.building.mine.crystal.cost.base.crystal;
        let crystalCost = Math.floor(crystalBaseCost * Math.pow(power, this.level));
        const deuteriumBaseCost = CONSTANTS.building.mine.crystal.cost.base.deuterium;
        let deuteriumCost = Math.floor(deuteriumBaseCost * Math.pow(power, this.level));
        return { metal: metalCost, crystal: crystalCost, deuterium: deuteriumCost, energy: 0 };
    }
    computeProduction(planetPosition, mineLevel, plasmaLevel, crystalLifeformMult) {
        const posMult = CONSTANTS.building.mine.crystal.production.positionFactor[planetPosition - 1];
        const uniSpeed = CONSTANTS.universe.speed;
        const basicIncome = Math.floor(CONSTANTS.building.mine.crystal.production.basicIncome * uniSpeed * posMult);
        const baseMult = CONSTANTS.building.mine.crystal.production.baseMultiplier;
        const base = CONSTANTS.building.mine.crystal.production.power;
        const mineIncome = Math.floor(baseMult * mineLevel * Math.pow(base, mineLevel) * uniSpeed * posMult);
        const plasmaMult = CONSTANTS.building.mine.crystal.production.plasmaMultiplier;
        const plasmaIncome = mineIncome * plasmaMult * plasmaLevel;
        const geologistMult = this.geologistStatus ? CONSTANTS.staff.geologist.metalMult : 0;
        const geologistIncome = mineIncome * geologistMult;
        const allStaffMult = this.allStaffStatus ? CONSTANTS.staff.all.metalMult : 0;
        const allStaffIncome = mineIncome * allStaffMult;
        const classIncome = 0;
        const allianceIncome = 0;
        const lifeformIncome = mineIncome * crystalLifeformMult;
        const production = basicIncome + mineIncome + plasmaIncome + geologistIncome + allStaffIncome + classIncome + allianceIncome + lifeformIncome;
        return Math.floor(production);
    }
    get production() {
        this.updateContext();
        return this.computeProduction(this.planetPosition, this.level, this.plasmaLevel, this.crystalLifeformMult);
    }
    get upgradedProduction() {
        this.updateContext();
        return this.computeProduction(this.planetPosition, this.level + 1, this.plasmaLevel, this.crystalLifeformMult);
    }
    computeConsumption(mineLevel) {
        const baseMult = CONSTANTS.building.mine.crystal.consumption.multiplier;
        const power = CONSTANTS.building.mine.crystal.consumption.power;
        return Math.floor(baseMult * mineLevel * Math.pow(power, mineLevel));
    }
    get consumption() {
        this.updateContext();
        return this.computeConsumption(this.level);
    }
    get upgradedConsumption() {
        this.updateContext();
        return this.computeConsumption(this.level + 1);
    }
    get upgradeDuration() {
        this.updateContext();
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
    get upgradeRoI() {
        this.updateContext();
        const upgradeCost = this.upgradeCost;
        const m2cRatio = CONSTANTS.universe.ratio.crystal / CONSTANTS.universe.ratio.metal;
        return ((upgradeCost.metal * m2cRatio + (upgradeCost.crystal)) / (this.upgradedProduction - this.production)) + this.upgradeDuration;
    }
}
export class DeuteriumMine {
    constructor() {
        this.level = 0;
        this.planetPosition = 0;
        this.plasmaLevel = 0;
        this.geologistStatus = false;
        this.allStaffStatus = false;
        this.deuteriumLifeformMult = 0;
        this.robotLevel = 0;
        this.naniteLevel = 0;
        this.maxTemp = 0;
    }
    updateContext() {
        this.level = 20;
        this.planetPosition = 8;
        this.plasmaLevel = 7;
        this.geologistStatus = true;
        this.allStaffStatus = true;
        this.deuteriumLifeformMult = (0.24 + 0.24 * 1.01) / 100;
        this.robotLevel = 10;
        this.naniteLevel = 2;
        this.maxTemp = 59;
    }
    get upgradeCost() {
        this.updateContext();
        const power = CONSTANTS.building.mine.deuterium.cost.base.power;
        const metalBaseCost = CONSTANTS.building.mine.deuterium.cost.base.metal;
        let metalCost = Math.floor(metalBaseCost * Math.pow(power, this.level));
        const crystalBaseCost = CONSTANTS.building.mine.deuterium.cost.base.crystal;
        let crystalCost = Math.floor(crystalBaseCost * Math.pow(power, this.level));
        const deuteriumBaseCost = CONSTANTS.building.mine.deuterium.cost.base.deuterium;
        let deuteriumCost = Math.floor(deuteriumBaseCost * Math.pow(power, this.level));
        return { metal: metalCost, crystal: crystalCost, deuterium: deuteriumCost, energy: 0 };
    }
    computeProduction(planetPosition, mineLevel, plasmaLevel, deuteriumLifeformMult, maxTemp) {
        const basicIncome = CONSTANTS.building.mine.deuterium.production.basicIncome;
        const uniSpeed = CONSTANTS.universe.speed;
        const baseMult = CONSTANTS.building.mine.deuterium.production.baseMultiplier;
        const base = CONSTANTS.building.mine.deuterium.production.power;
        const tempMult = 1.44 - (0.004 * maxTemp);
        const mineIncome = Math.floor(baseMult * mineLevel * Math.pow(base, mineLevel) * tempMult * uniSpeed);
        const plasmaMult = CONSTANTS.building.mine.deuterium.production.plasmaMultiplier;
        const plasmaIncome = mineIncome * plasmaMult * plasmaLevel;
        const geologistMult = this.geologistStatus ? CONSTANTS.staff.geologist.metalMult : 0;
        const geologistIncome = mineIncome * geologistMult;
        const allStaffMult = this.allStaffStatus ? CONSTANTS.staff.all.metalMult : 0;
        const allStaffIncome = mineIncome * allStaffMult;
        const classIncome = 0;
        const allianceIncome = 0;
        const lifeformIncome = mineIncome * deuteriumLifeformMult;
        const production = basicIncome + mineIncome + plasmaIncome + geologistIncome + allStaffIncome + classIncome + allianceIncome + lifeformIncome;
        return Math.floor(production);
    }
    get production() {
        this.updateContext();
        return this.computeProduction(this.planetPosition, this.level, this.plasmaLevel, this.deuteriumLifeformMult, this.maxTemp);
    }
    get upgradedProduction() {
        this.updateContext();
        return this.computeProduction(this.planetPosition, this.level + 1, this.plasmaLevel, this.deuteriumLifeformMult, this.maxTemp);
    }
    computeConsumption(mineLevel) {
        const baseMult = CONSTANTS.building.mine.deuterium.consumption.multiplier;
        const power = CONSTANTS.building.mine.deuterium.consumption.power;
        return Math.floor(baseMult * mineLevel * Math.pow(power, mineLevel));
    }
    get consumption() {
        this.updateContext();
        return this.computeConsumption(this.level);
    }
    get upgradedConsumption() {
        this.updateContext();
        return this.computeConsumption(this.level + 1);
    }
    get upgradeDuration() {
        this.updateContext();
        const upgradeCosts = this.upgradeCost;
        const uniSpeed = CONSTANTS.universe.speed;
        return (upgradeCosts.metal + upgradeCosts.crystal) / (2500 * (1 + this.robotLevel) * Math.pow(2, this.naniteLevel) * uniSpeed);
    }
    get upgradeRoI() {
        this.updateContext();
        const upgradeCost = this.upgradeCost;
        const c2mRatio = CONSTANTS.universe.ratio.metal / CONSTANTS.universe.ratio.crystal;
        return (upgradeCost.metal + (upgradeCost.crystal * c2mRatio)) / ((this.upgradedProduction - this.production) * CONSTANTS.universe.ratio.metal) + this.upgradeDuration;
    }
}
//# sourceMappingURL=mines.js.map