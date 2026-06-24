// File: src/components/HistoryNapATM.jsx
import React, { useContext } from 'react';
import { Card, Table, Badge, Container } from 'react-bootstrap';
import { format } from 'date-fns'; // Dùng format thay cho formatDate
import { AtmPaymentContext } from '@contexts/AtmPaymentProvider';
import formatMoney from '@/util/formatMoney';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';

function HistoryNapATM() {
  const { data, loading } = useContext(AtmPaymentContext);
  const renderStatus = (status) => {
    switch (status) {
      case 1:
        return <Badge bg="success">Thành công</Badge>;
      case 3:
        return <Badge bg="danger">Thất bại</Badge>;
      case 99:
        return (
          <Badge bg="warning" text="dark">
            Đang xử lý
          </Badge>
        );
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h5 className="mb-0">Lịch sử giao dịch ATM/Ngân hàng</h5>
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Mã giao dịch</th>
                <th>Số tiền</th>
                <th>Ngân hàng</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    <LoadingCommon />
                  </td>
                </tr>
              ) : data.data?.length > 0 ? (
                data.data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <code className="text-primary">{item.id || '---'}</code>
                    </td>
                    <td className="fw-bold">{formatMoney(item.amount.$numberDecimal || 0)} VNĐ</td>
                    <td>{item.gateway || 'N/A'}</td>
                    <td>{renderStatus(item.status)}</td>
                    <td>
                      {item.transactionDate
                        ? format(new Date(item.transactionDate), 'dd/MM/yyyy HH:mm:ss')
                        : '---'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Chưa có lịch sử giao dịch
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HistoryNapATM;
