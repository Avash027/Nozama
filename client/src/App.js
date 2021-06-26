import Header from "./Components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./Components/Footer";
import { useSelector } from "react-redux";

import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import CartPage from "./Pages/CartPage";
import SignUpForm from "./Pages/SignUpForm";
import UserProfile from "./Pages/UserProfile";
import ShippingPage from "./Pages/ShippingPage";
import ProductAdd from "./Pages/ProductAdd";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart/:id?" component={CartPage} />
          <Route path="/login" component={SignUpForm} exact />
          <Route path="/user/profile" component={UserProfile} exact />
          <Route path="/shipping" component={ShippingPage} exact />
          {userInfo && userInfo.isAdmin && (
            <Route path="/add" component={ProductAdd} exact />
          )}
          {/**? at the end to make id optional */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
