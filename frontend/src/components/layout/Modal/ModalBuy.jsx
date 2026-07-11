import React, { useRef, useContext, useEffect, useState } from 'react';
import { Button, Table, Badge, Form, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { IoCartSharp } from 'react-icons/io5';
import formatMoney from '@/util/formatMoney';
import { AuthContext } from '@contexts/AuthProvider';
import Alert from 'react-bootstrap/Alert';
import { BuyAccountContext } from '@contexts/BuyAccountProvider';
function ModalBuy({ show, handleClose, DT }) {
  const { userDT } = useContext(AuthContext);
  const modalRef = useRef(null);
  const [countdown, setCountdown] = useState(5);
  const [paymentMethod, setPaymentMethod] = useState('ATM');
  const { setAccount, account, loading, step, setStep, onConfirm } = useContext(BuyAccountContext);
  const handlePurchase = async () => {
    const res = await onConfirm(userDT?._id, DT?._id, paymentMethod);
    if (res.success === true) {
      setAccount(res.data);
    }
  };
  const handleCloseModal = () => {
    setStep(1);
    handleClose();
  };
  useEffect(() => {
    let timer;
    if (account !== null && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && account !== null) {
      setAccount(null);
      handleCloseModal();
    }

    return () => clearInterval(timer);
  }, [account, countdown]);

  return (
    <Modal ref={modalRef} show={show} onHide={handleCloseModal} centered size="md">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fw-bold fs-5">
          <IoCartSharp size={25} className="me-2" />
          {step === 1 ? 'XÁC NHẬN MUA NICK' : 'CHỌN PHƯƠNG THỨC THANH TOÁN'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4 py-3">
        {account != null ? (
          <Alert variant="success">
            <Alert.Heading>Tài khoản đã mua!</Alert.Heading>
            <p>
              Thông tin tài khoản sẽ tự đóng sau <strong>{countdown} giây</strong>.
            </p>
            <hr />
            <p className="text-danger fw-bold">Tài khoản: {account.Username}</p>
            <p className="text-danger fw-bold">Mật khẩu: {account.Password}</p>
          </Alert>
        ) : step === 1 ? (
          <Table responsive bordered hover className="align-middle">
            <tbody>
              <tr>
                <td className="fw-bold bg-light" style={{ width: '40%' }}>
                  Hành Tinh
                </td>
                <td>
                  <Badge bg="success">{DT.planed}</Badge>
                </td>
              </tr>
              <tr>
                <td className="fw-bold bg-light">Server</td>
                <td>{DT.planed}</td>
              </tr>
              <tr>
                <td className="fw-bold bg-light text-danger">Giá ATM / Ví</td>
                <td>
                  <span className="fw-bold text-danger">
                    {formatMoney(DT.ATM?.$numberDecimal)} đ
                  </span>
                </td>
              </tr>
              <tr>
                <td className="fw-bold bg-light text-warning">Giá Thẻ (Card)</td>
                <td>
                  <span className="fw-bold text-warning">
                    {formatMoney(DT.Card?.$numberDecimal)} đ
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <Form className="py-3">
            <h6 className="mb-3">Vui lòng chọn hình thức thanh toán:</h6>
            <div className="mb-3 rounded border p-3">
              <Form.Check
                type="radio"
                id="atm-radio"
                label={`Thanh toán qua ATM/Ví (${formatMoney(DT.ATM?.$numberDecimal)}đ)`}
                name="paymentMethod"
                value="ATM"
                checked={paymentMethod === 'ATM'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
            <div className="rounded border p-3">
              <Form.Check
                type="radio"
                id="card-radio"
                label={`Thanh toán qua Thẻ cào (${formatMoney(DT.Card?.$numberDecimal)}đ)`}
                name="paymentMethod"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
            </div>
          </Form>
        )}
      </Modal.Body>

      <Modal.Footer className="bg-light">
        {/* Nút Đóng luôn hiển thị */}
        <Button variant="outline-secondary" onClick={handleCloseModal}>
          Đóng
        </Button>

        {/* Nút Quay về: Chỉ hiện ở bước 2 */}
        {step === 2 && (
          <Button
            variant="secondary"
            onClick={() => {
              setStep(1);
              setAccount(null);
            }}
          >
            Quay về
          </Button>
        )}

        {/* Nút Hành động */}
        {step === 1 ? (
          <Button variant="primary" className="fw-bold" onClick={() => setStep(2)}>
            Tiếp tục
          </Button>
        ) : (
          <Button variant="success" className="fw-bold" onClick={handlePurchase} disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : 'Xác Nhận Mua'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBuy;
