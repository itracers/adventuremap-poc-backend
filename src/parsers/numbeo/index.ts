import Cheerio from 'cheerio';
import * as Superagent from 'superagent';

import NUMBEO_CONFIG from './config';

export default class NumbeoParser {
  async parseTotal() {
    let result: any = {};
    for (let prefix in NUMBEO_CONFIG.prefixes) {
      let prefixValue = NUMBEO_CONFIG.prefixes[prefix];

      let response = await Superagent.get(`${NUMBEO_CONFIG.host}${prefixValue.path}`);
      let rawData = response.text;
      const cheerio = Cheerio.load(rawData, { xmlMode: false });
      const elements = cheerio('#t2 > tbody > tr');

      result[prefix] = Object.values(prefixValue.suffixes).reduce((result, suffix) => {
        //@ts-ignore
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

      let response = await Superagent.get(`${NUMBEO_CONFIG.host}${prefixValue.path}`);
      let rawData = response.text;
      const cheerio = Cheerio.load(rawData, { xmlMode: false });
      const headers = cheerio('#t2 > thead > tr > th').toArray().map(header => cheerio(header).text());

      result[prefix] = cheerio('#t2 > tbody > tr').toArray().map((row, rowIndex) =>
        cheerio(row).children().toArray().reduce((result, element, i) => {
          const key = prefixValue.suffixes[headers[i]];
          result[key] = key === 'rank' ? rowIndex + 1 : cheerio(element).text();
          if (!['country_name', 'rank'].includes(key)) {
            result[key] = parseFloat(result[key]);
          }
          if (key === 'country_name' && NUMBEO_CONFIG.country_name_replacements[result[key]]) {
            result[key] = NUMBEO_CONFIG.country_name_replacements[result[key]];
          }
          return result;
        }, {})
      );
    }
    return result;
  }
  async getFeatureNamesMapping() {
    return NUMBEO_CONFIG.feature_names;
  }
}