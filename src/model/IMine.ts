export interface IMine {
    level: number;
    production: number; // production rate per hour
    consumption: number;
    upgrade: IUpgrade;
}

export interface IUpgrade {
    cost: ICost;
    duration: number;
    production: number; // production rate per hour
}

export interface ICost {
    metal: number;
    crystal: number;
    deuterium: number;
    energy: number;
}
