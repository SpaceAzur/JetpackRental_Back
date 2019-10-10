const 

module.exports = class {
    constructor() {
        this._id = null;
        this._jetpackId = null;
        this._StartDate = null;
        this._EndDate = null;
    }

    getId() {
        return this._id;
    }

    getJetpackId() {
        return this._jetpackId;
    }

    getStartDate() {
        return this._StartDate;
    }

    getEndDate() {
        return this._EndDate;
    }

    setId(value) {
        this._id = value;
    }

    setJetpackId(value) {
        this._jetpackId = value;
    }

    setStarDate(value) {
        this._StartDate = value;
    }

    setEndDate(value) {
        this._EndDate = value;
    }

    




}
