import React, { createContext, useState, useCallback } from 'react';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from './components/windows/header/navbar.jsx';
import Hidenavbar from './components/windows/header/hideNavbar.jsx';
import Footer from './components/windows/footer/footer.jsx';
import Hidefooter from './components/windows/footer/hideFooter.jsx';
import Loading from './components/windows/loading/loading.jsx';
import AuthRouteWrapper from './utils/AuthRouteWrapper.jsx';
import RetailerAuthWrapper from './utils/retailerAuthWrapper.jsx';
import './windowsCss.css'
// Lazy load components
const Home = lazy(() => import('./pages/windows/home/home.jsx'));
const SingleProduct = lazy(() => import('./pages/windows/singleProduct/singleProduct.jsx'));
const Products = lazy(() => import('./pages/windows/products/product.jsx'));
const Account = lazy(() => import('./pages/windows/user/user.jsx'));
const Login = lazy(() => import('./components/windows/login/login.jsx'));
const PinCodeFilter = lazy(() => import('./components/windows/pincodeFilter/pinCodeFilter.jsx'))
const Signup = lazy(() => import('./components/windows/signup/signuppage.jsx'));
const PageNotFound = lazy(() => import('./components/windows/pageNotFound/pageNotFound.jsx'));
const CategoryPage = lazy(() => import('./pages/windows/CategoryPage/CategoryPage.jsx'));
const SearchPage = lazy(() => import('./components/windows/searchPage/searchPage.jsx'));
const ContactPage = lazy(() => import('./components/windows/contactPage/contactPage.jsx'));
const ShopPage = lazy(() => import('./pages/windows/shop/shopPage.jsx'));
const SingleShop = lazy(() => import('./pages/windows/singleShop/singleShop.jsx'));
const RetailerLogin = lazy(() => import('./components/windows/retailerlogin/retailerLogin.jsx'));
const RetailerDashboard = lazy(() => import('./pages/windows/retailer/retailer.jsx'));

export const ColorModeContext = createContext();

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const WindowsApp = () => {
  const [colorMode, setColorMode] = useState('light');
  
  const toggleColorMode = useCallback(() => {
    setColorMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <HelmetProvider>
        <Helmet>
          <title>Bharat Shop</title>
          <meta name="description" content="Your one-stop shop for all your needs." />
        </Helmet>
        <Router>
          <Hidenavbar><Navbar /></Hidenavbar>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<AuthRouteWrapper element={<Account />} />} />
                <Route path="/addpincode" element={<PinCodeFilter />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/products" element={<Products />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/search/:keyword" element={<SearchPage />} />
                <Route path="/product/:productId" element={<SingleProduct />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/shop/:shopId" element={<SingleShop />} />
                <Route path="/retailer/login" element={<RetailerLogin />} />
                <Route path="/retailer/*" element={<RetailerAuthWrapper element={<RetailerDashboard />} />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
          <Hidefooter><Footer /></Hidefooter>
        </Router>
      </HelmetProvider>
    </ColorModeContext.Provider>
  );
};

export default WindowsApp;


