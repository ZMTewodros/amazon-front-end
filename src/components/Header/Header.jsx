import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import { DataContext } from "../../DataProvider/DataProvider";
import { useContext } from "react"; // Import useContext
import { Link } from "react-router-dom";
import { auth } from "../../utility/firebase";

function Header() {
  const [{ user, basket }] = useContext(DataContext);

  return (
    <>
      <section>
        <div className={classes.header_container}>
          {/* logo section */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon logo"
                width={150}
              />
            </Link>

            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <a href="">
                  <FaMapMarkerAlt />
                </a>
              </span>
              <div>
                <a href="">
                  <p>Deliver to</p>
                  <span> Ethiopia</span>
                </a>
              </div>
            </div>
          </div>

          {/* search section */}
          <div className={classes.search}>
            <select name="id">
              <option value="all">All</option>
            </select>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="search products"
            />
            <BsSearch size={25} />
          </div>

          {/* Other Section */}
          <div className={classes.order_container}>
            <a href="#" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png"
                alt="US Flag"
                width={25}
              />
              <select name="language" id="language">
                <option value="en">EN</option>
              </select>
            </a>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p> Hello,Sign In </p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders">
              <p> Returns </p>
              <span> & Orders</span>
            </Link>

            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{basket?.length || 0}</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
