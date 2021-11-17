export const Funct1 = () => {
    console.log("Fuck off and die")
}

export const createDatasets = (obj) => {
    //console.log("createDatasets() object V ");
    //console.log(obj);
  
    var dataPack1 = [];
    var dataPack2 = [];
    var dataPack3 = [];
    var raceNr = [];
  
    for (var i = 0; i < obj.length; i++) {
      dataPack1[i] = obj[i].largeKart;
      dataPack2[i] = obj[i].smallKart;
      dataPack3[i] = obj[i].doubleKart;
      raceNr[i] = parseInt(obj[i].raceNr, 10);
    }
  
    if (obj.length < 11) {
      var startNr = +raceNr[obj.length - 1] + 1;
      for (var i = obj.length + 1; i <= 11; i++) {
        dataPack1.push(0);
        dataPack2.push(0);
        dataPack3.push(0);
        raceNr.push(startNr);
        startNr++;
      }
    }
    var dataPackObject = {
        dataPack1,dataPack2,dataPack3
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
    
