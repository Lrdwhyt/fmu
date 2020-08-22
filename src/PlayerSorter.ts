import { Player } from '@/Player';

export function sortByName(order: number) {
    return (a: Player, b: Player) => {
        if (a.name === b.name) {
            return 0;
        } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return order;
        } else {
            return -order;
        }
    };
}

export function sortByStatus(order: number) {
    return (a: Player, b: Player) => {
        if (a.isAlive === b.isAlive) {
            return 0;
        } else if (a.isAlive) {
            return -order;
        } else {
            return order;
        }
    };
}

export function sortByGroup(order: number) {
    return (a: Player, b: Player) => {
        const groupA = a.group || "";
        const groupB = b.group || "";
        if (a.group === b.group) {
            return 0;
        } else if (groupA.toLowerCase() > groupB.toLowerCase()) {
            return order;
        } else {
            return -order;
        }
    };
}

// TODO this can probably be simplified somehow
export function sortByTimeOfDeath(order: number) {
    return (a: Player, b: Player) => {
        if (a.isAlive && !b.isAlive) {
            return -order;
        } else if (!a.isAlive && b.isAlive) {
            return order;
        } else if (a.isAlive && b.isAlive) {
            return 0;
        } else {
            if (a.timeOfDeath === b.timeOfDeath) {
                return 0;
            } else if (a.timeOfDeath!.index > b.timeOfDeath!.index) {
                return -order;
            } else if (a.timeOfDeath!.index < b.timeOfDeath!.index) {
                return order;
            } else {
                if (a.timeOfDeath!.type > b.timeOfDeath!.type) {
                    return -order;
                } else if (a.timeOfDeath!.type < b.timeOfDeath!.type) {
                    return order;
                } else {
                    return 0;
                }
            }
        }
    };
}