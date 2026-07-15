import { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { BsPersonBadge, BsWallet2, BsPerson, BsGift, BsPhone } from 'react-icons/bs';
import styles from './styles.module.css';
import { AuthContext } from '@contexts/AuthProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import formatMoney from '@/util/formatMoney';

function DashboardMember() {
  const { userDT, loadingUser } = useContext(AuthContext);
  const stats = [
    {
      title: 'ID tài khoản',
      value: `#${userDT?._id || 'N/A'}`,
      icon: <BsPersonBadge size={22} />,
      color: 'primary',
      bg: styles.bgLightPrimary,
    },
    {
      title: 'Username',
      value: userDT?.username || 'N/A',
      icon: <BsPerson size={22} />,
      color: 'success',
      bg: styles.bgLightSuccess,
    },
    {
      title: 'Số điện thoại',
      value: userDT?.phone || 'Chưa cập nhật',
      icon: <BsPhone size={22} />,
      color: 'info',
      bg: styles.bgLightInfo,
    },

    {
      type: 'money',
      title: 'Số dư',
      value: formatMoney(userDT?.atm?.$numberDecimal),
      icon: <BsGift size={22} />,
      color: 'warning',
      bg: styles.bgLightWarning,
    },
  ];
  return (
    <>
      {loadingUser ? (
        <LoadingCommon loading={loadingUser} />
      ) : (
        <Card className={styles.mainDashboardCard}>
          <Card.Body className="p-4">
            <div className="d-flex align-items-center mb-4">
              <div
                className="bg-primary rounded-pill"
                style={{ width: '5px', height: '24px' }}
              ></div>
              <h4 className={`fw-bold text-uppercase ms-3 mb-0 ${styles.letterSpacing1}`}>
                Tổng quan tài khoản
              </h4>
            </div>

            <Row className="g-3">
              {stats.map((item, index) => (
                <Col xs={12} sm={6} lg={4} key={index}>
                  <Card className={styles.statItemCard}>
                    <Card.Body className="d-flex align-items-center p-3">
                      <div
                        className={`${styles.iconBox} ${item.bg} text-${item.color} rounded-3 me-3`}
                      >
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-muted small fw-medium mb-1">{item.title}</p>
                        <h6 className="fw-bold text-truncate mb-0">
                          {item.value} {item.type === 'money' ? <sup>đ</sup> : null}
                        </h6>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default DashboardMember;
