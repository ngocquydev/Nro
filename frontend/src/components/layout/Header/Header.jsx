import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link để chặn reload
import styles from './styles.module.scss';
import { Container } from 'react-bootstrap';
import { IoMdMenu } from 'react-icons/io';
import { FaRegUser } from 'react-icons/fa6';
import { IoChevronDown, IoClose } from 'react-icons/io5';
import cls from 'classnames';
import { auth } from '@/_config/firebase';
import UserSuccess from './UserSuccess/UserSuccess';
import MenuHeader from '@components/layout/Header/contans';
import { AuthContext } from '@contexts/AuthProvider';
import { checkRecharges } from '@/_config/api/recharges/recharges';

function Header() {
  const {
    header,
    logoContainer,
    menu,
    boxMenu,
    boxLogin,
    boxIconMenu,
    show,
    none,
    subMenu,
    showSubMenu,
    noneSubMenu,
  } = styles;
  const [toggle, setToggle] = useState(false);
  const [hideSubMenu, setHideSubMenu] = useState(null);
  const [user, setUser] = useState(null);
  const { userDT } = useContext(AuthContext);
  const handleHideSubMenu = (name) => {
    setHideSubMenu((prev) => (prev === name ? null : name));
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (auth.currentUser && userDT?._id) {
      const intervalId = setInterval(() => {
        checkRecharges({ userId: userDT._id })
          .then((res) => {
            if (res && res.data && res.data.success === false) {
              clearInterval(intervalId);
            }
          })
          .catch((err) => {
            console.error('Lỗi khi kiểm tra nạp tiền:', err);
          });
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [auth.currentUser, userDT?._id]);
  return (
    <Container className="p-0">
      <header className={header}>
        <div className={logoContainer}>
          <Link to="/">
            <img
              src="https://bannick.s3.hcm-1.cloud.cmctelecom.vn/photos/shares/01_logo_game/nickmt/6979e35f433a0.png"
              alt="LogoWeb"
            />
          </Link>
        </div>

        <div className={boxMenu}>
          <ul className={cls(menu, { [show]: toggle, [none]: !toggle })}>
            {MenuHeader.slice(0, 5).map((item) => (
              <li key={item.name} onClick={() => handleHideSubMenu(item.name)}>
                <Link to={item.link}>
                  {item.name}
                  {item.subMenu && <IoChevronDown size={18} className="mb-1" />}
                </Link>

                {item.subMenu && item.subMenu.length > 0 && (
                  <ul
                    className={cls(subMenu, {
                      [showSubMenu]: hideSubMenu === item.name && showSubMenu,
                      [noneSubMenu]: hideSubMenu !== item.name && noneSubMenu,
                    })}
                  >
                    {item.subMenu.map((sub) => (
                      <li key={sub.name}>
                        <Link to={sub.link}>{sub.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className={boxLogin}>
          <ul className={menu}>
            {user ? (
              <UserSuccess />
            ) : (
              MenuHeader.slice(5, 6).map((item) => (
                <li key={item.name}>
                  <Link to={item.link}>
                    <FaRegUser size={18} className="me-1 mb-2" />
                    {item.name}
                  </Link>
                </li>
              ))
            )}
          </ul>

          <div
            className={boxIconMenu}
            onClick={() => setToggle(!toggle)}
            style={{ cursor: 'pointer' }}
          >
            {!toggle ? <IoMdMenu size={30} /> : <IoClose size={30} />}
          </div>
        </div>
      </header>
    </Container>
  );
}

export default Header;
