import { BsGrid, BsKey, BsCashStack, BsClockHistory, BsCartCheck } from 'react-icons/bs';
import { Card, Col, Row, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import styles from './styles.module.css';
import Transaction from './Transaction';
import Purchase from './Purchase';
import DashboardMember from './DashboardMember';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import { auth } from '@/_config/firebase';
import { useEffect } from 'react';
function MemberLayout() {
  const location = useLocation();
  const { memberSidebar } = styles;
  const navigator = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) navigator('/login');
    });

    return () => unsubscribe();
  }, []);
  const getTitle = () => {
    switch (location.pathname) {
      case '/member':
        return 'Tài Khoản';
      case '/member/password':
        return 'Thay đổi mật khẩu';
      default:
        return 'Tài khoản';
    }
  };
  const changleUI = () => {
    switch (location.pathname) {
      case '/member':
        return <DashboardMember />;
      case '/member/password':
        return <ChangePassword />;
      case '/member/transaction':
        return <Transaction />;
      case '/member/purchase':
        return <Purchase />;
      default:
        return 'Tài khoản';
    }
  };
  return (
    <Container className="mt-5">
      <Breadcrumbs title={getTitle()} desc={getTitle()} />

      <Row className="g-4">
        {/* Sidebar */}
        <Col xs={12} md={4} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="p-0">
              <Nav className={`flex-column ${memberSidebar}`}>
                <Nav.Link
                  as={Link}
                  to="/member"
                  active={location.pathname === '/member'}
                  style={
                    location.pathname === '/member'
                      ? {
                          backgroundColor: 'red',
                          color: '#fff',
                        }
                      : null
                  }
                >
                  <BsGrid className="me-2" />
                  Thông tin tài khoản
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/member/password"
                  active={location.pathname === '/member/password'}
                  style={
                    location.pathname === '/member/password'
                      ? {
                          backgroundColor: 'red',
                          color: '#fff',
                        }
                      : null
                  }
                >
                  <BsKey className="me-2" />
                  Đổi Mật Khẩu
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/member/transaction"
                  active={location.pathname === '/member/transaction'}
                  style={
                    location.pathname === '/member/transaction'
                      ? {
                          backgroundColor: 'red',
                          color: '#fff',
                        }
                      : null
                  }
                >
                  <BsClockHistory className="me-2" />
                  Lịch Sử Nạp Tiền
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/member/purchase"
                  active={location.pathname === '/member/purchase'}
                  style={
                    location.pathname === '/member/purchase'
                      ? {
                          backgroundColor: 'red',
                          color: '#fff',
                        }
                      : null
                  }
                >
                  <BsCartCheck className="me-2" />
                  Lịch Sử Mua Nick
                </Nav.Link>
              </Nav>
            </Card.Body>
          </Card>
        </Col>

        {/* Content */}
        <Col xs={12} md={8} lg={9}>
          {changleUI()}
        </Col>
      </Row>
    </Container>
  );
}

export default MemberLayout;
