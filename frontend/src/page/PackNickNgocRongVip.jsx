import { Col, Container, Row } from "react-bootstrap";
import TextInfoNickGame from "@components/layout/TextInfoNickGame/TextInfoNickGame";
import Breadcrumbs from "@components/common/Breadcrumbs/Breadcrumbs";
import ProductFilterForm from "@components/common/ProductFilterForm/ProductFilterForm";
import ItemsGame from "@components/layout/ItemsGame/ItemsGame";
import { useContext, useMemo } from "react";
import { ProductsContext } from "@contexts/ProductsProvider";
import formatMoney from "@/util/formatMoney";
import ReactPaginateCommon from "@components/common/ReactPaginateCommon/ReactPaginateCommon";
import LoadingCommon from "@components/common/LoadingCommon/LoadingCommon";
function PackNickNgocRongVip() {
  const { getProduct, query, setQuery, isLoading } =
    useContext(ProductsContext);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    if (selectedPage !== query.page) {
      setQuery((prev) => ({
        ...prev,
        page: selectedPage,
      }));
    }
  };

  const pageCount = useMemo(() => {
    return getProduct?.pagination?.totalPages || 0;
  }, [getProduct]);

  const currentPage = useMemo(() => {
    return (query.page || 1) - 1;
  }, [query.page]);
  return (
    <Container className="py-4">
      <Breadcrumbs title={"NICK NGỌC RỒNG VIP"} desc={"NICK NGỌC RỒNG VIP"} />
      <TextInfoNickGame />

      <ProductFilterForm />

      <Row className="mt-3 mb-3">
        {getProduct?.data && getProduct.data.length > 0 ? (
          getProduct.data.map((it) => (
            <Col xs={12} md={6} lg={3} className="mb-3" key={it._id}>
              <ItemsGame
                id={it._id}
                src={it?.img || ""}
                title="Nick Ngọc Rồng VIP 1"
                card={formatMoney(it.card?.$numberDecimal) || 0}
                atm={formatMoney(it.atm?.$numberDecimal) || 0}
                planed={it.planed}
                server={it.server}
                category={it.accountType}
              />
            </Col>
          ))
        ) : (
          <Col className="text-center py-5">
            <LoadingCommon loading={isLoading} />
          </Col>
        )}
      </Row>

      {pageCount > 1 && (
        <ReactPaginateCommon
          pageCount={pageCount}
          currentPage={currentPage}
          handlePageClick={handlePageClick}
        />
      )}
    </Container>
  );
}

export default PackNickNgocRongVip;
