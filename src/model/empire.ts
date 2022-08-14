import {CrystalMine, DeuteriumMine, MetalMine} from "./mines.js";
import {CrystalStorage, DeuteriumStorage, MetalStorage} from "./storages.js";


export class Planet {

    public metalMine: MetalMine;
    public crystalMine: CrystalMine;
    public deuteriumMine: DeuteriumMine;
    public metalStorage: MetalStorage;
    public crystalStorage: CrystalStorage;
    public deuteriumStorage: DeuteriumStorage;

    constructor(name: string) {
        this.metalMine = new MetalMine();
        this.crystalMine = new CrystalMine();
        this.deuteriumMine = new DeuteriumMine();
        this.metalStorage = new MetalStorage();
        this.crystalStorage = new CrystalStorage();
        this.deuteriumStorage = new DeuteriumStorage();
    }



}