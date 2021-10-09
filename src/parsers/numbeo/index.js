// import Cheerio from 'cheerio';
// import Superagent from 'superagent';

// import NUMBEO_CONFIG from "./config";
const Cheerio = require('cheerio');
const Superagent = require('superagent');

const NUMBEO_CONFIG = require('./config');

class NumbeoParser {
  async parseTotal() {
    let result = {};
    for (let prefix in NUMBEO_CONFIG.prefixes) {
      let prefixValue = NUMBEO_CONFIG.prefixes[prefix];

      let rawData = await Superagent.get(`${NUMBEO_CONFIG.host}${prefixValue.path}`);
      rawData = rawData.text;
      const cheerio = Cheerio.load(rawData, { xmlMode: false });
      const elements = cheerio('#t2 > tbody > tr');

      result[prefix] = Object.values(prefixValue.suffixes).reduce((result, suffix) => {
        result[suffix] = elements.length;
        return result;
      }, {});
    }
    return result;
  }
  async parseData() {
    let result = {};
    for (let prefix in NUMBEO_CONFIG.prefixes) {
      let prefixValue = NUMBEO_CONFIG.prefixes[prefix];

      let rawData = await Superagent.get(`${NUMBEO_CONFIG.host}${prefixValue.path}`);
      rawData = rawData.text;
      const cheerio = Cheerio.load(rawData, { xmlMode: false });
      const headers = cheerio('#t2 > thead > tr > th').toArray().map(header => cheerio(header).text());

      return cheerio('#t2 > tbody > tr').toArray().map((row, rowIndex) =>
        cheerio(row).children().toArray().reduce((result, element, i) => {
          const key = prefixValue.suffixes[headers[i]];
          result[key] = key === 'rank' ? rowIndex + 1 : cheerio(element).text();
          return result;
        }, {})
      );
    }
  }
}

const parser = new NumbeoParser()
// parser.parseTotal()
parser.parseTotal().then(result => console.log(result)).then(() =>
  parser.parseData().then(result => console.log(result.slice(10))));

module.exports = NumbeoParser;