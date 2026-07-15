import { formatRelativeTime } from '@/util/formatTime';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import ReactPaginateCommon from '@components/common/ReactPaginateCommon/ReactPaginateCommon';
import { BuyAccountContext } from '@contexts/BuyAccountProvider';
import { formatDate } from 'date-fns';
import { useContext } from 'react';
import { Card, Table, Badge, CardFooter } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Purchase() {
  const { listHistoryBuy, loading } = useContext(BuyAccountContext);
  const navigate = useNavigate();
  const handlePageClick = async (values) => {
    if (values.selected === undefined || values.selected === null || isNaN(values.selected)) {
      return;
    }
    const newPage = values.selected + 1;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('page', newPage);
    navigate(`/member/purchase?${currentParams.toString()}`);
  };
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">Lịch sử mua nick</h4>
        <strong className="text-danger d-block mb-2">
          Vui lòng đổi mật khẩu và lưu lại lịch sử ngay sau khi mua.
        </strong>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Mã Nick</th>
                <th>Tài khoản</th>
                <th>Mật khẩu</th>
                <th>Giờ</th>
                <th>Phương Thức</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    <div className="d-flex justify-content-center p-4">
                      <LoadingCommon loading={loading} />
                    </div>
                  </td>
                </tr>
              ) : Array.isArray(listHistoryBuy.list) && listHistoryBuy.list.length > 0 ? (
                listHistoryBuy.list.map((it, index) => (
                  <tr key={index + 1}>
                    <td>{it?.productId}</td>
                    <td>{it?.productInfo?.accountData?.username}</td>
                    <td className="text-danger fw-bold">
                      {it?.productInfo?.accountData?.password}
                    </td>
                    <td>{formatRelativeTime(it?.createdAt)}</td>
                    <td>{it?.paymentMethod}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Chưa có lịch sử giao dịch
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <CardFooter>
          {listHistoryBuy?.totalPages > 1 && (
            <ReactPaginateCommon
              pageCount={Math.ceil(Number(listHistoryBuy?.totalPages) || 0)}
              currentPage={(Number(listHistoryBuy?.currentPage) || 1) - 1}
              handlePageClick={handlePageClick}
            />
          )}
        </CardFooter>
      </Card.Body>
    </Card>
  );
}

export default Purchase;
