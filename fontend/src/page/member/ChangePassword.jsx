import { useFormik } from "formik";
import { Card, Form, Button } from "react-bootstrap";
import * as Yup from "yup";
import styles from "./styles.module.css";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastMessgeContext } from "@contexts/ToastMessgeProvider";
import { AuthContext } from "@contexts/AuthProvider";

function ChangePassword() {
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    newPassword2: false,
  });
  const { passwordForm, iconEye } = styles;
  const { toast } = useContext(ToastMessgeContext);
  const { onChangePassword, loading } = useContext(AuthContext);
  const toggleVisibility = (field) => {
    setShow((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const passwordRules =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Mật khẩu không được để trống"),
    newPassword: Yup.string()
      .required("Mật khẩu mới không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .matches(
        passwordRules,
        "Mật khẩu phải bao gồm: 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
      )
      .notOneOf(
        [Yup.ref("oldPassword")],
        "Mật khẩu mới không được trùng mật khẩu cũ",
      ),
    newPassword2: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Mật khẩu xác nhận không trùng khớp",
      )
      .required("Nhập lại mật khẩu không được để trống"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const resuilt = await onChangePassword(
        values.oldPassword,
        values.newPassword,
      );
      if (resuilt.success) {
        toast.success("Đổi mật khẩu thành công");
      } else {
        toast.error("Sai mật khẩu");
      }
    },
  });

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-5">
        <h4 className="mb-4 fw-bold">Đổi mật khẩu</h4>

        <Form onSubmit={formik.handleSubmit}>
          {/* Mật khẩu cũ */}
          <Form.Group className="mb-4">
            <Form.Label>Mật khẩu hiện tại</Form.Label>
            <div id={passwordForm} style={{ position: "relative" }}>
              <Form.Control
                type={show.oldPassword ? "text" : "password"}
                name="oldPassword"
                placeholder="Nhập mật khẩu cũ"
                {...formik.getFieldProps("oldPassword")}
                isInvalid={
                  formik.touched.oldPassword && !!formik.errors.oldPassword
                }
              />
              <span
                onClick={() => toggleVisibility("oldPassword")}
                className={iconEye}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }}
              >
                {show.oldPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              <Form.Control.Feedback type="invalid">
                {formik.errors.oldPassword}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          {/* Mật khẩu mới */}
          <Form.Group className="mb-4">
            <Form.Label>Mật khẩu mới</Form.Label>
            <div id={passwordForm} style={{ position: "relative" }}>
              <Form.Control
                type={show.newPassword ? "text" : "password"}
                name="newPassword"
                placeholder="Nhập mật khẩu mới"
                {...formik.getFieldProps("newPassword")}
                isInvalid={
                  formik.touched.newPassword && !!formik.errors.newPassword
                }
              />
              <span
                onClick={() => toggleVisibility("newPassword")}
                className={iconEye}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }}
              >
                {show.newPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              <Form.Control.Feedback type="invalid">
                {formik.errors.newPassword}
              </Form.Control.Feedback>
            </div>
          </Form.Group>

          {/* Nhập lại mật khẩu */}
          <Form.Group className="mb-4">
            <Form.Label>Xác nhận mật khẩu mới</Form.Label>
            <div id={passwordForm} style={{ position: "relative" }}>
              <Form.Control
                type={show.newPassword2 ? "text" : "password"}
                name="newPassword2"
                placeholder="Xác nhận mật khẩu mới"
                {...formik.getFieldProps("newPassword2")}
                isInvalid={
                  formik.touched.newPassword2 && !!formik.errors.newPassword2
                }
              />
              <span
                onClick={() => toggleVisibility("newPassword2")}
                className={iconEye}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                }}
              >
                {show.newPassword2 ? <FaEye /> : <FaEyeSlash />}
              </span>
              <Form.Control.Feedback type="invalid">
                {formik.errors.newPassword2}
              </Form.Control.Feedback>
            </div>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 fw-bold"
            disabled={loading ? true : false}
          >
            {loading ? "Loading..." : "Cập nhật mật khẩu"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChangePassword;
