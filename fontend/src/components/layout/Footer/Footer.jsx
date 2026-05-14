import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
function Footer() {
    const menuItems = [
        'Hướng Dẫn Xoá Dữ Liệu',
        'Giới Thiệu Uy Tín Shop',
        'HD Nạp ATM/MOMO',
        'HD Bảo Mật Nick Ngọc Rồng',
        'Hướng Dẫn Mua Tự Động',
        'Thanh Lý Nick Cho Shop',
    ];
    const location = useLocation();
    return (
        <footer>
            {location.pathname === '/' && (
                <div className='bg-dark text-white pt-5 pb-3 mt-5'>
                    <Container>
                        <Row className='gy-4'>
                            {/* Cột 1 */}
                            <Col xs={12} sm={6} lg={4}>
                                <h5 className='fw-bold mb-3'>
                                    NICKMT.COM - SHOP NICK NGỌC RỒNG
                                </h5>
                                <p className={styles.desc}>
                                    Chuyên cung cấp nick Ngọc Rồng Online uy
                                    tín, giao dịch tự động 24/7. Cam kết bảo mật
                                    và hỗ trợ nhanh chóng.
                                </p>
                            </Col>

                            {/* Cột 2 */}
                            <Col xs={12} sm={6} lg={4}>
                                <h5 className='fw-bold mb-3'>
                                    THÔNG TIN CHUNG
                                </h5>
                                <ul className={styles.listWithDot}>
                                    {menuItems.map((item, index) => (
                                        <li key={index} className='mb-2'>
                                            <a
                                                href='#'
                                                className={`text-decoration-none ${styles.footerLink}`}
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </Col>

                            {/* Cột 3 */}
                            <Col xs={12} sm={12} lg={4}>
                                <h5 className='fw-bold mb-3'>
                                    CHÚNG TÔI Ở ĐÂY
                                </h5>
                                <p className={styles.desc}>
                                    Với nhiều năm kinh nghiệm trong lĩnh vực mua
                                    bán nick Ngọc Rồng, chúng tôi luôn đặt uy
                                    tín và quyền lợi khách hàng lên hàng đầu.
                                </p>

                                <ul className={styles.listWithDot}>
                                    <li>Hỗ trợ 24/7</li>
                                    <li>Giao dịch tự động</li>
                                    <li>Bảo mật tuyệt đối</li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
            <div className='bg-white p-4 text-center opacity-75'>
                Shop bán nick chính thức của MT Gaming
            </div>
        </footer>
    );
}

export default Footer;
