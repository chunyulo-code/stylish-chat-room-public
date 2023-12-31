import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

import App from "./App";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import ThankYou from "./pages/ThankYou/ThankYou";
import Product from "./pages/Product/Product";
import Profile from "./pages/Profile/Profile";
import ChatAdmin from "./pages/ChatRoom/Admin/ChatAdmin";
import ChatUser from "./pages/ChatRoom/User/ChatUser";
import SocketTest from "./pages/ChatRoom/Admin/ChatRoomSocket";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="thankyou" element={<ThankYou />} />
        <Route path="profile" element={<Profile />} />
        <Route path="chatAdmin" element={<ChatAdmin />} />
        <Route path="chatuser" element={<ChatUser />} />
        <Route path="sockettest" element={<SocketTest />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
