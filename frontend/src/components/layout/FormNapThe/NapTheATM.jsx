import { Container, Button, Form, InputGroup, Card, Badge } from 'react-bootstrap';
import styles from './styles.module.css';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import Table from 'react-bootstrap/Table';
import CopyButton from '@components/common/CopyButton/CopyButton';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { auth } from '@/_config/firebase';
import { AtmPaymentContext } from '@contexts/AtmPaymentProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import formatMoney from '@/util/formatMoney';
import { format } from 'date-fns';
function NapTheATM() {
  const { containerForm, wrapPer, customInput } = styles;
  const navigator = useNavigate();
  const { formik, url, data, loading } = useContext(AtmPaymentContext);
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
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) navigator('/login');
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={containerForm}>
      <Container className="py-5">
        <Breadcrumbs title={'Nạp ATM'} desc={'Nạp ATM'} />
        <div
          className={wrapPer}
          style={{
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            padding: '18px 18px 48px',
          }}
        >
          <h1 className="text-center">NẠP QUA ATM TẶNG 15%</h1>
          <p className="text-danger fw-bold fs-5 text-center">Vui lòng nhập số tiền muốn nạp</p>
          <Form onSubmit={formik.handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text>Số tiền</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Nhập số tiền..."
                className={customInput}
                {...formik.getFieldProps('amount')}
              />
              <InputGroup.Text>VNĐ</InputGroup.Text>
            </InputGroup>
            {formik.touched.amount && formik.errors.amount ? (
              <div className="text-danger fw-bold mb-2">{formik.errors.amount}</div>
            ) : null}
            <Button variant="primary" type="submit">
              Tạo lệnh nạp
            </Button>
          </Form>
          <Table striped bordered hover responsive className="mt-3">
            <thead>
              <tr>
                <th>
                  <CopyButton text={'BVID'} />
                </th>
                <th>
                  <CopyButton text={'Nguyễn Ngọc Qúy'} />
                </th>
                <th>
                  <CopyButton text={'96247GDTH5'} />
                </th>
              </tr>
            </thead>
          </Table>
          {url && (
            <div>
              <img src={url || 'chưa có url'} alt={url} />
            </div>
          )}
          <div style={{ lineHeight: '1.6' }}>
            <strong>Hệ thống nạp tự động, vui lòng điền đúng nội dung ck :</strong>
            <br />
            <span>
              Bước 1: Điền số tiền cần nạp sau đó
              <span className="text-danger"> bấm tạo lệnh nạp </span>
              để hiện mã QR
            </span>
            <br />
            <span>
              Bước 2 : <span className="text-danger fw-bold">Quét mã QR</span>
            </span>
            <br />
            <span>
              Bước 3: Chuyển tiền và đợi Chờ khoảng 10 giây reload lại trang số dư sẽ được cập nhật.
            </span>
            <br />
            <span>
              Mỗi lần nạp khách hàng vui lòng
              <span className="text-danger"> tạo đơn nạp mới </span>
              để lấy STK và nội dung mới Lưu ý :
              <strong className="text-danger">
                Hệ thống sẽ hủy giao dịch nếu không nhận được thanh toán trong vòng 15 phut
              </strong>
            </span>
          </div>
        </div>
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
                        <td className="fw-bold">
                          {formatMoney(item.amount.$numberDecimal || 0)} VNĐ
                        </td>
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
      </Container>
    </div>
  );
}
export default NapTheATM;
