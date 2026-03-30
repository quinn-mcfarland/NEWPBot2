// Class Definitions
// Parent class, which will contain only a name
class StarSystem {
    constructor(name) {
        this._name = name
    }
    // Getters
    get name() { return this._name }
}
// BGS Child class, which contains data for BGS contributions
class BGSSystem extends StarSystem {
    constructor(name) {
        super(name);
        this._bonds = 0;
        this._bounties = 0;
        this._exploration = 0;
        this._warEffort = 0;
        this._influence = 0;
        this._installationDefense = 0;
        this._murder = 0;
        this._paxFails = 0;
        this._trade = 0;
        this._warband = 0;
        this._blackMarket = 0;
    }
    // Getters
    get bonds() { return this._bonds }
    get bounties() { return this._bounties }
    get exploration() { return this._exploration }
    get warEffort() { return this._warEffort }
    get influence() { return this._influence }
    get installationDefense() { return this._installationDefense }
    get murder() { return this._murder }
    get paxFails() { return this._paxFails }
    get trade() { return this._trade }
    get warband() { return this._warband }
    get blackMarket() { return this._blackMarket }
    // Setters
    set bonds(value) { this._bonds = value }
    set bounties(value) { this._bounties = value }
    set exploration(value) { this._exploration = value }
    set influence(value) { this._influence = value }
    set warEffort(value) { this._warEffort = value }
    set installationDefense(value) { this._installationDefense = value }
    set murder(value) { this._murder = value }
    set paxFails(value) { this._paxFails = value }
    set trade(value) { this._trade = value }
    set warband(value) { this._warband = value }
    set blackMarket(value) { this._blackMarket = value }
}
// Powerplay Child class, which contains data only for powerplay systems
class PowerplaySystem extends StarSystem {
    constructor (name) {
        super(name);
        this._merits = 0;
        this._acquisition = 0;
        this._reinforcement = 0;
        this._undermining = 0;
    }
    // Getters
    get merits() { return this._merits }
    get acquisition() { return this._acquisition }
    get reinforcement() { return this._reinforcement }
    get undermining() { return this._undermining }
    // Setters
    set merits(value) { this._merits = value }
    set acquisition(value) { this._acquisition = value }
    set reinforcement(value) { this._reinforcement = value }
    set undermining(value) { this._undermining = value }
}

// Global Variables
const activeBgsSystems = [];
const activePowerplaySystems = [];

export { StarSystem, BGSSystem, PowerplaySystem, activeBgsSystems, activePowerplaySystems };