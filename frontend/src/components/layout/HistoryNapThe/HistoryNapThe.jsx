import { useContext, useEffect, useState } from 'react';
import { Table, Badge, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { getHistory } from '@config/api/recharges/recharges';
import { AuthContext } from '@contexts/AuthProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import { useLocation } from 'react-router-dom';
import formatMoney from '@util/formatMoney';
dayjs.extend(relativeTime);
dayjs.locale('vi');

function HistoryNapThe() {
  const { userDT } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const slug = location.pathname;
    const keywords = ['/member/transaction/card', 'nap-card'];
    const isSlug = keywords.some((keyword) => slug.includes(keyword));
    if (!isSlug) return;
    setLoading(true);
    if (userDT?._id) {
      getHistory({ userId: userDT._id })
        .then((res) => {
          setData(res.data.listHistory || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Lỗi khi lấy lịch sử:', error);
          setLoading(false);
        });
    }
  }, [userDT, location.pathname]);

  const formatTime = (date) => dayjs(date).format('HH:mm DD/MM/YYYY');

  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <Badge bg="success">Thành công</Badge>;
      case 3:
        return <Badge bg="danger">Thất bại</Badge>;
      default:
        return <Badge bg="warning">Đang xử lý</Badge>;
    }
  };

  return (
    <Card className="shadow">
      <Card.Body>
        <h4 className="mb-4">Lịch Sử Nạp Tiền</h4>
        {loading ? (
          <LoadingCommon isPending={loading} />
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nhà mạng</th>
                <th>Mệnh giá</th>
                <th>Serial</th>
                <th>Mã thẻ</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.telco}</td>
                    <td>{formatMoney(Number(item.amount.$numberDecimal))}</td>
                    <td>{item.serial}</td>
                    <td>{item.code}</td>
                    <td>{renderStatus(+item.status)}</td>
                    <td>{formatTime(item.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

export default HistoryNapThe;
