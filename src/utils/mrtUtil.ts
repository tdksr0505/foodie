import mrtStationInfo from '../config/mrtStation.json';
import { TOption } from '@/type';
import { off } from 'process';
const MRT_TAG_CONFIG = {
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

const getAllStationOptions = (): Array<TOption> => {
  const options: Array<TOption> = [];
  for (let lineInfo of mrtStationInfo) {
    for (let station of lineInfo.Stations) {
      options?.push({ label: station.StationName, value: station.StationID });
    }
  }
  return options;
};
export const allStationOptions = getAllStationOptions();

export const getStationName = (StationID: string): string => {
  return allStationOptions?.find((elem) => elem.value === StationID)?.label!;
};
export const getTagColor = (StationID: string): { fontColor: string; bgColor: string } => {
  for (let lineInfo of mrtStationInfo) {
    if (lineInfo.Stations.find((elem) => elem.StationID === StationID)) {
      const fontColor = MRT_TAG_CONFIG[lineInfo.LineID as keyof typeof MRT_TAG_CONFIG].font;
      const bgColor = MRT_TAG_CONFIG[lineInfo.LineID as keyof typeof MRT_TAG_CONFIG].bg;
      return { fontColor, bgColor };
    }
  }
  return { fontColor: MRT_TAG_CONFIG.BL.font, bgColor: MRT_TAG_CONFIG.BL.bg };
};
export const getFilterMrt = (StationIDArray: Array<string>): any => {
  const filterArray = [];
  for (let lineInfo of mrtStationInfo) {
    const arr = lineInfo.Stations.filter((elem) => {
      return StationIDArray.includes(elem.StationID);
    });
    if (arr.length) {
      filterArray.push(...arr);
    }
  }
  return filterArray;
};
