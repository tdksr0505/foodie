import type { TRestaurantData } from '@/type';
import RestaurantForm from '@/components/RestaurantForm';
import { getRestaurantDetail } from '@/lib/api';
import { getSession } from 'next-auth/react';

export default function RestaurantDetail({ id, detailData }: { id: string; detailData: TRestaurantData }) {
  return <RestaurantForm title="Edit" data={detailData} id={id} />;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const id = context.params.id;
  const result = await getRestaurantDetail(id);
  if (!result.data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { detailData: result.data, id },
  };
}
