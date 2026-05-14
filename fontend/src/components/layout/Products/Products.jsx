import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import { FaStar } from "react-icons/fa";
import Button from "@components/common/Button/Button";
import { CiHeart } from "react-icons/ci";
import { useContext } from "react";
import { ProductsContext } from "@contexts/ProductsProvider";
import LoadingCommon from "@components/common/LoadingCommon/LoadingCommon";

function Products({ titleCategory }) {
  const {
    containerItem,
    boxImg,
    title,
    boxContent,
    subContent,
    boxIcon,
    boxHeart,
  } = styles;
  const { products, isLoading } = useContext(ProductsContext);
  const filteredProducts = products.filter((product) => {
    return product.titleCategory === titleCategory;
  });
  return (
    <>
      {isLoading ? (
        <LoadingCommon loading={isLoading} />
      ) : (
        <Row xs={1} md={4} className="g-4">
          {filteredProducts.map((it) => {
            return (
              <Col key={it._id}>
                <div className={containerItem}>
                  <div className={boxImg}>
                    <img src={it.img} alt={it.name} />
                    <div className={boxHeart}>
                      <CiHeart />
                    </div>
                  </div>
                  <div className={boxContent}>
                    <h6 className={title}>
                      <a href={it.slug}>{it.name}</a>
                    </h6>
                    <div className={subContent}>{it.desc}</div>
                    <div className={boxIcon}>
                      {[1, 2, 3, 4, 5].map((it) => {
                        return <FaStar key={it} />;
                      })}
                    </div>
                    <div className="text-uppercase">
                      <Button text={"Mua ngay"} isBg={false} link={it.slug} />
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
}
export default Products;
