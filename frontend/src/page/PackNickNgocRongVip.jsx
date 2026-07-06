import { Col, Container, Row } from 'react-bootstrap';
import TextInfoNickGame from '@components/layout/TextInfoNickGame/TextInfoNickGame';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import ProductFilterForm from '@components/common/ProductFilterForm/ProductFilterForm';
import ItemsGame from '@components/layout/ItemsGame/ItemsGame';
import { useContext } from 'react';
import { ProductsContext } from '@contexts/ProductsProvider';
import formatMoney from '@/util/formatMoney';
import ReactPaginateCommon from '@components/common/ReactPaginateCommon/ReactPaginateCommon';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import { Link, useNavigate } from 'react-router-dom';
function PackNickNgocRongVip() {
  const { dataPage, loading } = useContext(ProductsContext);
  console.log('dataPage', dataPage);
  const navigate = useNavigate();
  const handlePageClick = async (values) => {
    // 1. Kiểm tra: nếu giá trị chọn không hợp lệ, thoát ngay (chặn dấu ...)
    if (values.selected === undefined || values.selected === null || isNaN(values.selected)) {
      return;
    }

    const newPage = values.selected + 1;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('page', newPage);
    navigate(`/pack-nick-ngoc-rong-vip?${currentParams.toString()}`);
  };
  return (
    <Container className="py-4">
      <Breadcrumbs title={'NICK NGỌC RỒNG VIP'} desc={'NICK NGỌC RỒNG VIP'} />
      <TextInfoNickGame />

      <ProductFilterForm />

      <Row className="mt-3 mb-3">
        {dataPage.success === false && !loading && (
          <Col className="py-5 text-center">
            <h4 className="text-danger text-uppercase fw-bold">Không có sản phẩm nào</h4>
            <div>
              <Link to="/" className="btn btn-primary mt-3">
                Quay lại trang chủ
              </Link>
            </div>
          </Col>
        )}
        {loading ? (
          <Col className="py-5 text-center">
            <LoadingCommon loading={loading} />
          </Col>
        ) : dataPage.data?.length === 0 ? (
          <Col className="py-5 text-center">
            <h4 className="text-danger text-uppercase fw-bold">Không có sản phẩm nào</h4>
            <div>
              <Link to="/" className="btn btn-primary mt-3">
                Quay lại trang chủ
              </Link>
            </div>
          </Col>
        ) : (
          dataPage.data?.map((it) => (
            <Col xs={12} md={6} lg={3} className="mb-3" key={it._id}>
              <ItemsGame
                id={it._id}
                src={it?.img?.[0] || ''}
                card={formatMoney(it.Card?.$numberDecimal) || 0}
                atm={formatMoney(it.ATM?.$numberDecimal) || 0}
                planed={
                  it.planed === 'TraiDat'
                    ? 'Trái Đất'
                    : it.planed === 'Xayda'
                      ? 'Xayda'
                      : it.planed === 'Namec'
                        ? 'Namec'
                        : ''
                }
                server={it.server}
                category={it.register}
              />
            </Col>
          ))
        )}
      </Row>

      {dataPage.pagination?.totalPage > 1 && (
        <ReactPaginateCommon
          pageCount={dataPage.pagination?.totalPage}
          currentPage={dataPage.pagination?.currentPage - 1}
          handlePageClick={handlePageClick}
          href="pack-nick-ngoc-rong-vip"
        />
      )}
    </Container>
  );
}

export default PackNickNgocRongVip;
