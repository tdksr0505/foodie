import mrtStationInfo from '../config/mrtStation.json';
import { TOption } from '@/type';
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

export const getAllStationOptions = () => {
  const options = <Array<TOption> | null>[];
  for (let lineInfo of mrtStationInfo) {
    for (let station of lineInfo.Stations) {
      options?.push({ label: station.StationName, value: station.StationID });
    }
  }
  return options!;
};

export const getStationName = (StationID: string): string => {
  const allStationOptions = getAllStationOptions();
  return allStationOptions.find((elem) => elem.value === StationID)?.label!;
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
