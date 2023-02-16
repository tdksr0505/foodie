import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { TRestaurantFormData } from '@/type';
import RestaurantForm from '@/components/RestaurantForm';
import useLoading from '@/hooks/useLoading';
export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailData, setDetailData] = useState<TRestaurantFormData | undefined>(undefined);
  const { setLoading } = useLoading();
  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          const { _id, ...reset } = response.data;
          setDetailData(reset);
          setLoading(false);
        });
    };

    fetchData();
  }, [router.isReady]);
  return (
    <>
      <RestaurantForm title="Edit" data={detailData} id={id}></RestaurantForm>
    </>
  );
}
