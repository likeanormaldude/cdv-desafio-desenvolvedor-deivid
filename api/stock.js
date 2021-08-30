const querystring = require("querystring");
const cache = require("./cache");
const fs = require("fs");
const path = require("path").basename(__dirname);
// const localDB = fs.readFileSync("./COTAHIST_M012021.TXT").toString();
console.log(__filename);
const localDB = fs.readFileSync(`${path}/mock-db.txt`).toString();
// const localDB = fs.readFileSync(`./mock-db.txt`).toString();

const insertStr = function (str, index, insertion) {
  if (index > 0) {
    return str.substring(0, index) + insertion + str.substr(index);
  }

  return insertion + str;
};

class Stock {
  getPrecoPregao(obj) {
    const str = obj.precoUltPregao;
    const ind = str.length - 2;
    const formatted = insertStr(str, ind, ".");
    var f = parseFloat(formatted);
    // var atual = parseFloat("29.12");

    //com R$
    var precoPregao = f.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    //sem R$
    // var f2 = atual.toLocaleString("pt-br", { minimumFractionDigits: 2 });

    return precoPregao;
  }

  async getStock(params) {
    querystring.parse(params);
    const codPapel = params.codPapel;

    // dateBr   : 15/04/2020
    // desired  : 20200415
    const _dateBr = params.dataPreg;
    const partsDate = _dateBr.split("/");

    let _date = partsDate[2] + partsDate[1] + partsDate[0];
    const cached = await cache.get(`${codPapel}-${_date}}`);

    // If it does exist, then return the cached data.
    if (cached) {
      return this.getPrecoPregao(cached);
    }

    // Otherwise, fetch the data
    const found = localDB.indexOf(codPapel);

    // If no matches
    if (found === -1) return null;

    // /PETR3/g
    const ptt = new RegExp(codPapel, "g");
    const _lines = Array.from(localDB.matchAll(ptt));

    let startingPoint;
    let endingPointLength;
    let line;
    let precoUltPregao;
    let response = {};
    let lineObject;

    if (_lines.length > 0) {
      _lines.forEach((matchObj, index) => {
        // codPapel position 13 of the line
        startingPoint = matchObj.index - 12; // Line beginning
        endingPointLength = startingPoint + 233; // Line end (246)
        line = localDB.substr(startingPoint, endingPointLength);

        // (20210119)(.+)?(PETR3)
        var ptt = new RegExp(`(${_date})(.+)?(${codPapel})`, "g");
        var arr = Array.from(line.matchAll(ptt));

        // Not found. Go to next iteration
        if (arr.length === 0) {
          return true;
        }

        // According to layout file to read the records.
        precoUltPregao = line.substr(109, 12);

        lineObject = {
          lineMatch: line,
          precoUltPregao,
        };

        // Store in cache
        cache.set(`${codPapel}-${_date}}`, lineObject, 60 * 15);
        response = lineObject;

        // Inferred that is a unique line in the local database with the given params
        return false;
      });
    }

    // Return the proper response.
    return Object.keys(response > 0) ? this.getPrecoPregao(response) : null;
  }
}

module.exports = new Stock();
