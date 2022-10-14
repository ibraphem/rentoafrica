import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterScreen from "../../screens/auth/RegisterScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import FavouriteScreen from "../../screens/FavouriteScreen";
import HomeScreen from "../../screens/HomeScreen";
import RentDetailScreen from "../../screens/RentDetailScreen";
import ScrollToTop from "../ScrollToTop";

const AllRoutes = () => {
    return (
        <Router>
            <ScrollToTop>
            <Routes>
                <Route exact path="/" element={<HomeScreen/>}/>
                <Route exact path="/favorites" element={<FavouriteScreen/>}/>
                <Route exact path="/details/:id" element={<RentDetailScreen/>}/>
                <Route exact path="/register" element={<RegisterScreen/>}/>
                <Route exact path="/login" element={<LoginScreen/>}/>
                <Route exact path="/register/:role" element={<RegisterScreen/>}/>
            </Routes>
            </ScrollToTop>
        </Router>
    );
};

export default AllRoutes;