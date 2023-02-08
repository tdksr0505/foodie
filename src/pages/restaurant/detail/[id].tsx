import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { TRestaurantFormData } from '@/type';
import Link from 'next/link';
import Button from '@/components/Button';
export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailData, setDetailData] = useState<TRestaurantFormData | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      await fetch(`/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((response) => {
          setDetailData(response.data);
        });
    };

    fetchData();
  }, [router.isReady]);
  const onClickEdit = () => {
    router.push(`/restaurant/edit/${id}`);
  };
  const onClickDelete = async () => {
    await fetch(`/api/restaurant/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 0) {
          console.log(response.data.msg);
          router.push(`/`);
        }
      });
  };
  return (
    <>
      <Button onClick={onClickEdit}>編輯</Button>
      <Button onClick={onClickDelete}>刪除</Button>
      {detailData && (
        <>
          <div>{detailData.name}</div>
          <div>{detailData.address}</div>
          <div>{detailData.canReserve ? '可訂位' : '不可訂位'}</div>
          <div>{detailData.isReturnVisited ? '可回訪' : '不用回訪'}</div>
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
