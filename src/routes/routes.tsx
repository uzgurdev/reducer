import { Routes as Switch, Route } from "react-router-dom";
import { Reducer, Redux } from "../pages";
import Navbar from "../components";

const Routes = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route index path="/reduce" element={<Reducer />} />
        <Route path="/redux" element={<Redux />} />
        <Route path="*" element={<Reducer />} />
      </Switch>
    </div>
  );
};

export default Routes;
