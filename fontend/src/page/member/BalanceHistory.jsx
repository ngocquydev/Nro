import { Card, CardBody, CardFooter, CardTitle } from 'react-bootstrap';

function BalanceHistory() {
    return (
        <div>
            <Card>
                <CardBody className='p-0'>
                    <CardTitle className='p-3'>
                        Lịch sử biến động số dư
                    </CardTitle>
                    <CardFooter className='p-3'>
                        Người dùng chưa có lịch sử giao dịch mới
                    </CardFooter>
                </CardBody>
            </Card>
        </div>
    );
}
export default BalanceHistory;
