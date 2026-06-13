import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import styles from './styles.module.css';
import HistoryNapThe from '../HistoryNapThe/HistoryNapThe';
import BreadCrumb from '@common/BreadCum/BreadCum';
import Table from 'react-bootstrap/Table';
import CopyButton from '@common/CopyButton/CopyButton';
function NapTheATM() {
    const { containerForm, wrapPer } = styles;

    return (
        <div className={containerForm}>
            <Container className='py-5'>
                <BreadCrumb title={'Nạp ATM'} desc={'Nạp ATM'} />
                <div
                    className={`${wrapPer}`}
                    style={{
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        padding: '18px 18px 48px',
                    }}
                >
                    <h1>NẠP QUA ATM TẶNG 15%</h1>
                    <p className='text-center text-danger fw-bold fs-5'>
                        Vui lòng nhập số tiền muốn nạp
                    </p>
                    <Form>
                        <InputGroup className='mb-3'>
                            <InputGroup.Text>Số tiền</InputGroup.Text>
                            <Form.Control
                                type='number'
                                placeholder='Nhập số tiền...'
                            />
                            <InputGroup.Text>VNĐ</InputGroup.Text>
                        </InputGroup>

                        <Button variant='primary'>Tạo lệnh nạp</Button>
                    </Form>
                    <Table striped bordered hover responsive className='mt-3'>
                        <thead>
                            <tr>
                                <th>
                                    <CopyButton text={'ACB'} />
                                </th>
                                <th>
                                    <CopyButton text={'Trần Văn Liêm'} />
                                </th>
                                <th>
                                    <CopyButton text={'22153581'} />
                                </th>
                            </tr>
                        </thead>
                    </Table>
                    <div style={{ lineHeight: '1.6' }}>
                        <strong>
                            Hệ thống nạp tự động, vui lòng điền đúng nội dung ck
                            :
                        </strong>
                        <br />
                        <span>
                            Bước 1: Điền số tiền cần nạp sau đó
                            <span className='text-danger'>
                                bấm tạo lệnh nạp
                            </span>
                            để hiện mã QR
                        </span>
                        <br />
                        <span>
                            Bước 2 :{' '}
                            <span className='text-danger'>
                                QUÉT mã QR hoặc Copy chính xác
                            </span>{' '}
                            nội dung chuyển tiền và stk( SAI ND KO CỘNG TIỀN)
                        </span>
                        <br />
                        <span>
                            Bước 3: Chuyển tiền và đợi Chờ khoảng 10 giây reload
                            lại trang số dư sẽ được cập nhật.
                        </span>
                        <br />
                        <span>
                            Mỗi lần nạp khách hàng vui lòng
                            <span className='text-danger'>tạo đơn nạp mới</span>
                            để lấy STK và nội dung mới Lưu ý :
                            <strong className='text-danger'>
                                Hệ thống sẽ hủy giao dịch nếu không nhận được
                                thanh toán trong vòng 15 phut
                            </strong>
                        </span>
                    </div>
                </div>
                <HistoryNapThe />
            </Container>
        </div>
    );
}
export default NapTheATM;
