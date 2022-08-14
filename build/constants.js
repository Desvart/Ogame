export const CONSTANTS = {
    universe: {
        speed: 4,
    },
    building: {
        mine: {
            metal: {
                cost: {
                    base: {
                        power: 1.5,
                        metal: 60,
                        crystal: 15,
                        deuterium: 0,
                    },
                },
                production: {
                    basicIncome: 30,
                    power: 1.1,
                    baseMultiplier: 30,
                    plasmaMultiplier: 0.01,
                    positionFactor: [1, 1, 1, 1, 1, 1.17, 1.23, 1.35, 1.23, 1.17, 1, 1, 1, 1, 1],
                },
                consumption: {
                    multiplier: 10,
                    power: 1.1,
                },
            },
        },
    },
    staff: {
        geologist: {
            metalMult: 0.1,
        },
        all: {
            metalMult: 0.02,
        },
    },
};
//# sourceMappingURL=constants.js.map