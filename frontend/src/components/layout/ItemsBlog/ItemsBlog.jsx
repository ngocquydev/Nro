import { href, Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { BsCalendar, BsPerson } from 'react-icons/bs';
function ItemsBlog({ title, content, img, times, href }) {
  const { containerCard, boxImg, boxContent, metaContainer, desc } = styles;
  const navigator = useNavigate();
  const handleNavigation = () => {
    navigator(href);
  };
  return (
    <div className={containerCard} onClick={handleNavigation}>
      <div className={boxImg}>
        <img src={img} alt={title} />
      </div>
      <div className={boxContent}>
        <h5>
          <div to={'#'}>{title}</div>
        </h5>
        <ul className={metaContainer}>
          <li style={{ textTransform: 'capitalize' }}>
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
