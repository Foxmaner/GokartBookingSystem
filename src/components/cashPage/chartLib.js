import stringify from "json-stringify-safe";
import printJS from 'print-js'

export const Funct1 = () => {
  //console.log("Fuck off and die")
}

export const printTodayData = (raceData) => {
  var printableRaceData = []

  for (var i = 0; i < raceData.length; i++) {
    var largeKartText = ""
    var smallKartText = ""
    var doubleKartText = ""


    for (var j = 0; j < raceData[i]["largeKart"]; j++) {
      largeKartText = largeKartText + "I "
    }
    for (var j = 0; j < raceData[i]["smallKart"]; j++) {
      smallKartText = smallKartText + "½ "
    }
    for (var j = 0; j < raceData[i]["doubleKart"]; j++) {
      doubleKartText = doubleKartText + "D "
    }


    printableRaceData.push({
      raceNr: i + 1,
      largeKart: largeKartText,
      smallKart: smallKartText,
      doubleKart: doubleKartText
    })
  }


  for (var k = raceData.length; k < 60; k++) {
    printableRaceData.push({
      raceNr: k + 1,
      largeKart: "",
      smallKart: "",
      doubleKart: ""
    })
  }

  printJS({ printable: printableRaceData, properties: ['raceNr', 'largeKart', 'smallKart', 'doubleKart'], type: 'json' })
}

export const createDatasets = (obj, raceToManipulate) => {
  var dataPack1 = [];
  var dataPack2 = [];
  var dataPack3 = [];
  var raceNr = [];
  if (raceToManipulate <= 5) {
    for (var i = 0; i < 11; i++) {
      if (obj[i] === undefined || obj[i] == null) {
        dataPack1[i] = 0;
        dataPack2[i] = 0;
        dataPack3[i] = 0;
        raceNr[i] = i + 1;
      } else {
        dataPack1[i] = obj[i].largeKart;
        dataPack2[i] = obj[i].smallKart;
        dataPack3[i] = obj[i].doubleKart;
        raceNr[i] = parseInt(obj[i].raceNr);
      }
    };
  } else {
    var raceNrToPick = raceToManipulate - 5
    for (var i = 0; i < 11; i++) {
      console.log(raceNrToPick)
      console.log("cool" + JSON.stringify(obj))
      console.log(dataPack1[raceNrToPick])
      if (obj[raceNrToPick] === undefined || obj[raceNrToPick] == null) {
        dataPack1[i] = 0;
        dataPack2[i] = 0;
        dataPack3[i] = 0;
        raceNr[i] = raceNrToPick + 1;
      } else {
        dataPack1[i] = obj[raceNrToPick].largeKart;
        dataPack2[i] = obj[raceNrToPick].smallKart;
        dataPack3[i] = obj[raceNrToPick].doubleKart;
        raceNr[i] = parseInt(obj[raceNrToPick].raceNr);
      }
      raceNrToPick++
    };
  };




  var dataPackObject = {
    dataPack1, dataPack2, dataPack3, raceNr
  }
  return dataPackObject
}

