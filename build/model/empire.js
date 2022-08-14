import { CrystalMine, DeuteriumMine, MetalMine } from "./mines.js";
import { CrystalStorage, DeuteriumStorage, MetalStorage } from "./storages.js";
export class Planet {
    constructor(name) {
        this.metalMine = new MetalMine();
        this.crystalMine = new CrystalMine();
        this.deuteriumMine = new DeuteriumMine();
        this.metalStorage = new MetalStorage();
        this.crystalStorage = new CrystalStorage();
        this.deuteriumStorage = new DeuteriumStorage();
    }
}
//# sourceMappingURL=empire.js.map