import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProductList from "./products/ProductList";
import ProductPage from "./products/ProductPage";
import OrderList from "./order/OrderList";
import CategoryForm from "./forms/CategoryForm";
import ProductForm from "./forms/ProductForm";
import {Provider} from 'react-redux';
import store from '../store';
import Menu from "./pageComponents/Menu";
import Home from "./pageComponents/Home";
import AdminPanel from "./AdminRoute/AdminPanel";
import Authenticate from "./pageComponents/Authenticate";
import Cart from "./pageComponents/Cart";

import "bootstrap/scss/bootstrap.scss"
import "../index.scss"


function App() {
    return (
        <Provider store = {store}>
            <Router>
                <div className="App">
                    <Menu/>
                    <Route exact path="/" component={Home}/>
                    <Route path="/authenticate" component={Authenticate}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route exact path="/product/:id" component={ProductPage}/>

                    <Switch>
                        <AdminPanel exact path="/products" component={ProductList}/>
                        <AdminPanel exact path="/orders" component={OrderList}/>
                        <AdminPanel exact path="/categories/add" component={CategoryForm}/>
                        <AdminPanel exact path="/products/add" component={ProductForm}/>
                        <AdminPanel exact path="/products/edit/:id" component={ProductForm}/>
                    </Switch>
                </div>
            </Router>
        </Provider>

    );
}

export default App;
