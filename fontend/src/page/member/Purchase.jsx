import { Card, Table, Badge } from 'react-bootstrap';

function Purchase() {
    const data = [
        {
            id: 1,
            nick: 'Nick Ngọc Rồng VIP',
            price: 500000,
            date: '16/02/2026',
            status: 'success',
        },
        {
            id: 2,
            nick: 'Nick Đệ Tử Siêu Cấp',
            price: 350000,
            date: '14/02/2026',
            status: 'pending',
        },
        {
            id: 3,
            nick: 'Nick Full Set Thần',
            price: 800000,
            date: '10/02/2026',
            status: 'cancel',
        },
    ];

    const renderStatus = status => {
        switch (status) {
            case 'success':
                return <Badge bg='success'>Thành công</Badge>;
            case 'pending':
                return <Badge bg='warning'>Đang xử lý</Badge>;
            case 'cancel':
                return <Badge bg='danger'>Đã hủy</Badge>;
            default:
                return null;
        }
    };

    return (
        <Card className='shadow-sm'>
            <Card.Body>
                <h4 className='mb-4'>Lịch sử mua nick</h4>
                <strong className='text-danger d-block mb-2'>
                    Vui lòng đổi mật khẩu và lưu lại lịch sử ngay sau khi mua.
                </strong>
                <div className='table-responsive'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên nick</th>
                                <th>Giá</th>
                                <th>Ngày mua</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.nick}</td>
                                    <td className='text-danger fw-bold'>
                                        {item.price.toLocaleString()}đ
                                    </td>
                                    <td>{item.date}</td>
                                    <td>{renderStatus(item.status)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Card.Body>
        </Card>
    );
}

export default Purchase;
