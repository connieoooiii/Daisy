import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import {Route, Switch} from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import {authenticate} from "./store/session";
import Navigation from "./components/Navigation";
import ProductsIndex from "./components/ProductsIndex";
import ProductDetails from "./components/ProductDetails";
import ManageProducts from "./components/ManageProducts";
import CreateProduct from "./components/CreateProduct";
import ShoppingCart from "./components/ShoppingCart";
import LandingPage from "./components/LandingPage";
import Loadingpage from "./components/LoadingPage";

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
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/products">
            <ProductsIndex />
          </Route>
          <Route exact path="/shopping-cart">
            <ShoppingCart />
          </Route>
          <Route exact path="/products/manage">
            <ManageProducts />
          </Route>
          {/* <Route exact path="/products/new">
            <CreateProduct />
          </Route> */}
          <Route exact path="/products/:productId">
            <ProductDetails />
          </Route>
          <Route exact path="/loading">
            <Loadingpage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
