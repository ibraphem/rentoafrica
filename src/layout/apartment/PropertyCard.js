import { FaBed, FaToilet } from "react-icons/fa";
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
        <Link to={`/details/${data?.propertyId}`}>
        <div className="offer-image">
          <Link to={`/details/${data?.propertyId}`}>
            <img src={data?.defaultPhoto} alt={data?.propertyName} />
          </Link>
        </div>
        </Link>
        <div className="offer-text">
          <Link to={`/details/${data?.propertyId}`}>
            <h3>{data?.propertyName}</h3>
          </Link>
          <Link to={`/details/${data?.propertyId}`}>
          <h4>
          &#8358;{amountFormat(data?.propertyAmount)}<span>/Annum</span>
          </h4>
          <ul>
            <li>
              <FaToilet />
              {data?.toilets} bath/toilet
            </li>
            {/* <li>
              <FaHome />
              {data?.propertyConditionDescription}
            </li> */}
            <li>
            <FaBed />
              {data?.furnishedStatusDescription}
            </li>
          </ul>
          </Link>
          <div className={isfavScreen ? "offer-action2 offer-action" : "offer-action"}>
            <Link
              to={`/details/${data?.propertyId}`}
              className="offer-btn-1"
            >
              Details
            </Link>
          {isfavScreen ? (
              <Link 
              className="offer-btn-2"
              onClick={() => dispatch(removeFromFavoriteRent(data?.propertyId))} 
            >
               Remove
            </Link>
          ): (
            <Link
            className={checkIsFavRent(data?.propertyId) ? "offer-btn-2 disabled-link" : "offer-btn-2"}
            onClick={() => dispatch(addToFavoriteRent(data))} 
          >
             Favorite
          </Link>
          )}
          </div>
        </div>
      </div>
    );
};

export default PropertyCard;