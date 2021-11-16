import PouchDB from 'pouchdb';

export default class DB {
    constructor(name){
        this.db = new PouchDB(name);
    }

    async getAllRaces(){
        let allRaces = await this.db.allDocs({ include_docs: true });
        return allRaces;
    };
    async setRace(raceData){
        

        var myDoc = {1:1}

        const res = await this.db.put(myDoc).then(function () {
                                    // success
                                }).catch(function (err) {
                                    if (err.name === 'conflict') {
                                    // conflict!
                                    } else {
                                    // some other error
                                    }
                                });
        
        ;
        return res;
    }





}