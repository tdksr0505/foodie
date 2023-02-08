import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { TRestaurantFormData } from '@/type';
import RestaurantForm from '@/components/RestaurantForm';

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailData, setDetailData] = useState<TRestaurantFormData | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      const data = await fetch(`/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          setDetailData(response);
        });
    };

    fetchData();
  }, [router.isReady]);
  return (
    <>
      <RestaurantForm title="Edit" data={detailData}></RestaurantForm>;
    </>
  );
}
