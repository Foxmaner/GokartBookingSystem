import PouchDB from 'pouchdb';
import upsert from 'pouchdb-upsert';
PouchDB.plugin(upsert);
export default class DB {

  constructor(name) {
    this.db = new PouchDB(name);
  }

  async myDeltaFunction(doc) {
    doc.counter = doc.counter || 0;
    doc.counter++;
    return doc;
  }


  /**
   * Updates database with new racedata. Uses upsert, which updates and insert new data.
   * @param  {JSON} raceData The changes that are going to be made
   * @return  {JSON} todayRaceData Sends back new data
   */
  async updateRace(raceData) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    var doc = {
      _id: today,
      raceDataField: raceData,
      counter: 0,
    }
    var todayRaceData = doc;

    this.db.upsert(today, function (doc) {
      doc.raceDataField = raceData;
      //doc.count++;
      if (!doc.hasOwnProperty('currentRaceNr')) {
        doc.currentRaceNr = 0;
        console.log("Added default currentRaceNr");
      }
      return doc;
    }).then(function (res) {


    }).catch(function (err) {
      // error
    });
    var todayRaceData = doc;
    return todayRaceData;
  }

  async getRaceDataDB() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    var todayRaceData = await this.db.get(today);

    todayRaceData = todayRaceData.raceDataField;
    return todayRaceData
  }

  async getCurrentRaceNrDB() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    var todayRaceData = await this.db.get(today);
    var todayCurrentRaceNr = todayRaceData.currentRaceNr;
    return todayCurrentRaceNr
  }


  async setCurrentRaceNrDB(raceNr) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;


    this.db.upsert(today, function (doc) {
      doc.currentRaceNr = raceNr;

      return doc;
    }).then(function (res) {

      console.log(res);
    }).catch(function (err) {

      console.log(error);
    });

  }


  /**
  * Updates database with new settings. Uses upsert, which updates and insert new data.
  * @param  {JSON} settings The changes that are going to be made
  * @return  None
  */
  async setSyncSettings(settings) {

    this.db.upsert("settings", function (doc) {
      doc.syncServerSettings = settings;

      return doc;
    }).then(function (res) {

      console.log(res);
    }).catch(function (err) {

      console.log(error);
    });

  }

  /**
   * Updates database with new settings. Uses upsert, which updates and insert new data.
   * @param  None
   * @return  {JSON} settings.syncServerSettings The current settings
   */
  async getSyncSettings() {
    try{
      var settings = await this.db.get("settings");
    }catch(error){
      //TODO. Return a empty settingsFile!!!
      console.log("getSyncSettings Error: " + error)
      return "";
    }

    return settings.syncServerSettings

  }
}