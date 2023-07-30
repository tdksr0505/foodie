import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // 引入jest-dom的自訂斷言
import Dialog from '../src/components/Dialog';

describe('Dialog', () => {
  test('測試點擊確定按鈕', () => {
    const handleAgreeMock = jest.fn();
    const onRequestCloseMock = jest.fn();

    render(<Dialog title="測試Dialog" handleAgree={handleAgreeMock} open={true} onRequestClose={onRequestCloseMock} />);

    // 確保Dialog的標題存在
    expect(screen.getByText('測試Dialog')).toBeInTheDocument();

    // 找到確定按鈕並模擬點擊
    fireEvent.click(screen.getByText('確定'));

    // 確認handleAgree函數被呼叫
    expect(handleAgreeMock).toHaveBeenCalledTimes(1);
  });

  test('測試點擊取消按鈕', () => {
    const handleAgreeMock = jest.fn();
    const onRequestCloseMock = jest.fn();

    render(<Dialog title="測試Dialog" handleAgree={handleAgreeMock} open={true} onRequestClose={onRequestCloseMock} />);

    // 確保Dialog的標題存在
    expect(screen.getByText('測試Dialog')).toBeInTheDocument();

    // 找到取消按鈕並模擬點擊
    fireEvent.click(screen.getByText('取消'));

    // 確認onRequestClose函數被呼叫
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });
});
