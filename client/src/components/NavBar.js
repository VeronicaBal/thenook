import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar(props) {
  return (

    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">

        {/* logo */}
        <a href="/" className="navbar-brand">
          <img
            src="https://media4.giphy.com/media/khVofmhxrgVz4RsWv5/giphy.gif?cid=790b7611e80fc692840444e963e13c27831ec227f6566f23&rid=giphy.gif&ct=g"
            className="img-responsive"
            alt="thenooklogogreen"
          />
        </a>

        {/* collapse navbar button */}
        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* navbar items left */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav">
            <NavLink to="/" className="nav-item nav-link ">
              Home
            </NavLink>
            <NavLink to="/clubs" className="nav-item nav-link">
              Clubs
            </NavLink>
            <NavLink to="/books/all" className="nav-item nav-link">
              Books
            </NavLink>

            {/* profile link showing up only if logged in */}
            {props.user ? (
              <li className="nav-item">
                <NavLink className="nav-link" to={`/users/${props.user.id}`}>
                  Profile
                </NavLink>
              </li>
            ) : null}

</div>

          {/* navbar items right */}
          {/*     log in/ log out showing up depending on user       */}


{/* navbar items right */}
{/*     log in/ log out showing up depending on user       */} 


          <div className="navbar-nav ms-auto">

         <ul className="navbar-nav">
         <li className="nav-item">
<a href="/contact" className="nav-item nav-link">
              Contact
            </a>
          
          </li>
         </ul>

            {props.user ? (
              <ul className="navbar-nav">


                <li className="nav-item">
                  {/* Log out user. Then go to home page. */}
                  <Link className="nav-link" to="/" onClick={props.logoutCb}>
                    Log Out
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Log In / Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
