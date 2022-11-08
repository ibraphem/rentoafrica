import { useSelector } from "react-redux";
import "../assets/css/publicStyles/header.css"

const Favorites = () => {
    const favRent = useSelector((state) => state?.favoriteRent?.rent);
    return (
        <div className="header-cart-box">
        <div className="login dropdown">
          {favRent?.length > 0 && (
            <Link to="/favorites" className="cart-icon" id="dropdownMenu1">
              <span>{favRent?.length}</span>
            </Link>
          )}
        </div>
      </div>
    );
};

export default Favorites;