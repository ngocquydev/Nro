import { Container } from 'react-bootstrap';
import styles from './styles.module.css';
import Products from '../Products/Products';
import { useContext } from 'react';
import { ProductsContext } from '@contexts/ProductsProvider';
function Content() {
  const { textTitle, containerContent } = styles;
  const { data } = useContext(ProductsContext);
  const products = data?.data || [];
  const listTitle = data?.listTitle || [];

  return (
    <Container className={containerContent} style={{ marginTop: '100px', marginBottom: '100px' }}>
      <div className="content">
        <div className="mb-3">
          {listTitle.map((title) => {
            const categoryItem = products.find((item) => item.title === title);
            if (!categoryItem) return null;

            return (
              <div key={categoryItem._id} className="mb-5">
                <div>
                  <h2 className={textTitle}>{categoryItem.title}</h2>
                </div>
                <div>
                  <Products titleCategory={categoryItem.title} data={categoryItem} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
export default Content;
