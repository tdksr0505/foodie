import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { TRestaurantFormData } from '@/type';
import Button from '@/components/Button';
import WhiteBox from '@/components/WhiteBox';
import Tag from '@/components/Tag';
import Dialog from '@/components/Dialog';
import * as Styled from '@/styled/styledDetailPage';
import { RateBox, Rate, Star } from '@/components/List/styledList';
import { getStationName, getTagColor } from '../../../utils/mrtUtil';
import useSnackbar from '@/hooks/useSnackbar';
import useLoading from '@/hooks/useLoading';

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailData, setDetailData] = useState<TRestaurantFormData | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    const fetchData = async () => {
      await fetch(`/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((response) => {
          setDetailData(response.data);
        });
      setLoading(false);
    };

    fetchData();
  }, [router.isReady]);

  const handleDelete = async () => {
    await fetch(`/api/restaurant/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 0) {
          showSnackbar(response.data.msg);
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
            <Styled.TopArea>
              <Styled.Title>{detailData.name}</Styled.Title>
              <Styled.DetailTagBox>
                {detailData.mrt.map((stationID) => {
                  const { fontColor, bgColor } = getTagColor(stationID);
                  const stationName = getStationName(stationID);
                  return (
                    <Tag key={stationID} fontColor={fontColor} bgColor={bgColor}>
                      {stationName}
                    </Tag>
                  );
                })}
              </Styled.DetailTagBox>
              <RateBox>
                <Star />
                <Rate>{detailData.rate}</Rate>
              </RateBox>
            </Styled.TopArea>
            <Styled.DataRow>
              <Styled.DataLabel>地址：</Styled.DataLabel>
              <Styled.DataValue>
                <div>{detailData.address}</div>
              </Styled.DataValue>
            </Styled.DataRow>
            <Styled.DataRow>
              <Styled.DataLabel>電話：</Styled.DataLabel>
              <Styled.DataValue>
                <div>{detailData.tel}</div>
              </Styled.DataValue>
            </Styled.DataRow>
            <Styled.DataRow>
              <Styled.DataLabel>餐廳類型：</Styled.DataLabel>
              <Styled.DataValue>
                <div>{detailData.type}</div>
              </Styled.DataValue>
            </Styled.DataRow>
            <Styled.DataRow>
              <Styled.DataLabel>是否可訂位：</Styled.DataLabel>
              <Styled.DataValue>
                <div>{detailData.canReserve ? '可訂位' : '不可訂位'}</div>
              </Styled.DataValue>
            </Styled.DataRow>
            <Styled.DataRow>
              <Styled.DataLabel>是否吃過：</Styled.DataLabel>
              <Styled.DataValue>
                <div>{detailData.isVisited ? '已吃過' : '沒吃過'}</div>
              </Styled.DataValue>
            </Styled.DataRow>
            <Styled.DataRow>
              <Styled.DataLabel>是否回訪：</Styled.DataLabel>
              <Styled.DataValue>
                <div>{detailData.isReturnVisited ? '可回訪' : '不用回訪'}</div>
              </Styled.DataValue>
            </Styled.DataRow>

            <Styled.DetailButtonArea>
              <div>
                <Link href="/">
                  <Button>返回列表</Button>
                </Link>
              </div>
              <div>
                <Styled.DeleteButton onClick={onClickDelete}>刪除</Styled.DeleteButton>
                <Link href={`/restaurant/edit/${id}`}>
                  <Button>編輯</Button>
                </Link>
              </div>
            </Styled.DetailButtonArea>
          </>
        )}
      </WhiteBox>
      <Dialog title={'確定要刪除餐廳嗎?'} handleAgree={handleDelete} open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
