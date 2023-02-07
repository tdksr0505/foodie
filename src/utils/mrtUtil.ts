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
  console.log(`getStationName`);

  return '';
};
export const getTagColor = (StationID: string): string => {
  console.log(`getTagColor`);

  return '';
};
