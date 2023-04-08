// eslint-disable-next-line
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import React, { useContext }  from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';

function App() {
  const {state , dispatch: ctxDispatch} = useContext(Store);

  const {cart , userInfo} =  state;

  const signoutHandler = () => {
      ctxDispatch({type: 'USER_SIGNOUT'});
      localStorage.removeItem('userInfo');
      localStorage.removeItem('shippingAddress');
  };

  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <ToastContainer position='bottom-center' limit={1} />
        <header className="title-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Amazon</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                  <Link to="/cart" className='nav-link'>
                      Cart
                        {
                          cart.cartItems.length > 0 &&
                            (
                              <Badge pill bg="danger">
                                  {cart.cartItems.reduce((a , c) => a + c.quantity , 0)}
                              </Badge>
                            )
                        }
                  </Link>
                  {
                    userInfo ? (
                      <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                          <LinkContainer to="/profile">
                              <NavDropdown.Item>User Profile</NavDropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="/orderhistory">
                              <NavDropdown.Item>Order History</NavDropdown.Item>
                          </LinkContainer>
                          <NavDropdown.Divider />
                          <Link
                              className='dropdown-item'
                              to="#signout"
                              onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                      </NavDropdown>
                    ) : (
                      <Link to="/signin" className='nav-link'>
                          Sign In
                      </Link>
                    )
                  }
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className='footer-main'>
          <div className='footer-title'>All right reserved!</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;