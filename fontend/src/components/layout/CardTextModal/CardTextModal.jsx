import { Card, CardFooter, Container } from 'react-bootstrap';
import styles from './styles.module.css';
function CardTextModal() {
    const { desc } = styles;
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title className='text-uppercase text-center text-primary fs-3 fw-bold mb-2'>
                        GIỚI THIỆU VỀ NICKMT.COM
                    </Card.Title>
                    <Card.Text className={desc}>
                        Chào mừng các bạn đã đến với nickmt.com. Shop bán tài
                        khoản game chính thức của MT Gaming. Xuyên suốt 6 năm
                        hoạt động, nickmt luôn là địa điểm mua bán trao đổi acc
                        game ngọc rồng uy tín, chất lượng được nhiều game thủ
                        NRO tin tưởng, ủng hộ. Ngọc rồng online là game nhập vai
                        trực tuyến với cốt truyện được xây dựng dựa trên bộ
                        truyện tranh nổi tiếng “Bảy viên ngọc rồng” từng gắn
                        liền với bao thế hệ độc giả Việt Nam. Tham gia chú bé
                        rồng người chơi sẽ được trải nghiệm nhân vật ở 3 tộc
                        hành tinh như : Trái đất, namếk, xayda. Game có rất
                        nhiều bản đồ và nhiệm vụ từ dễ đến khó và để chinh phục
                        được các bạn cần có sự hướng dẫn của các sư phụ cùng sự
                        nỗ lực hết mình của bản thân. Game hoạt động đa nền tảng
                        các bạn có thể tải NRO trên máy tính, iphone và cả
                        android, java. Có thể nói NRO là tựa game có lượng người
                        chơi “khủng” nhất teamobi với lợi thế thích hợp với mọi
                        lứa tuổi. Các bạn hoàn toàn có thể điều khiển trực tiếp
                        nhân vật rất dễ dàng trên màn hình cảm ứng.
                    </Card.Text>
                    <strong className='text-primary'>
                        Chi tiết về game nhập vai Ngọc Rồng Online
                    </strong>
                </Card.Body>
                <CardFooter className='text-center'>
                    Xem Thêm Nội Dung
                </CardFooter>
            </Card>
        </Container>
    );
}
export default CardTextModal;
