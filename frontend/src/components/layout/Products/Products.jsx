import { Col, Row } from 'react-bootstrap';
import styles from './styles.module.scss';
import { FaStar } from 'react-icons/fa';
import Button from '@components/common/Button/Button';
import { CiHeart } from 'react-icons/ci';
import { useContext } from 'react';
import { ProductsContext } from '@contexts/ProductsProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
import { Link } from 'react-router-dom';

function Products({ titleCategory, data }) {
  const { containerItem, boxImg, title, boxContent, subContent, boxIcon, boxHeart } = styles;

  // Kiểm tra dữ liệu: Nếu data không có thì không render gì cả
  if (!data) return null;

  return (
    <Row xs={1} md={4} className="g-4">
      <Col key={data._id}>
        <div className={containerItem}>
          <div className={boxImg}>
            <img src={data.bgUrl} alt={data.title} />
            <div className={boxHeart}>
              <CiHeart />
            </div>
          </div>
          <div className={boxContent}>
            <h6 className={title}>
              <Link to={data.slug}>{data.title}</Link>
            </h6>
            <div className={subContent}>{data.desc}</div>
            <div className={boxIcon}>
              {[1, 2, 3, 4, 5].map((it) => (
                <FaStar key={it} color="#ffc107" />
              ))}
            </div>
            <div className="text-uppercase">
              <Button text={'Mua ngay'} isBg={false} link={data.slug} />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
export default Products;
