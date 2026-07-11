import { Col, Container, Row } from 'react-bootstrap';
import TextInfoNickGame from '@components/layout/TextInfoNickGame/TextInfoNickGame';
import Breadcrumbs from '@components/common/Breadcrumbs/Breadcrumbs';
import ProductFilterForm from '@components/common/ProductFilterForm/ProductFilterForm';
import ItemsGame from '@components/layout/ItemsGame/ItemsGame';
import { useContext, useEffect, useState } from 'react';
import { ProductsContext } from '@contexts/ProductsProvider';
import formatMoney from '@/util/formatMoney';
import ReactPaginateCommon from '@components/common/ReactPaginateCommon/ReactPaginateCommon';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import ModalBuy from '@components/layout/Modal/ModalBuy';
import { BuyAccountContext } from '@contexts/BuyAccountProvider';
function PackNickNgocRongVip() {
  const { dataPage, loading, setDataPage } = useContext(ProductsContext);
  const { idBuy } = useContext(BuyAccountContext);
  const [DT, setDT] = useState([]);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const handlePageClick = async (values) => {
    if (values.selected === undefined || values.selected === null || isNaN(values.selected)) {
      return;
    }

    const newPage = values.selected + 1;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('page', newPage);
    navigate(`/pack-nick-ngoc-rong-vip?${currentParams.toString()}`);
  };
  const handleClose = () => setShow(false);
  const handleOpenModal = (id) => {
    if (!id) return;
    const detail = dataPage.data.find((item) => item._id === id);
    setDT(detail);
    setShow(true);
  };
  useEffect(() => {
    if (loading) return;

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const dataPageCurrent = dataPage.pagination?.currentPage || 1;
    if (dataPage?.data && dataPage.data.length === 0 && currentPage > 1) {
      if (currentPage === dataPageCurrent) {
        const newPage = currentPage - 1;
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', newPage.toString());

        navigate({ search: `?${newParams.toString()}` }, { replace: true });
      }
    }
  }, [dataPage, loading, navigate, searchParams]);
  useEffect(() => {
    if (dataPage?.data && idBuy) {
      const updatedDataPage = {
        ...dataPage,
        data: dataPage.data.filter((item) => item._id !== idBuy),
      };
      setDataPage(updatedDataPage);
    }
  }, [idBuy]);
  return (
    <>
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
                  handleOpenModal={(e) => {
                    e.preventDefault();
                    handleOpenModal(it._id);
                  }}
                  show={show}
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
      <ModalBuy show={show} handleClose={handleClose} DT={DT} />
    </>
  );
}

export default PackNickNgocRongVip;
