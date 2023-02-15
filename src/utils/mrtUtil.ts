import mrtStationInfo from '../config/mrtStation.json';
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

const allStationOptions: Array<TOption> = [];
const allStations: { [x: string]: string } = {};

const genStationInfo = () => {
  for (let lineInfo of mrtStationInfo) {
    for (let station of lineInfo.Stations) {
      allStationOptions?.push({ label: station.StationName, value: station.StationID });
      allStations[station.StationID] = station.StationName;
    }
  }
};

export const getAllStationOptions = (): Array<TOption> => {
  if (allStationOptions.length === 0) genStationInfo();
  return allStationOptions;
};

export const getStationName = (StationID: string): string => {
  if (allStationOptions.length === 0) genStationInfo();
  return allStations[StationID];
};
export const getTagColor = (StationID: string): { fontColor: string; bgColor: string } => {
  for (let lineInfo of mrtStationInfo) {
    if (lineInfo.Stations.find((elem) => elem.StationID === StationID)) {
      const fontColor = MRT_COLOR_CONFIG[lineInfo.LineID as keyof typeof MRT_COLOR_CONFIG].font;
      const bgColor = MRT_COLOR_CONFIG[lineInfo.LineID as keyof typeof MRT_COLOR_CONFIG].bg;
      return { fontColor, bgColor };
    }
  }
  return { fontColor: MRT_COLOR_CONFIG.BL.font, bgColor: MRT_COLOR_CONFIG.BL.bg };
};
export const getFilterMrt = (StationIDArray: Array<string>) => {
  const filterMrt: { [x: string]: TOption[] } = {};
  for (let lineInfo of mrtStationInfo) {
    let lineId = lineInfo.LineID;
    for (let station of lineInfo.Stations) {
      if (StationIDArray.includes(station.StationID)) {
        if (lineId in filterMrt) {
          filterMrt[lineId].push({ label: station.StationName, value: station.StationID });
        } else {
          filterMrt[lineId] = [{ label: station.StationName, value: station.StationID }];
        }
      }
    }
  }
  return filterMrt;
};

export const getLineName = (lineID: string) => {
  if (lineID in MRT_LINE) {
    return MRT_LINE[lineID];
  }
  return null;
};

export const getLineColor = (lineID: string) => {
  if (lineID in MRT_COLOR_CONFIG) {
    return { fontColor: MRT_COLOR_CONFIG[lineID].font, bgColor: MRT_COLOR_CONFIG[lineID].bg };
  }
  return { fontColor: MRT_COLOR_CONFIG.BL.font, bgColor: MRT_COLOR_CONFIG.BL.bg };
};
