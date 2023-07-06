// Components
import { Link } from "react-router-dom";
import { GrCart } from "react-icons/gr";
import Sidebar from "../Sidebar/Sidebar";
import { allCategories } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

// Hooks
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Images and Svg
import logo from "../../images/21store.png";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const length = useSelector((state) => state.cart.length);

  const [query, setQuery] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  const [isOpen, setisOpen] = useState(false);

  const handleCategoryClick = (category) => {
    navigate(`/search?q=${encodeURIComponent(category)}`);
  };

  return (
    <>
      {auth && user ? (
        <Sidebar user={user} />
      ) : (
        <nav className="flex -mt-1 items-center justify-between flex-wrap bg-white py-4 lg:px-12 shadow border-solid border-t-2 border-blue-700 fixed top-0 w-full">
          <div className="flex items-center flex-shrink-0 mr-16">
            <Link to="/">
              <img src={logo} alt="Logo da loja" className="w-16" />
            </Link>
          </div>
          <div className="flex gap-4 ml-10">
            <div className="hover:border-b-2 hover:border-black p-2">
              <Link>Todos os produtos</Link>
            </div>
            <div className="hover:border-b-2 hover:border-black p-2">
              <Link>Promoções</Link>
            </div>
            <div className="hover:border-b-2 hover:border-black p-2">
              <div
                onMouseOver={() => setisOpen(true)}
                onMouseOut={() => setisOpen(false)}
                className="hover:cursor-pointer"
              >
                Categorias
              </div>
              {isOpen && (
                <div
                  onMouseOver={() => setisOpen(true)}
                  onMouseOut={() => setisOpen(false)}
                  className="absolute bg-white border top-12 hover:cursor-pointer p-6 mr-10 rounded"
                >
                  {allCategories &&
                    allCategories.map((category, index) => (
                      <option
                        key={index}
                        value={category}
                        className="hover:underline text-lg"
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </option>
                    ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="relative mx-auto text-gray-600 lg:block hidden focus:text-black"
            >
              <input
                type="text"
                className="border-2 bg-gray-100 border-none h-10 pl-2 pr-8 rounded-lg
                hover:bg-gray-200 text-sm focus:outline-none focus:bg-gray-200 transition-all"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="T-shirt cropped e mais"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-2"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  id="Capa_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 56.966 56.966" }}
                  width="512px"
                  height="512px"
                >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                </svg>
              </button>
            </form>
            <div className="ml-4">
              <Link to="/cart">
                <Link to="/cart">
                  <p
                    className={`text-center text-white ${
                      length > 0 ? "bg-black" : ""
                    } w-6 h-6 rounded-full absolute top-7 right-10 transform translate-x-1/2 -translate-y-1/2`}
                  >
                    {length > 0 ? length : ""}
                  </p>
                </Link>
                <GrCart size={25} />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
