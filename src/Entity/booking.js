module.exports = class {
    constructor() {
        this._id = null;
        this._jetpackId = null;
        this._start_date = null;
        this._end_date = null;
    }

    get id() {
        return this._id;
    }

    get jetpackId() {
        return this._jetpackId;
    }

    get start_date() {
        return this._start_date;
    }

    get end_date() {
        return this._end_date;
    }

    set id(value) {
        this._id = value;
    }

    set jetpackId(value) {
        this._jetpackId = value;
    }

    set start_date(value) {
        this._start_date = value;
    }

    set end_date(value) {
        this._end_date = value;
    }

    toJson() {
      return {
        id : this.id,
        jetpackId : this.jetpackId,
        start_date: this.start_date,
        end_date: this.end_date
      }
    }
}
