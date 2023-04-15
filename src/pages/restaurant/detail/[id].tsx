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
import { getRestaurantDetail, deleteRestaurant } from '@/lib/api';

export default function RestaurantDetail({ detailData, id }: { detailData: TRestaurantFormData; id: string }) {
  const { auth } = useAuth();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();

  const handleDelete = async () => {
    setOpenDialog(false);
    setLoading(true);
    const result = await deleteRestaurant(id);
    if (result.code === 0) {
      setLoading(false);
      showSnackbar(result.data.msg);
      router.push(`/`);
    }
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
              <Detail.DataLabel>地址：</Detail.DataLabel>
              <Detail.DataValue>
                <div>
                  {detailData.address}
                  <Detail.MapLink href={`https://www.google.com/maps?q=${detailData.name}`} target="_blank">
                    &nbsp;(開啟地圖)
                  </Detail.MapLink>
                </div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>電話：</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.tel}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>餐廳類型：</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.type}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>是否可訂位：</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.canReserve ? '可訂位' : '不可訂位'}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            <Detail.DataRow>
              <Detail.DataLabel>是否吃過：</Detail.DataLabel>
              <Detail.DataValue>
                <div>{detailData.isVisited ? '已吃過' : '沒吃過'}</div>
              </Detail.DataValue>
            </Detail.DataRow>
            {detailData.isReturnVisited !== null && (
              <Detail.DataRow>
                <Detail.DataLabel>是否回訪：</Detail.DataLabel>
                <Detail.DataValue>
                  <div>{detailData.isReturnVisited ? '可回訪' : '不用回訪'}</div>
                </Detail.DataValue>
              </Detail.DataRow>
            )}
            <Detail.DetailButtonArea>
              <div>
                {auth && (
                  <>
                    <Link href={`/restaurant/edit/${id}`}>
                      <Button>編輯</Button>
                    </Link>
                    <Detail.DeleteButton onClick={onClickDelete}>刪除</Detail.DeleteButton>
                  </>
                )}
              </div>
              <div>
                <Link href="/">
                  <Button>返回列表</Button>
                </Link>
              </div>
            </Detail.DetailButtonArea>
          </>
        )}
      </WhiteBox>
      <Dialog title={'確定要刪除餐廳嗎?'} handleAgree={handleDelete} open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const result = await getRestaurantDetail(id);
  if (!result.data) {
    const { res } = context;
    res.writeHead(301, { Location: '/' });
    res.end();
  }
  return {
    props: { detailData: result.data, id },
  };
}
