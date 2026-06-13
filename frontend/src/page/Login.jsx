import { Breadcrumb, Container } from 'react-bootstrap';
import FormLogin from '@components/layout/FormAuth/FormLogin';
function Login() {
    return (
        <>
            <Container>
                <div className='d-flex justify-content-between align-items-center py-3'>
                    {/* Bên trái */}
                    <h2 className='mb-0'>Đăng Nhập</h2>

                    {/* Bên phải */}
                    <Breadcrumb className='mb-0'>
                        <Breadcrumb.Item href='/'>Trang Chủ</Breadcrumb.Item>
                        <Breadcrumb.Item active>Đăng Nhập</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <FormLogin />
            </Container>
        </>
    );
}
export default Login;
