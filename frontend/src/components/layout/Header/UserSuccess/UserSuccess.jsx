import { BsPerson } from "react-icons/bs";
import Button from "@components/common/Button/Button";
import { signOut } from "firebase/auth";
import styles from "../styles.module.scss";
import { useNavigate } from "react-router-dom";
import { auth } from "@config/firebase";
function UserSuccess() {
  const {
    containerIcon,
    quantiTy,
    menuChild,
    listTop,
    containerBottom,
    hiStory,
  } = styles;
  const nagavigator = useNavigate();
  const handleLogout = async () => {
    await signOut(auth);
    nagavigator("/login");
  };
  return (
    <div className={containerIcon}>
      <BsPerson size={30} />
      <span className={quantiTy}>2</span>

      <div className={menuChild}>
        <div className={listTop}>
          <div>
            Số dư: 0 <sup>đ</sup>
          </div>
          <div>|</div>
          <div>
            KM: 0 <sup>coin</sup>
          </div>
        </div>

        <hr />

        <div className="ps-3" id={hiStory}>
          Lịch sử nạp
        </div>

        <hr color="#ccc" />

        <div className={containerBottom}>
          <Button text={"Hồ sơ"} link={"/member"} isBg={false} />
          <Button text="Đăng xuất" handleLogout={handleLogout} isBg={true} />
        </div>
      </div>
    </div>
  );
}

export default UserSuccess;
