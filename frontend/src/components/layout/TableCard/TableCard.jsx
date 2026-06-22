import { Card, Spinner, Button, Form, Tab, Tabs } from 'react-bootstrap';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ToastMessgeContext } from '@contexts/ToastMessgeProvider';
import { AuthContext } from '@contexts/AuthProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import { RechagresContext } from '@contexts/RechagresProvider';
import SelectBox from '@components/common/SelectBox/SelectBox';
import { CARD_TYPES, DENOMINATIONS } from '@components/common/SelectBox/contans/contans';

function TableCard() {
  const { toast } = useContext(ToastMessgeContext);
  const { userDT, loadingUser } = useContext(AuthContext);
  const { formik, getData } = useContext(RechagresContext);
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Tabs defaultActiveKey="napThe" className="mb-3" fill>
          <Tab eventKey="napThe" title="Nạp thẻ">
            {loadingUser ? (
              <LoadingCommon />
            ) : userDT ? (
              <Form noValidate onSubmit={formik.handleSubmit} method="formdarta">
                {/* TELCO */}
                <Form.Group className="mt-3 mb-3">
                  {/* Cho Loại thẻ */}
                  <SelectBox
                    formik={formik}
                    data={CARD_TYPES}
                    name={'telco'}
                    placeholder="Chọn loại thẻ"
                  />
                </Form.Group>

                {/* AMOUNT */}
                <Form.Group className="mb-3">
                  <SelectBox formik={formik} data={DENOMINATIONS} name={'monney'} isMoney={true} />
                </Form.Group>

                {/* SERIAL */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="serial"
                    placeholder="Nhập số serial"
                    value={formik.values.serial}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.serial && formik.errors.serial && (
                    <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>
                      {formik.errors.serial}
                    </div>
                  )}
                </Form.Group>

                {/* CODE */}
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="code"
                    placeholder="Nhập mã thẻ"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.code && formik.errors.code && (
                    <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>
                      {formik.errors.code}
                    </div>
                  )}
                </Form.Group>

                <Button type="submit" className="w-100 py-2">
                  Nạp thẻ
                </Button>
              </Form>
            ) : (
              <div className="mt-5 text-center">
                <h4 className="text-uppercase">
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
