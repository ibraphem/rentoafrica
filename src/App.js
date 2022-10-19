import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReduxModalsIndex from "./components/modals/ReduxModalsIndex";
import ScrollToTop from "./layout/misc/ScrollToTop";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";


const App = () => {
  return (
  <>
  <ReduxModalsIndex/>
    <Router>
      <ScrollToTop>
    <ProtectedRoutes/>
    <PublicRoutes/>
    </ScrollToTop>
      
    </Router>

    </>

  );
};
export default App;
