import styles from "./styles.module.scss";
import { BsCalendar, BsPerson } from "react-icons/bs";
function ItemsBlog({ title, content, img, times }) {
  const { containerCard, boxImg, boxContent, metaContainer, desc } = styles;
  return (
    <div className={containerCard}>
      <div className={boxImg}>
        <img src={img} alt={title} />
      </div>
      <div className={boxContent}>
        <h5>
          <a href="#">{title}</a>
        </h5>
        <ul className={metaContainer}>
          <li style={{ textTransform: "capitalize" }}>
            <BsCalendar /> {times}
          </li>
          <li>
            <BsPerson /> Admin
          </li>
        </ul>
        <div className={desc}>{content}</div>
      </div>
    </div>
  );
}
export default ItemsBlog;
