import { GetServerSidePropsContext } from 'next';
import type { TRestaurantData } from '@/type';
import RestaurantForm from '@/components/RestaurantForm';
import { getRestaurantDetail } from '@/lib/api';
import { getSession } from 'next-auth/react';

export default function RestaurantDetail({ id, detailData }: { id: string; detailData: TRestaurantData }) {
  return <RestaurantForm title="Edit" data={detailData} id={id} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session || !context.params) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const id = context.params.id;
  const result = await getRestaurantDetail(id as string);
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
