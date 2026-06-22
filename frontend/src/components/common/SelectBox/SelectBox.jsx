import React from 'react';
import { Form } from 'react-bootstrap';
function SelectBox({ formik, data, isMoney = false, name }) {
  return (
    <>
      <Form.Select
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        {data?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Form.Select>
      {isMoney === true ? (
        <>
          {formik.touched[name] && formik.errors[name] && (
            <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>
              {formik.errors[name]}
            </div>
          )}
        </>
      ) : (
        <>
          {formik.touched[name] && formik.errors[name] && (
            <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>
              {formik.errors[name]}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SelectBox;
