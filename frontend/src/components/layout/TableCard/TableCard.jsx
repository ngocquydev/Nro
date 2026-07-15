import { Card, Button, Form, Tab, Tabs, InputGroup, Table } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '@contexts/AuthProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import { AtmPaymentContext } from '@contexts/AtmPaymentProvider';
import styles from './styles.module.scss';

function TableCard() {
  const { customInput } = styles;
  const { userDT, loadingUser } = useContext(AuthContext);
  const { formik, url, loadingButton } = useContext(AtmPaymentContext);
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Tabs defaultActiveKey="napThe" className="mb-3" fill>
          <Tab eventKey="napThe" title="Nạp ATM">
            {loadingUser ? (
              <LoadingCommon />
            ) : userDT ? (
              <div className="p-3" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h2 className="mb-3 text-center">NẠP QUA ATM TẶNG 15%</h2>
                <p className="text-danger fw-bold fs-5 text-center">
                  Vui lòng nhập số tiền muốn nạp
                </p>

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
                  {formik.touched.amount && formik.errors.amount && (
                    <div className="text-danger fw-bold mb-2">{formik.errors.amount}</div>
                  )}
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                    disabled={formik.isSubmitting || loadingButton}
                  >
                    {formik.isSubmitting || loadingButton ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Đang xử lý...
                      </>
                    ) : (
                      'Tạo lệnh nạp'
                    )}
                  </Button>
                </Form>

                {url && (
                  <div className="my-3 text-center">
                    <img
                      src={url}
                      alt="Mã QR thanh toán"
                      className="img-fluid"
                      style={{ maxWidth: '250px' }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-5 text-center">
                <h4>
                  Vui lòng <Link to="/login">Đăng nhập</Link> để sử dụng tính năng này
                </h4>
              </div>
            )}
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
}

export default TableCard;
