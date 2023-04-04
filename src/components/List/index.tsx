import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import * as Styled from './styledList';
import TagBox from '@/components/TagBox';
import Tag from '@/components/Tag';
import { getStationName, getStationColor } from '../../utils/mrtUtil';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { TRestaurantDetail } from '@/type';
interface IList {
  list: TRestaurantDetail[];
  setListCount: React.Dispatch<React.SetStateAction<number>>;
}
const List = ({ list, setListCount }: IList) => {
  const [data, setData] = useState<TRestaurantDetail[]>(list);
  const filter = useSelector((state: RootState) => state.filter).filter;
  const compareMrt = (filterMrt: string[], listItemMrt: string[]) => {
    //比較 filter mrt[] 和 list item的mrt[]
    for (let itemMrt of listItemMrt) {
      if (filterMrt.includes(itemMrt)) {
        return true;
      }
    }
    return false;
  };
  const filterList = () => {
    if (list) {
      const result = list.filter((elem) => {
        return (
          (filter.name === '' || elem.name.includes(filter.name)) &&
          (filter.type.length === 0 || filter.type.includes(elem.type)) &&
          (filter.mrt.length === 0 || compareMrt(filter.mrt, elem.mrt)) &&
          (filter.isVisited === null || filter.isVisited === elem.isVisited)
        );
      });
      setData(result);
      setListCount(result.length);
    }
  };

  useEffect(() => {
    filterList();
  }, [filter]);

  const BASE_DETAIL_URL = '/restaurant/detail/';
  return (
    <Styled.List>
      {data &&
        data.map((item) => {
          return (
            <Styled.ListItem key={item._id}>
              <Link href={BASE_DETAIL_URL + item._id}>
                <Styled.ListItemBox>
                  {item.isVisited && <Styled.PostTag>done</Styled.PostTag>}
                  <Styled.Title>{item.name}</Styled.Title>
                  <Styled.RateBox>
                    <Styled.Star />
                    <Styled.Rate>{item.rate}</Styled.Rate>
                  </Styled.RateBox>
                  <Styled.SimpleAddress>{item.simpleAddress}</Styled.SimpleAddress>
                  <TagBox>
                    {item.mrt.map((stationID) => {
                      const { fontColor, bgColor } = getStationColor(stationID);
                      const stationName = getStationName(stationID);
                      return (
                        <Tag key={stationID} fontColor={fontColor} bgColor={bgColor}>
                          {stationName}
                        </Tag>
                      );
                    })}
                    <Tag>{item.type}</Tag>
                  </TagBox>
                </Styled.ListItemBox>
              </Link>
            </Styled.ListItem>
          );
        })}
    </Styled.List>
  );
};

export default List;
