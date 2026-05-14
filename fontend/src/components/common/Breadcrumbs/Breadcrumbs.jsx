import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Breadcrumbs({ title, desc }) {
  return (
    <div className={styles.container}>
      <h2 className="mb-3">{title}</h2>

      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Home
        </Breadcrumb.Item>

        <Breadcrumb.Item active>{desc}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default Breadcrumbs;
