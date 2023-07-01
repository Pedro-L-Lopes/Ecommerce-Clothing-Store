// Components
import { Link } from "react-router-dom";
import { CgShoppingBag } from "react-icons/cg";
import Sidebar from "../Sidebar/Sidebar";

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
              <Link>Lançamentos</Link>
            </div>
            <div className="hover:border-b-2 hover:border-black p-2">
              <Link>Ofertas</Link>
            </div>
            <div className="hover:border-b-2 hover:border-black p-2">
              <Link>Categorias</Link>
            </div>
          </div>
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="relative mx-auto text-gray-600 lg:block hidden"
            >
              <input
                type="text"
                className="border-2 bg-gray-100 border-none h-10 pl-2 pr-8 rounded-lg
                hover:bg-gray-200 text-sm focus:outline-none focus:bg-gray-200 transition-all"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busca"
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
              <Link to="/">
                <CgShoppingBag size={22} />
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

{
  /* <div className="flex justify-between lg:w-auto w-full lg:border-b-0 pl-6 pr-2 border-solid border-b-2 border-gray-300 pb-5 lg:pb-0">
            <div className="flex items-center flex-shrink-0 text-slate-800 mr-16">
              <span className="font-semibold text-xl tracking-tight">
                <Link to="/">
                  Store
                </Link>
              </span>
            </div>
            <div className="block lg:hidden">
              <button
                id="nav"
                className="flex items-center px-3 py-2 border-2 rounded text-blue-700 border-blue-700 hover:text-blue-700 hover:border-blue-700"
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto lg:px-3 px-8">
            <div className="text-md font-bold text-blue-700 lg:flex-grow">
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Categorias
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                
              </a>
              <a
                href="#responsive-header"
                className="block mt-4 lg:inline-block lg:mt-0 hover:text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
              >
                Menu 3
              </a>
            </div>
              <form className="relative mx-auto text-gray-600 lg:block hidden" onSubmit={handleSubmit}>
                <input
                  className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
                  type="text"
                  name="search"
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
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
            <div className="flex">
              <a
                href="#"
                className="block text-md px-4 py-2 rounded text-blue-700 ml-2 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
              >
                Sign in
              </a>

              <a
                href="#"
                className="block text-md px-4 ml-2 py-2 rounded text-blue-700 font-bold hover:text-white mt-4 hover:bg-blue-700 lg:mt-0"
              >
                Login
              </a>
            </div>
          </div> */
}
