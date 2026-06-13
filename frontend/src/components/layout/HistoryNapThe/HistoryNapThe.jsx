import { useContext } from 'react';
import { Table, Badge, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

// dayjs.extend(relativeTime);
// dayjs.locale('vi');

function HistoryNapThe() {
    return (
        <></>
        // <Card className='shadow'>
        //     <Card.Body>
        //         <h4 className='mb-4'>Lịch Sử Nạp Tiền</h4>

        //         <Table striped bordered hover responsive>
        //             <thead>
        //                 <tr>
        //                     <th>#</th>
        //                     <th>Nhà mạng</th>
        //                     <th>Mệnh giá</th>
        //                     <th>Serial</th>
        //                     <th>Mã thẻ</th>
        //                     <th>Trạng thái</th>
        //                     <th>Thời gian</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {dataNap?.length > 0 ? (
        //                     dataNap.map((item, index) => (
        //                         <tr key={item.id}>
        //                             <td>{index + 1}</td>
        //                             <td>{item.telco}</td>
        //                             <td>
        //                                 {Number(item.amount).toLocaleString()}{' '}
        //                                 VNĐ
        //                             </td>
        //                             <td>{item.serial}</td>
        //                             <td>{item.code}</td>
        //                             <td>{renderStatus(item.trangThai)}</td>
        //                             <td>{formatTime(item.createdAt)}</td>
        //                         </tr>
        //                     ))
        //                 ) : (
        //                     <tr>
        //                         <td colSpan='7' className='text-center'>
        //                             Chưa có dữ liệu
        //                         </td>
        //                     </tr>
        //                 )}
        //             </tbody>
        //         </Table>
        //     </Card.Body>
        // </Card>
    );
}

export default HistoryNapThe;
