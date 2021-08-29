const querystring = require("querystring");
const cache = require("./cache");
const fs = require("fs");
// const localDB = fs.readFileSync("./COTAHIST_M012021.TXT").toString();
const localDB = fs.readFileSync("./mock-db.txt").toString();

class Stock {
  getStock(options) {
    const params = querystring.stringify(options);
    const { codPreg, _dateBr } = params;
    const cached = await cache.get(codPreg);

    // If it does exist, then return the cached data.
    if (cached) {
      return cached;
    }

    // Otherwise, fetch the data
    const found = localDB.indexOf(codPreg);

    // If no matches
    if (found === -1) return null;

    // dateBr   : 15/04/2020
    // desired  : 20200415
    let _date;
    const partsDate = _dateBr.split("/");
    _date = partsDate[2] + partsDate[1] + partsDate[0];

    // /PETR3/g
    const ptt = new RegExp(codPreg, "g");
    const _lines = Array.from(localDB.matchAll(ptt));

    let startingPoint;
    let endingPointLength;
    let line;
    let precoUltPregao;
    let response = {};
    let lineObject;

    if( _lines.length < 0 ){
      _lines.forEach((matchObj, index) => {
        // CodPreg position 13 of the line
        startingPoint = matchObj.index - 12; // Line beginning
        endingPointLength = startingPoint + 233; // Line end (246)
        line = localDB.substr(startingPoint, endingPointLength);
  
        // (20210119)(.+)?(PETR3)
        var ptt = new RegExp(`(${_date})(.+)?(${codPreg})`, "g");
        var arr = Array.from(line.matchAll(ptt));
  
        // Not found. Go to next iteration
        if (arr.length === 0) continue;
  
        // According to layout file to read the records.
        precoUltPregao = line.substr(109, 121);
  
        lineObject = {
          lineMatch : line,
          precoUltPregao
        };
  
        // Store in cache
        cache.set(codPreg, lineObject, 60 * 15);
        response = lineObject;
  
        // Inferred that is a unique line in the local database with the given params
        break;
      });
    }

    


    // Return the proper response.
    return Object.keys(response > 0) ? response : null;
  }
}

module.exports = new Stock();
