import { Link, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import clsx from 'clsx';
function Button({ text, link, handleLogout, isBg = true, onClick }) {
  const { btnBuy, bgTrue, bgFalse } = styles;
  return (
    <div className="d-flex justify-content-center mt-auto">
      <Link
        to={link}
        className={clsx(btnBuy, isBg ? bgFalse : bgTrue)}
        onClick={onClick || handleLogout}
      >
        <span>{text}</span>
      </Link>
    </div>
  );
}

export default Button;
