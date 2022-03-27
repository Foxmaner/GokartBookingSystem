import stringify from "json-stringify-safe";
import printJS from 'print-js'

export const Funct1 = () => {
    //console.log("Fuck off and die")
}

export const printTodayData = (raceData) => {
  printJS({printable: raceData, properties: ['raceNr', 'largeKart', 'smallKart', 'doubleKart'], type: 'json'})
}

export const createDatasets = (obj, raceToManipulate) => {
    //console.log("createDatasets() object V ");
    //console.log("raceTOmanipulate" + raceToManipulate);
    //console.log("COOLLER" + JSON. stringify(obj))
  
    var dataPack1 = [];
    var dataPack2 = [];
    var dataPack3 = [];
    var raceNr = [];
    if(raceToManipulate<=5){
      for (var i = 0; i < 11; i++) {
        if (obj[i] === undefined || obj[i] == null) {
          dataPack1[i] = 0;
          dataPack2[i] = 0;
          dataPack3[i] = 0;
          raceNr[i] = i+1;
        }else{  
          dataPack1[i] = obj[i].largeKart;
          dataPack2[i] = obj[i].smallKart;
          dataPack3[i] = obj[i].doubleKart;
          raceNr[i] = parseInt(obj[i].raceNr);
        }
      };
    }else{
      var raceNrToPick = raceToManipulate-5
      for (var i = 0; i < 11; i++) {
        console.log(raceNrToPick)
        console.log("cool" + JSON.stringify(obj))
        console.log(dataPack1[raceNrToPick])
        if (obj[raceNrToPick] === undefined || obj[raceNrToPick] == null) {
          dataPack1[i] = 0;
          dataPack2[i] = 0;
          dataPack3[i] = 0;
          raceNr[i] = raceNrToPick+1;
        }else{  
          dataPack1[i] = obj[raceNrToPick].largeKart;
          dataPack2[i] = obj[raceNrToPick].smallKart;
          dataPack3[i] = obj[raceNrToPick].doubleKart;
          raceNr[i] = parseInt(obj[raceNrToPick].raceNr);
        }
        raceNrToPick++
      };
    };

      


    var dataPackObject = {
        dataPack1,dataPack2,dataPack3,raceNr
    }
    //console.log("datapack" + JSON.stringify(dataPackObject))
    return dataPackObject


    
    /*chart.updateOptions({
      xaxis: {
        categories: raceNr
      },
    })
    chart.updateSeries([{
      name: 'Stora',
      data: dataPack1
    }, {
      name: 'Små',
      data: dataPack2
    }, {
      name: 'Dubbla',
      data: dataPack3
    }]);*/
  }
    
