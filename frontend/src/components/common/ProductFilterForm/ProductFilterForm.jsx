import { useContext, useEffect, useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import styles from './styles.module.scss';
import { data, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllProducts } from '@/_config/api/product/product';
import { ProductsContext } from '@contexts/ProductsProvider';

function ProductFilterForm() {
  const { selectBox, inputText } = styles;
  const { setDataPage } = useContext(ProductsContext);
  const [values, setValues] = useState({
    page: 1,
    limit: 8,
    slug: '',
    server: 0,
    planed: '',
    priceRange: '',
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleFilter = (newValues) => {
    const params = new URLSearchParams();
    if (newValues.page) params.append('page', newValues.page);
    if (newValues.server) params.append('server', newValues.server);
    if (newValues.planed) params.append('planed', newValues.planed);
    if (newValues.priceRange) params.append('priceRange', newValues.priceRange);

    navigate(`/pack-nick-ngoc-rong-vip?${params.toString()}`);

    getAllProducts(
      newValues.page,
      newValues.limit,
      newValues.slug,
      newValues.planed,
      newValues.server,
      newValues.priceRange
    )
      .then((res) => {
        setDataPage(res);
      })
      .catch((err) => console.error('Lỗi khi lọc:', err));
  };

  const handleInputChange = (field, value) => {
    const updatedValues = { ...values, [field]: value, page: 1 };
    setValues(updatedValues);
    handleFilter(updatedValues);
  };

  const handleReset = () => {
    const resetValues = { page: 1, limit: 8, slug: '', server: 0, planed: '', priceRange: '' };
    setValues(resetValues);
    navigate('/pack-nick-ngoc-rong-vip');
  };

  useEffect(() => {
    const page = searchParams.get('page') || 1;
    const server = searchParams.get('server') || 0;
    const planed = searchParams.get('planed') || '';
    const priceRange = searchParams.get('priceRange') || '';

    setValues({
      page: parseInt(page, 10),
      server: parseInt(server, 10),
      planed,
      priceRange,
      slug: '', // Reset slug nếu cần
      limit: 8,
    });
  }, [searchParams]);

  const priceFilters = [
    { label: 'Lọc theo giá (Tất cả)', value: '' },
    { label: 'Từ 50k trở xuống', value: '0-50000' },
    { label: 'Từ 50k đến 100k', value: '50000-100000' },
    { label: 'Từ 100k đến 300k', value: '100000-300000' },
    { label: 'Từ 300k đến 500k', value: '300000-500000' },
    { label: 'Từ 500k đến 700k', value: '500000-700000' },
    { label: 'Từ 700k đến 1 Triệu', value: '700000-1000000' },
    { label: 'Từ 1 Triệu đến 2 Triệu', value: '1000000-2000000' },
    { label: 'Từ 2 Triệu đến 5 Triệu', value: '2000000-5000000' },
    { label: 'Từ 5 Triệu đến 10 Triệu', value: '5000000-10000000' },
    { label: 'Từ 10 Triệu trở lên', value: '10000000-100000000' },
  ];

  const serverFilters = Array.from({ length: 12 }, (_, i) => ({
    label: i === 0 ? 'Lọc theo server' : `${i} sao`,
    value: i.toString(),
  }));

  const planetFilters = [
    { label: 'Lọc theo hành tinh', value: '' },
    { label: 'Trái đất', value: 'TraiDat' },
    { label: 'Namec', value: 'Namec' },
    { label: 'Xayda', value: 'Xayda' },
  ];

  return (
    <div className="bg-light mb-4 rounded p-3 shadow-sm">
      <Row className="g-3 align-items-end">
        <Col md={2}>
          <Form.Group>
            <Form.Control type="number" placeholder="Tìm theo mã" className={inputText} />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Select
            className={selectBox}
            value={values.priceRange}
            onChange={(e) => handleInputChange('priceRange', e.target.value)}
          >
            {priceFilters.map((data) => (
              <option value={data.value} key={data.value}>
                {data.label}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={2}>
          <Form.Select
            className={selectBox}
            value={values.server}
            onChange={(e) => handleInputChange('server', parseInt(e.target.value, 10))}
          >
            {serverFilters.map((data) => (
              <option value={data.value} key={data.value}>
                {data.label}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select
            className={selectBox}
            value={values.planed}
            onChange={(e) => handleInputChange('planed', e.target.value)}
          >
            {planetFilters.map((data) => (
              <option value={data.value} key={data.value}>
                {data.label}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col md={2}>
          <Button type="button" className="btn btn-sm bg-warning" onClick={handleReset}>
            Xoá lọc
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ProductFilterForm;
