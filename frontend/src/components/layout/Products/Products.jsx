import { Col, Row } from 'react-bootstrap';
import styles from './styles.module.scss';
import { FaStar } from 'react-icons/fa';
import Button from '@components/common/Button/Button';
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Đừng quên import CSS của Skeleton

function Products({ data, categoryTitle }) {
  const { containerItem, boxImg, title, boxContent, subContent, boxIcon, boxHeart } = styles;

  if (!data || data.length === 0) {
    return (
      <Row xs={1} md={4} className="g-4">
        {[1, 2, 3, 4].map((i) => (
          <Col key={i}>
            <Skeleton height={300} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row xs={1} md={4} className="g-4">
      {data.map((it) => (
        <Col key={it.name || it._id}>
          <div className={containerItem}>
            <div className={boxImg}>
              {it.bgUrl ? <img src={it.bgUrl} alt={it.name} /> : <Skeleton height={200} />}
              <div className={boxHeart}>
                <CiHeart />
              </div>
            </div>

            <div className={boxContent}>
              <h6 className={title}>
                {it.name ? <Link to={`/${it.slug}`}>{it.name}</Link> : <Skeleton width={100} />}
              </h6>

              <div className={subContent}>
                {categoryTitle === 'BÁN ẠC NGỌC RỒNG' ? (
                  it.quantitySold !== undefined ? (
                    `Số tài khoản: ${it.quantitySold}`
                  ) : (
                    <Skeleton width={80} />
                  )
                ) : (
                  it.desc || <Skeleton count={2} />
                )}
              </div>

              <div className={boxIcon}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} color="#ffc107" />
                ))}
              </div>

              <div className="text-uppercase">
                <Button text={'Mua ngay'} isBg={false} link={it.slug} />
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Products;
