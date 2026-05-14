import { Container, Button, Form, Tabs, Tab } from 'react-bootstrap';
import styles from './styles.module.css';
import HistoryNapThe from '../HistoryNapThe/HistoryNapThe';
import BreadCrumb from '@common/BreadCum/BreadCum';

function NapThe() {
    const { containerTop, containerForm, wrapPer, formNapCard } = styles;

    return (
        <div className={containerForm}>
            <Container className='py-5'>
                <BreadCrumb title={'Nạp Card'} desc={'Nạp card'} />
                <div className={wrapPer}>
                    {/* Thông báo */}
                    <div className={containerTop}>
                        <strong className='text-danger'>
                            Hệ thống nạp tự động, 100k nhận 100k không chiết
                            khấu
                            <br />
                            Cam kết không nuốt thẻ, vui lòng kiểm tra kỹ mệnh
                            giá thẻ cào trước khi nạp
                        </strong>
                    </div>

                    <Form className='mt-4' id={formNapCard}>
                        {/* Loại thẻ */}
                        <Form.Group className='mb-4'>
                            <Form.Select defaultValue=''>
                                <option value='' disabled>
                                    Chọn loại thẻ
                                </option>
                                <option value='VIETTEL'>Viettel</option>
                                <option value='MOBIFONE'>Mobifone</option>
                                <option value='VINAPHONE'>Vinaphone</option>
                                <option value='VTC'>VTC</option>
                                <option value='GATE'>Gate</option>
                                <option value='ZING'>Zing</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Mệnh giá */}
                        <Form.Group className='mb-4'>
                            <Form.Select defaultValue=''>
                                <option value='' disabled>
                                    Chọn mệnh giá
                                </option>
                                <option value='10000'>10.000 VNĐ</option>
                                <option value='20000'>20.000 VNĐ</option>
                                <option value='50000'>50.000 VNĐ</option>
                                <option value='100000'>100.000 VNĐ</option>
                                <option value='200000'>200.000 VNĐ</option>
                                <option value='500000'>500.000 VNĐ</option>
                                <option value='1000000'>1.000.000 VNĐ</option>
                            </Form.Select>
                        </Form.Group>

                        {/* Serial */}
                        <Form.Group className='mb-4'>
                            <Form.Control
                                type='text'
                                placeholder='Nhập số serial'
                            />
                        </Form.Group>

                        {/* Mã thẻ */}
                        <Form.Group className='mb-4'>
                            <Form.Control
                                type='text'
                                placeholder='Nhập mã thẻ'
                            />
                        </Form.Group>

                        <Button variant='primary' className='w-100 py-2'>
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
