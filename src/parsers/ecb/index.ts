import Cheerio from 'cheerio';
import * as Superagent from 'superagent';
import ECB_CONFIG from './config';

const USES_EURO_REGEX = /EU member using the euro/;

export default class ECBParser {
  async parseData() {
    let response = await Superagent.get(ECB_CONFIG.page_url);
    let rawData = response.text;
    const cheerio = Cheerio.load(rawData, { xmlMode: false });

    const dataPoints = cheerio('.ecb-map-info > .ecb-map-info-data').toArray().map(element => ({
      countryCode2: element.attribs['data-map-info-id'],
      usingEuro: !!(element.children && cheerio(element.children.find(child => child['name'] === 'h4')).toString().match(USES_EURO_REGEX))
    }));

    return dataPoints.filter(dp => dp.countryCode2 !== 'default');
  }
}