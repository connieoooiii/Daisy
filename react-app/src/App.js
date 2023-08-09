import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Route, Switch} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import {authenticate} from "./store/session";
import Navigation from "./components/Navigation";
import ProductsIndex from "./components/ProductsIndex";
import ProductDetails from "./components/ProductDetails";
import ManageProducts from "./components/MangaProducts";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/products">
            <ProductsIndex />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/products/manage">
            <ManageProducts />
          </Route>
          <Route exact path="/products/:productId">
            <ProductDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
