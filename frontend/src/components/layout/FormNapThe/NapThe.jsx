import { Container, Button, Form } from 'react-bootstrap';
import styles from './styles.module.css';
import HistoryNapThe from '../HistoryNapThe/HistoryNapThe';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import { useContext, useEffect, useState } from 'react';
import { auth } from '@/_config/firebase';
import { useNavigate } from 'react-router-dom';
import { RechagresContext } from '@contexts/RechagresProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import SelectBox from '@components/common/SelectBox/SelectBox';
import { CARD_TYPES, DENOMINATIONS } from '@components/common/SelectBox/contans/contans';

function NapThe() {
  const { containerTop, containerForm, wrapPer, formNapCard } = styles;
  const navigator = useNavigate();
  const { formik } = useContext(RechagresContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigator('/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigator]);

  if (loading) {
    return (
      <div className="py-5 text-center">
        <LoadingCommon />
      </div>
    );
  }
  return (
    <div className={containerForm}>
      <Container className="py-5">
        <Breadcrumbs title={'Nạp Card'} desc={'Nạp card'} />
        <div className={wrapPer}>
          <div className={containerTop}>
            <strong className="text-danger">
              Hệ thống nạp tự động, 100k nhận 100k không chiết khấu Cam kết không nuốt thẻ, vui lòng
              kiểm tra kỹ mệnh giá thẻ cào trước khi nạp
            </strong>
          </div>

          <Form noValidate onSubmit={formik.handleSubmit} id={formNapCard} method="formdarta">
            {/* TELCO */}
            <Form.Group className="mt-3 mb-3">
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
        </div>
        <HistoryNapThe />
      </Container>
    </div>
  );
}

export default NapThe;
