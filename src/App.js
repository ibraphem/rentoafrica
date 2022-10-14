import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReduxModalsIndex from "./components/modals/ReduxModalsIndex";
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
