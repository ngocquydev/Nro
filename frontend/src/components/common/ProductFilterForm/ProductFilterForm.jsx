import { ProductsContext } from "@contexts/ProductsProvider";
import { useCallback, useContext, useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import styles from "./styles.module.scss";
import debounce from "lodash/debounce";
function ProductFilterForm() {
  const { selectBox, inputText } = styles;
  const [type, setType] = useState("");
  const { setQuery, dataByPrice, dataByServer, dataByPlaned } =
    useContext(ProductsContext);
  const handleSearch = useCallback(
    debounce((value, type) => {
      handleChangle(value, type);
    }, 300),
    [],
  );
  const handleChangle = (value, type) => {
    const finalValue = value === "all" ? "" : value;

    setQuery((prev) => {
      switch (type) {
        case "id":
          return { ...prev, searchById: finalValue, page: 1 };
        case "price":
          return { ...prev, sortByPrice: finalValue, page: 1 };
        case "server":
          return { ...prev, sortByServer: finalValue, page: 1 };
        case "planed":
          return { ...prev, sortByPlaned: finalValue, page: 1 };
        default:
          return prev;
      }
    });
  };

  return (
    <div className="p-3 bg-light rounded shadow-sm mb-4">
      <Row className="g-3 align-items-end">
        <Col md={2}>
          <Form.Group controlId="formBasicInput">
            <Form.Control
              type="number"
              placeholder="Tìm theo mã"
              min={1}
              className={inputText}
              onChange={(e) => {
                const newType = "id";
                handleSearch(e.target.value, newType);
                setType(newType);
              }}
            />
          </Form.Group>
        </Col>
        {/* Lọc theo giá */}
        <Col md={3}>
          <Form.Group>
            <Form.Select
              className={selectBox}
              onChange={(e) => {
                const newType = "price";
                handleChangle(e.target.value, newType);
                setType(newType);
              }}
            >
              {dataByPrice.map((data) => {
                return (
                  <option value={data.value} key={data.id}>
                    {data.content}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Hành tinh */}
        <Col md={2}>
          <Form.Group>
            <Form.Group>
              <Form.Select
                className={selectBox}
                onChange={(e) => {
                  const newType = "server";
                  handleSearch(e.target.value, newType);
                  setType(newType);
                }}
              >
                {dataByServer.map((data) => {
                  return (
                    <option value={data.value} key={data.value}>
                      {data.content}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Form.Group>
        </Col>

        {/* Server */}
        <Col md={3}>
          <Form.Group>
            <Form.Select
              className={selectBox}
              onChange={(e) => {
                const newType = "planed";
                handleSearch(e.target.value, newType);
                setType(newType);
              }}
            >
              {dataByPlaned.map((data) => {
                return (
                  <option value={data.value} key={data.value}>
                    {data.content}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Button
            type="button"
            className="btn btn-sm bg-warning btn-custom-filter"
          >
            Xoá lọc
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default ProductFilterForm;
