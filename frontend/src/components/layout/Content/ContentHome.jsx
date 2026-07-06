import { Container } from 'react-bootstrap';
import styles from './styles.module.css';
import Products from '../Products/Products';
import { useContext } from 'react';
import { ProductsContext } from '@contexts/ProductsProvider';
import LoadingCommon from '@components/common/LoadingCommon/LoadingCommon';
function Content() {
  const { textTitle, containerContent } = styles;
  const { data, loadingHome } = useContext(ProductsContext);
  return (
    <Container className={containerContent} style={{ marginTop: '100px', marginBottom: '100px' }}>
      <div className="content">
        <div className="mb-3">
          {loadingHome ? (
            <LoadingCommon loading={loadingHome} />
          ) : data.length === 0 ? (
            <div className="text-muted fw-bold text-uppercase fs-4 text-center">
              Không có sản phẩm nào để hiển thị.
            </div>
          ) : (
            data.map((it) => {
              return (
                <div key={it.title} className="mb-5">
                  <div>
                    <h2 className={textTitle}>{it.title}</h2>
                  </div>
                  <div>
                    <Products data={it.Category} categoryTitle={it.title} />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Container>
  );
}
export default Content;
