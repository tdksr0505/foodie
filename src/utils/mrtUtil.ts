import mrtStationInfo from '../config/mrtStation.json';
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
console.log(`outer mrt`);

interface IMrtOption {
  StationID: string;
  StationName: string;
}

export const getAllStationOptions = () => {
  const options = <Array<IMrtOption> | null>[];
  console.log(`for`);
  for (let lineInfo of mrtStationInfo) {
    options?.push(...lineInfo.Stations);
  }
  return options;
};

export const getStationName = (StationID: string): string => {
  console.log(`getStationName`);

  return '';
};
export const getTagColor = (StationID: string): string => {
  console.log(`getTagColor`);

  return '';
};