import { Button, Card, Spinner } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import { ToastMessgeContext } from '@contexts/ToastMessgeProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getAuth } from 'firebase/auth';

function TableCard() {
    const { toast } = useContext(ToastMessgeContext);
    const auth = getAuth();
    const validationSchema = Yup.object({
        telco: Yup.string().required('Vui lòng chọn nhà mạng'),
        monney: Yup.string().required('Vui lòng chọn mệnh giá'),
        serial: Yup.string()
            .matches(/^[0-9]+$/, 'Số serial chỉ được bao gồm các chữ số')
            .required('Vui lòng nhập serial'),
        code: Yup.string()
            .matches(/^[0-9]+$/, 'Số serial chỉ được bao gồm các chữ số')
            .required('Vui lòng nhập mã thẻ'),
    });
    const handleSubmit = values => {
        console.log('Dữ liệu nạp thẻ:', values);
        toast.success('Thành công');
    };
    const formik = useFormik({
        initialValues: {
            telco: '',
            monney: '',
            serial: '',
            code: '',
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <Card className='shadow-sm'>
                <Card.Body>
                    <Tabs defaultActiveKey='napThe' className='mb-3' fill>
                        <Tab eventKey='napThe' title='Nạp thẻ'>
                            {auth.currentUser ? (
                                <Form
                                    noValidate
                                    onSubmit={formik.handleSubmit}
                                    method='post'
                                >
                                    {/* TELCO */}
                                    <Form.Group className='mb-3 mt-3'>
                                        <Form.Select
                                            name='telco'
                                            value={formik.values.telco}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.telco &&
                                                !!formik.errors.telco
                                            }
                                        >
                                            <option value=''>
                                                Chọn loại thẻ
                                            </option>
                                            <option value='VIETTEL'>
                                                Viettel
                                            </option>
                                            <option value='MOBIFONE'>
                                                Mobifone
                                            </option>
                                            <option value='VINAPHONE'>
                                                Vinaphone
                                            </option>
                                            <option value='VTC'>VTC</option>
                                            <option value='GATE'>Gate</option>
                                            <option value='ZING'>Zing</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type='invalid'>
                                            {formik.errors.telco}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* AMOUNT */}
                                    <Form.Group className='mb-3'>
                                        <Form.Select
                                            name='monney'
                                            value={formik.values.monney}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.monney &&
                                                !!formik.errors.monney
                                            }
                                        >
                                            <option value=''>
                                                Chọn mệnh giá
                                            </option>
                                            <option value='10000'>
                                                10.000
                                            </option>
                                            <option value='20000'>
                                                20.000
                                            </option>
                                            <option value='50000'>
                                                50.000
                                            </option>
                                            <option value='100000'>
                                                100.000
                                            </option>
                                            <option value='200000'>
                                                200.000
                                            </option>
                                            <option value='500000'>
                                                500.000
                                            </option>
                                            <option value='1000000'>
                                                1.000.000
                                            </option>
                                        </Form.Select>
                                        <Form.Control.Feedback type='invalid'>
                                            {formik.errors.monney}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* SERIAL */}
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            name='serial'
                                            placeholder='Nhập số serial'
                                            value={formik.values.serial}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.serial &&
                                                !!formik.errors.serial
                                            }
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {formik.errors.serial}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* CODE */}
                                    <Form.Group className='mb-3'>
                                        <Form.Control
                                            type='text'
                                            name='code'
                                            placeholder='Nhập mã thẻ'
                                            value={formik.values.code}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            isInvalid={
                                                formik.touched.code &&
                                                !!formik.errors.code
                                            }
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {formik.errors.code}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Button
                                        type='submit'
                                        className='w-100 py-2'
                                    >
                                        Nạp thẻ
                                    </Button>
                                </Form>
                            ) : (
                                <div className='text-center mt-5'>
                                    <h4 className='text-uppercase'>
                                        Vui lòng <a href='/login'>Đăng nhập</a>{' '}
                                        để sử dụng tính năng này
                                    </h4>
                                </div>
                            )}
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </>
    );
}

export default TableCard;
