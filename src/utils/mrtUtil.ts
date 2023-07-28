import mrtStationConfig from '../config/mrtStationConfig.json';
import { TOption } from '@/type';
const MRT_COLOR_CONFIG: { [x: string]: { font: string; bg: string } } = {
  BL: {
    font: '#ffffff',
    bg: '#0070bd',
  },
  BR: {
    font: '#ffffff',
    bg: '#c48c31',
  },
  G: {
    font: '#ffffff',
    bg: '#008659',
  },
  O: {
    font: '#000000',
    bg: '#f8b61c',
  },
  Y: {
    font: '#000000',
    bg: '#ffdb00',
  },
  R: {
    font: '#ffffff',
    bg: '#e3002c',
  },
};

const MRT_LINE: { [x: string]: string } = {
  BL: '板南線',
  BR: '文湖線',
  G: '松山新店線',
  O: '中和新蘆線',
  Y: '環狀線',
  R: '淡水信義線',
};

const DEFAULT_FONT_COLOR = MRT_COLOR_CONFIG.BL.font;
const DEFAULT_BG_COLOR = MRT_COLOR_CONFIG.BL.bg;

/**
 * 根據捷運站ID取得捷運站名稱
 * @param StationID - 捷運站ID
 * @returns 捷運站名稱
 */
export const getStationName = (StationID: string): string => {
  return mrtStationConfig[StationID as keyof typeof mrtStationConfig].name;
};

const checkTransferStation = (stationID: string): string | null => {
  // 若為轉乘站,回傳另一條線的id, 若不是則回傳null
  const stationName = getStationName(stationID);
  const mrtStationArray = Object.entries(mrtStationConfig);
  const transferStation = mrtStationArray.filter((elem) => {
    return elem[1].name === stationName && stationID !== elem[0];
  });
  return transferStation.length > 0 ? transferStation[0][0] : null;
};
const getMrtStationsOptions = (): TOption[] => {
  const stationOptions: TOption[] = [];
  for (const [stationID, stationInfo] of Object.entries(mrtStationConfig)) {
    if (!stationOptions.find((elem) => elem.label === stationInfo.name)) {
      // 篩選轉乘站
      stationOptions.push({ label: stationInfo.name, value: stationID });
    }
  }
  return stationOptions;
};

const mrtStationOptions = getMrtStationsOptions();

export { mrtStationOptions };

/**
 * 根據捷運站ID取得捷運站標籤顏色
 * @param StationID - 捷運站ID
 * @returns 捷運站標籤顏色(包含背景色及字體顏色)
 */
export const getStationColor = (StationID: string): { fontColor: string; bgColor: string[] } => {
  const stationName = mrtStationConfig[StationID as keyof typeof mrtStationConfig].name;
  const stationLines: string[] = [];
  for (const [stationID, stationInfo] of Object.entries(mrtStationConfig)) {
    // 檢查該車站是否為轉乘站,有兩條線經過
    if (stationInfo.name === stationName) {
      stationLines.push(stationInfo.line);
    }
  }
  const fontColor = MRT_COLOR_CONFIG[stationLines[0]].font;
  const bgColor = stationLines.reduce((pre, cur) => {
    pre.push(MRT_COLOR_CONFIG[cur].bg);
    return pre;
  }, [] as string[]);

  return {
    fontColor: fontColor,
    bgColor: bgColor,
  };
};

/**
 * 根據捷運站id生成篩選器的捷運站資料(路線、站名)
 * @param StationIDArray - 捷運站ID
 * @returns 篩選器的捷運站資料
 */
export const getFilterMrt = (StationIDArray: string[]): { [x: string]: TOption[] } => {
  const filterMrt: { [x: string]: TOption[] } = {};
  StationIDArray.forEach((stationID) => {
    const lineID = mrtStationConfig[stationID as keyof typeof mrtStationConfig].line;
    if (lineID in filterMrt) {
      filterMrt[lineID].push({
        label: mrtStationConfig[stationID as keyof typeof mrtStationConfig].name,
        value: stationID,
      });
    } else {
      filterMrt[lineID] = [
        { label: mrtStationConfig[stationID as keyof typeof mrtStationConfig].name, value: stationID },
      ];
    }
  });
  return filterMrt;
};

/**
 * 根據捷運路線ID取得路線名稱
 * @param lineID - 捷運路線ID
 * @returns 路線名稱
 */
export const getLineName = (lineID: string): string | null => {
  if (lineID in MRT_LINE) {
    return MRT_LINE[lineID];
  }
  return null;
};

/**
 * 根據捷運路線ID取得路線標籤顏色
 * @param lineID - 捷運路線ID
 * @returns 路線標籤顏色(包含背景色及字體顏色)
 */
export const getLineColor = (lineID: string): { fontColor: string; bgColor: string } => {
  if (lineID in MRT_COLOR_CONFIG) {
    return { fontColor: MRT_COLOR_CONFIG[lineID].font, bgColor: MRT_COLOR_CONFIG[lineID].bg };
  }
  return { fontColor: DEFAULT_FONT_COLOR, bgColor: DEFAULT_BG_COLOR };
};
