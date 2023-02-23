import mrtStation from '../config/mrtStation.json';
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

const getMrtStationsOptions = (): TOption[] => {
  const stationOptions: TOption[] = [];
  for (const [stationID, stationInfo] of Object.entries(mrtStation)) {
    stationOptions.push({ label: stationInfo.name, value: stationID });
  }
  return stationOptions;
};

const mrtStationOptions = getMrtStationsOptions();

export { mrtStationOptions };

export const getStationName = (StationID: string) => {
  return mrtStation[StationID as keyof typeof mrtStation].name;
};
export const getStationColor = (StationID: string): { fontColor: string; bgColor: string } => {
  const lineID = mrtStation[StationID as keyof typeof mrtStation].line;
  return {
    fontColor: MRT_COLOR_CONFIG[lineID].font,
    bgColor: MRT_COLOR_CONFIG[lineID].bg,
  };
};
export const getFilterMrt = (StationIDArray: Array<string>) => {
  const filterMrt: { [x: string]: TOption[] } = {};
  StationIDArray.forEach((stationID) => {
    const lineID = mrtStation[stationID as keyof typeof mrtStation].line;
    if (lineID in filterMrt) {
      filterMrt[lineID].push({ label: mrtStation[stationID as keyof typeof mrtStation].name, value: stationID });
    } else {
      filterMrt[lineID] = [{ label: mrtStation[stationID as keyof typeof mrtStation].name, value: stationID }];
    }
  });
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
