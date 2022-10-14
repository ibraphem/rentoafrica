import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ReduxModalsIndex from "./components/modals/ReduxModalsIndex";
import Layout from "./layout/Index";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";


const App = () => {
  return (
  <>
  <ReduxModalsIndex/>
    <Router>
    <ProtectedRoutes/>
    <PublicRoutes/>
      
    </Router>

    </>

  );
};
export default App;
