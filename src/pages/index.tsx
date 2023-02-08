import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { TRestaurantDetail } from '@/type';
import * as Styled from '../styled/styledPage';

export default function Home() {
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
  return (
    <>
      <Link href="/restaurant/add">新增</Link>
      <Styled.RestaurantListPageBox>
        <Styled.Filter />
        <Styled.List data={listData} />
      </Styled.RestaurantListPageBox>
    </>
  );
}
