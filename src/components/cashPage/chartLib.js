export const Funct1 = () => {
    console.log("Fuck off and die")
}

export const createDatasets = (obj, raceToManipulate) => {
    //console.log("createDatasets() object V ");
    console.log("raceTOmanipulate" + raceToManipulate);
  
    var dataPack1 = [];
    var dataPack2 = [];
    var dataPack3 = [];
    var raceNr = [];
  
    for (var i = 0; i < obj.length; i++) {
      dataPack1[i] = obj[i].largeKart;
      dataPack2[i] = obj[i].smallKart;
      dataPack3[i] = obj[i].doubleKart;
      raceNr[i] = parseInt(obj[i].raceNr, 10);
    };
    if (raceToManipulate>5){
      console.log("TJOOO");
      console.log(raceToManipulate-5);
      for (var i = 1; i <= raceToManipulate-5; i++) {
        dataPack1.shift();
        dataPack2.shift();
        dataPack3.shift();
        raceNr.shift();
        console.log("TJOOO");
      };
    }
    if (raceNr.length < 11) {
      console.log("TRUUUE")
      var startNr = +raceNr[raceNr.length - 1] + 1;
      for (var i = raceNr.length + 1; i <= 11; i++) {
        console.log("TRUUUE")
        dataPack1.push(0);
        dataPack2.push(0);
        dataPack3.push(0);
        raceNr.push(startNr);
        console.log("Hej" + raceNr);
        startNr++;
      }
    };
    var dataPackObject = {
        dataPack1,dataPack2,dataPack3,raceNr
    }
    return dataPackObject
    //console.log("stora" + dataPack1)
    //console.log("små" + dataPack2)
    //console.log("dubbla" + dataPack3)

    
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
    
