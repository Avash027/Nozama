import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import loadable from "@loadable/component";

const Footer = loadable(() => import("./Components/LayoutElements/Footer"));
const Header = loadable(() => import("./Components/LayoutElements/Header"));

const HomePage = loadable(() => import("./Pages/HomePage"));
const ProductPage = loadable(() => import("./Pages/ProductPage"));
const CartPage = loadable(() => import("./Pages/CartPage"));
const SignUpForm = loadable(() => import("./Pages/SignUpForm"));
const UserProfile = loadable(() => import("./Pages/UserProfile"));
const ShippingPage = loadable(() => import("./Pages/ShippingPage"));
const ProductAdd = loadable(() => import("./Pages/ProductAdd"));
const SearchPage = loadable(() => import("./Pages/SearchPage"));

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Router>
      <Header />
      <main>
        <div>
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} exact />
          <Route path="/cart/:id?" component={CartPage} exact />
          <Route path="/login" component={SignUpForm} exact />
          <Route path="/user/profile" component={UserProfile} exact />
          <Route path="/shipping" component={ShippingPage} exact />
          <Route path="/search/:query?" component={SearchPage} exact></Route>
          {userInfo && userInfo.isAdmin && (
            <Route path="/add" component={ProductAdd} exact={true} />
          )}
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
