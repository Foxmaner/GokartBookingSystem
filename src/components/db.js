import PouchDB from 'pouchdb';

export default class DB {
    constructor(name){
        this.db = new PouchDB(name);
    }

    async updateRace(raceData){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        var doc = {
            _id: today,
            raceDataField: raceData
        }

        const res = await this.db.post(doc)

        return res
    }





}