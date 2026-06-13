import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import ItemsBlog from '@components/layout/ItemsBlog/ItemsBlog';
import { Col, Container, Row } from 'react-bootstrap';
function TinTucGameNro() {
    return (
        <Container>
            <Breadcrumbs
                title={'Blog - TIN TỨC GAME NGỌC RỒNG'}
                desc={'Blog - TIN TỨC GAME NGỌC RỒNG'}
            />
            <Row>
                <Col xs={12} md={6} lg={4}>
                    <ItemsBlog />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <ItemsBlog />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <ItemsBlog />
                </Col>
                <Col xs={12} md={6} lg={4}>
                    <ItemsBlog />
                </Col>
            </Row>
        </Container>
    );
}
export default TinTucGameNro;
