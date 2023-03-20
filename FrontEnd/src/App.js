import React from "react";
import { Container} from "react-bootstrap"
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import {Routes,Route } from "react-router-dom";
import Productscreen from "./screens/Productscreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from './screens/OrderScreen'
import UserListScreen from "./screens/UserListScreen";
import AdminUserEditScreen from "./screens/AdminUserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";


function App() {
  return (
    <>
      <Header/>
      <main className="pt-3">
        <Container>
        <Routes>
        <Route path="/" element={<Homescreen/>} exact/>
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/profile" element={<ProfileScreen/>} />
        <Route path='/product/:id' element={<Productscreen/>}></Route>
        <Route path='/cart/:id?' element={<CartScreen/>}></Route>
        <Route path='/shipping' element={<ShippingScreen/>}></Route>
        <Route path='/payment' element={<PaymentScreen/>}></Route>
        <Route path='/placeorder' element={<PlaceOrderScreen/>}></Route>
        <Route path='/order/:id' element={<OrderScreen/>}></Route>
        <Route path='/admin/userslist' element={<UserListScreen/>}></Route>
        <Route path='/admin/user/:id/edit' element={<AdminUserEditScreen/>}></Route>
        <Route path='/admin/productslist' element={<ProductListScreen/>}></Route>
        <Route path='/admin/product/:id/edit' element={<ProductEditScreen/>}></Route>
        
        


        </Routes>
        </Container>

      </main>
      <Footer/>
    </>
  );
}

export default App;
