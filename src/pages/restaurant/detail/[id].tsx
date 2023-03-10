import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import type { TRestaurantFormData } from '@/type';
import Button from '@/components/Button';
import WhiteBox from '@/components/WhiteBox';
import Tag from '@/components/Tag';
import Dialog from '@/components/Dialog';
import * as Detail from '@/styles/styledDetailPage';
import { RateBox, Rate, Star } from '@/components/List/styledList';
import { getStationName, getStationColor } from '../../../utils/mrtUtil';
import useSnackbar from '@/hooks/useSnackbar';
import useLoading from '@/hooks/useLoading';
import useAuth from '@/hooks/useAuth';

export default function RestaurantDetail({ detailData }: { detailData: TRestaurantFormData }) {
  const { auth } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();

  const handleDelete = async () => {
    setOpenDialog(false);
    setLoading(true);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((result) => {
        if (result.code === 0) {
          setLoading(false);
          showSnackbar(result.data.msg);
          router.push(`/`);
        }
      });
  };
  const onClickDelete = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <WhiteBox>
        {detailData && (
          <>
            <Detail.TopArea>
              <Detail.Title>{detailData.name}</Detail.Title>
              {detailData.mrt.length > 0 && (
                <Detail.DetailTagBox>
                  {detailData.mrt.map((stationID) => {
                    const { fontColor, bgColor } = getStationColor(stationID);
                    const stationName = getStationName(stationID);
                    return (
                      <Tag key={stationID} fontColor={fontColor} bgColor={bgColor}>
                        {stationName}
                      </Tag>
                    );
                  })}
                </Detail.DetailTagBox>
              )}
              <RateBox>
                <Star />
                <Rate>{detailData.rate}</Rate>
              </RateBox>
            </Detail.TopArea>
            <Detail.DataRow>
              <Detail.DataLabel>?????????</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.address}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>?????????</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.tel}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>???????????????</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.type}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>??????????????????</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.canReserve ? '?????????' : '????????????'}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>???????????????</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.isVisited ? '?????????' : '?????????'}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            {detailData.isReturnVisited !== null && (
              <Detail.DataRow>
                <Detail.DataLabel>???????????????</Detail.DataLabel>
                <Detail.DataValue>
                  <div>{detailData.isReturnVisited ? '?????????' : '????????????'}</div>
                </Detail.DataValue>
              </Detail.DataRow>
            )}
            <Detail.DetailButtonArea>
              <div>
                {auth && (
                  <>
                    <Link href={`/restaurant/edit/${id}`}>
                      <Button>??????</Button>
                    </Link>
                    <Detail.DeleteButton onClick={onClickDelete}>??????</Detail.DeleteButton>
                  </>
                )}
              </div>
              <div>
                <Link href="/">
                  <Button>????????????</Button>
                </Link>
              </div>
            </Detail.DetailButtonArea>
          </>
        )}
      </WhiteBox>
      <Dialog title={'?????????????????????????'} handleAgree={handleDelete} open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant/${id}`);
  const result = await res.json();
  if (!result.data) {
    const { res } = context;
    res.writeHead(301, { Location: '/' });
    res.end();
  }
  return {
    props: { detailData: result.data },
  };
}
