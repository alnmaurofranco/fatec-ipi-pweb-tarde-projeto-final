import React, { useContext, useEffect, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {
  FaSearch,
  FaShoppingBag,
  FaRegUserCircle,
  FaUserPlus,
  FaSignInAlt,
  FaPowerOff,
  FaUserCircle
} from "react-icons/fa";

import { Link, useRouteMatch, useHistory } from "react-router-dom";
import api from "../../services/api";

import { Context } from "../../Context/AuthContext";

function MenuLink({ label, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <>
      <Link to={to} className={match ? "nav-link active" : "nav-link"}>
        {label}
      </Link>
    </>
  );
}

const Header = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const [users, setUsers] = useState({});
  const [isUser, setIsUser] = useState(false);
  const { handleLogout } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/account');
        setUsers(response.data.user);
        setIsUser(true);
      } catch (error) {
        setIsUser(false);
        if (error) {
        }
      }
    })();
  }, []);

  return (
    <div>
      <header>
        <Navbar expand="lg" className="fixed-top nav-theme">
          <div className="container">
            <NavbarBrand href="/" className="logo">
              MarketInfo
          </NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <form className="form-inline" onSubmit={props.submit}>
                <div className="search__container">
                  <input
                    onChange={props.onChange}
                    value={props.value}
                    className="form-control"
                    type="text"
                    placeholder="Faça uma busca por mais produtos..."
                    onClick={() => {
                      history.push("/search");
                    }}
                  />
                  <button className="search__btn" type="submit">
                    <FaSearch />
                  </button>
                </div>
              </form>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <Link to="/cart" className="btn btn-transparent-cart btn-mt">
                    <FaShoppingBag size="2em" />
                    <span className="badge badge-info">0</span>
                  </Link>
                </NavItem>

                {isUser === true ?
                  (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className="btn btn-transparent-cart btn-mt">
                        <FaRegUserCircle size="2em" className="mr-2" />
                        {users.first_name}
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Link to="/dashboard" className="dropdown-item">
                          <FaUserCircle className="mr-2" />
                          Dashboard
                        </Link>
                        <DropdownItem divider />
                        <Link onClick={handleLogout} className="dropdown-item">
                          <FaPowerOff className="mr-2" />
                          Logout
                        </Link>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )
                  :
                  (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret className="btn btn-transparent-cart btn-mt">
                        <FaRegUserCircle size="2em" className="mr-2" />
                            Conta
                      </DropdownToggle>
                      <DropdownMenu right>
                        <Link to="/login" className="dropdown-item">
                          <FaSignInAlt className="mr-2" />
                          Fazer login
                        </Link>
                        <DropdownItem divider />
                        <Link to="/register" className="dropdown-item">
                          <FaUserPlus className="mr-2" />
                          Cadastre-se
                        </Link>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}

              </Nav>
            </Collapse>
          </div>
          <div className="nav-scroller shadow-sm">
            <nav className="nav nav-underline">
              <MenuLink activeOnlyWhenExact={true} to="/" label="Pagina Inicial" />
              <MenuLink to="#departamentos" label="Departamentos" />
              <MenuLink to="#" label="Mais vendidos" />
              <MenuLink to="/about" label="Quem somos" />
              <MenuLink to="/#" label="Contato" />
            </nav>
          </div>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
