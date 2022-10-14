import { FaBed, FaHome, FaToilet } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavoriteRent, removeFromFavoriteRent } from "../../redux/slices/favouriteRentSlice";
import { amountFormat } from "../../utils/format";
import "../../assets/css/publicStyles/propertyCard.css"

const PropertyCard = ({data, isfavScreen = false}) => {
  const dispatch = useDispatch()
  const favRent = useSelector((state) => state?.favoriteRent?.rent);

  
  const checkIsFavRent = (propertyId) => {
    const isFavRent = favRent?.some((fav)=> fav.id === propertyId)
    return isFavRent
  }
  
    return (
        <div className="single-offers">
        <Link to={`/details/${data?.id}`}>
        <div className="offer-image">
          <Link to={`/details/${data?.id}`}>
            <img src={data?.coverImage} alt={data?.apartmentType} />
          </Link>
        </div>
        </Link>
        <div className="offer-text">
          <Link to={`/details/${data?.id}`}>
            <h3>{data?.apartmentType} at {data?.lga} {data?.state}</h3>
          </Link>
          <Link to={`/details/${data?.id}`}>
          <h4>
          &#8358;{amountFormat(data?.amount)}<span>/ {data?.paymentMode}</span>
          </h4>
          <ul>
            <li>
              <FaToilet />
              {data?.toilet} Toilet
            </li>
            <li>
              <FaHome />
              {data?.condition}
            </li>
            <li>
            <FaBed />
              {data?.furnished}
            </li>
          </ul>
          </Link>
          <div className={isfavScreen ? "offer-action2 offer-action" : "offer-action"}>
            <Link
              to={`/details/${data?.id}`}
              className="offer-btn-1"
            >
              Details
            </Link>
          {isfavScreen ? (
              <Link
              className="offer-btn-2"
              onClick={() => dispatch(removeFromFavoriteRent(data?.id))} 
            >
               Remove
            </Link>
          ): (
            <Link
            className={checkIsFavRent(data?.id) ? "offer-btn-2 disabled-link" : "offer-btn-2"}
            onClick={() => dispatch(addToFavoriteRent(data))} 
          >
             Add to Favorite
          </Link>
          )}
          </div>
        </div>
      </div>
    );
};

export default PropertyCard;