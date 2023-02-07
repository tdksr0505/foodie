import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { TRestaurantDetail } from '@/type';
export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailData, setDetailData] = useState<TRestaurantDetail | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      const data = await fetch(`/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          setDetailData(response);
          return response;
        });
      console.log('data', data);
    };

    fetchData();
  }, [router.isReady]);
  return (
    <>
      {detailData && (
        <>
          <div>{detailData.name}</div>
          <div>{detailData.address}</div>
          <div>{detailData.canReserve ? '可訂位' : '不可訂位'}</div>
          <div>{detailData.isReturnVisted ? '可回訪' : '不用回訪'}</div>
          <div>{detailData.isVisited ? '已吃過' : '沒吃過'}</div>
          <div>{detailData.mrt}</div>
          <div>{detailData.rate}</div>
          <div>{detailData.tel}</div>
          <div>{detailData.type}</div>
        </>
      )}
    </>
  );
}
