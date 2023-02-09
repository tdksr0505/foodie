import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import type { TRestaurantDetail } from '@/type';
import * as Styled from '../styled/styledListPage';
import Filter from '../components/Filter';
import List from '../components/List';
import Button from '../components/Button';

export default function Home() {
  const router = useRouter();
  const [listData, setListData] = useState<Array<TRestaurantDetail> | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/restaurant/`)
        .then((res) => res.json())
        .then((response) => {
          setListData(response.data.restaurant);
        });
    };
    fetchData();
  }, []);

  const onClickAdd = () => {
    router.push(`/restaurant/add`);
  };
  return (
    <>
      <Styled.PageButtonArea>
        <Button onClick={onClickAdd}>新增</Button>
      </Styled.PageButtonArea>
      <Styled.RestaurantListPageBox>
        <Styled.FilterBox>
          <Filter />
        </Styled.FilterBox>
        <Styled.ListBox>
          <List data={listData} />
        </Styled.ListBox>
      </Styled.RestaurantListPageBox>
    </>
  );
}
