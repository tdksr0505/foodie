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
const useMrt = () => {
  const getTagColor = (StationID: string) => {
    // 回傳顏色
    let fontColor: string | null = null;
    let bgColor: string | null = null;
    const mrtTagConfigArr = Object.entries(MRT_TAG_CONFIG);

    for (const [key, value] of mrtTagConfigArr) {
      if (StationID.includes(key)) {
        fontColor = value.font;
        bgColor = value.bg;
        return { fontColor, bgColor };
      }
    }
    return {
      fontColor: MRT_TAG_CONFIG.BL.font,
      bgColor: MRT_TAG_CONFIG.BL.bg,
    };
  };

  const getStationName = (StationID: string) => {
    for (const lineElem of mrtStationInfo) {
      const result = lineElem.Stations.filter((stationElem) => {
        return stationElem.StationID === StationID;
      });
      if (result.length > 0) {
        return result[0].StationName;
      }
    }
  };

  const getAllStations = () => {};
  return { getTagColor, getStationName };
};
export default useMrt;
