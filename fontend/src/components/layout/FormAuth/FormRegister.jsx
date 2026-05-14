import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styles from "./styles.module.css";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "@contexts/AuthProvider";
import { ToastMessgeContext } from "@contexts/ToastMessgeProvider";
function FormRegister() {
  const { textNoAccount, btnDangNhap, passwordForm, iconEye } = styles;
  const { toast } = useContext(ToastMessgeContext);
  const { authRegisterUser, error, loading } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^[a-zA-Z0-9]+$/, "Tên đăng nhập có định dạng không hợp lệ.")
      .min(3, "Tên đăng nhập phải 3 kí tự trở lên")
      .required("Tên đăng nhập không được để trống"),
    phone: Yup.string()
      .required("Số điện thoại không được để trống")
      .matches(/^[0-9]+$/, "Số điện thoại phải là số")
      .length(10, "Số điện thoại phải có đúng 10 chữ số"),
    password: Yup.string()
      .required("Mật khẩu không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(
        passwordRules,
        "Mật khẩu phải bao gồm: 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
      ),
  });
  const handleRegister = async (values) => {
    const result = await authRegisterUser(values);
    console.log(result);
    if (result.success) {
      toast.success("Đăng ký thành công");
      navigate("/");
    } else {
      toast.error(result.error.message);
    }
  };
  const formik = useFormik({
    initialValues: { username: "", password: "", phone: "" },
    validationSchema: validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Body className="p-4">
              <h3 className="mb-4">Đăng Ký</h3>

              <Form noValidate onSubmit={formik.handleSubmit} method="post">
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Tên đăng nhập"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {formik.errors.username}
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="phone"
                    placeholder="Số điện thoại"
                    className="form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {formik.errors.phone}
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <div id={passwordForm}>
                    <Form.Control
                      type={show ? "text" : "password"}
                      name="password"
                      placeholder="Mật khẩu"
                      className="form-control"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <span
                      onClick={() => setShow(!show)}
                      style={{ cursor: "pointer" }}
                    >
                      {show ? (
                        <FaEye id={iconEye} />
                      ) : (
                        <FaEyeSlash id={iconEye} />
                      )}
                    </span>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "0.875rem",
                        marginTop: "0.25rem",
                      }}
                    >
                      {formik.errors.password}
                    </div>
                  )}
                </Form.Group>

                <button
                  type="submit"
                  className={`${btnDangNhap} w-100 p-2`}
                  disabled={loading}
                  style={{
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  <span>{loading ? "Đang đăng ký..." : "Đăng ký"}</span>
                </button>
              </Form>

              <div className="text-center my-3">
                <div className={textNoAccount}>
                  <span>Đã có tài khoản?</span>
                </div>
              </div>

              <Button className="w-100">Đăng Nhập Ngay</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FormRegister;
