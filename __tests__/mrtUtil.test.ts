import * as MrtUtil from '../src/utils/mrtUtil';
import testData from './testData.json';

describe('根據捷運站ID取得捷運站名稱', () => {
  testData.stationNameTestData.forEach(({ input, output }) => {
    it(`${input}: ${output}`, () => {
      expect(MrtUtil.getStationName(input)).toBe(output);
    });
  });
});
describe('根據捷運路線ID取得捷運路線標籤顏色', () => {
  testData.lineColorTestData.forEach(({ input, output }) => {
    it(`${input}: ${output.fontColor} / ${output.bgColor}`, () => {
      expect(MrtUtil.getLineColor(input)).toEqual(output);
    });
  });
});

describe('根據捷運站id生成篩選器的捷運站資料(路線、站名)', () => {
  testData.filterMrtTestData.forEach(({ input, output }) => {
    it(`捷運站ID:[${input}]`, () => {
      expect(MrtUtil.getFilterMrt(input)).toEqual(output);
    });
  });
});
