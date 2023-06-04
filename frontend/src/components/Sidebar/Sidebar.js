import React, { useState } from "react";

import { HiMenu } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { AiOutlinePlusSquare, AiOutlineTags } from "react-icons/ai";
import { VscGear, VscTag } from "react-icons/vsc";
import { BiExit } from "react-icons/bi";

import { Link } from "react-router-dom";

// Redux
import { logout, reset } from "../../slices/authSlice";

// Hooks
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = ({ user }) => {
  const menus = [
    { name: "Dashboard", link: "/dashboard", icon: RxDashboard },
    {
      name: "Produtos",
      link: `/users/${user._id}`,
      icon: VscTag,
      margin: true,
    },
    {
      name: "Adicionar",
      link: `/users/${user._id}/add`,
      icon: AiOutlinePlusSquare,
    },
    { name: "Promoções", link: "/", icon: AiOutlineTags },
    { name: "configurações", link: "/profile", icon: VscGear, margin: true },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    //Não precisa de useEffect pq só tem uma ação, da dispatch nas duas e ta tudo certo
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <section className="flex gap-6 fixed">
        <div
          className={`bg-slate-700 min-h-screen ${
            open ? `w-72` : `w-16`
          } duration-500 text-gray-100 px-4`}
        >
          <div className="flex justify-between">
            <div>
              {open && (
                <div className="ml-2 text-xl text-white font-semibold my-4">
                  ADM
                </div>
              )}
            </div>
            <div className="py-3 flex justify-between">
              <div className="flex items-center">
                <HiMenu
                  size={26}
                  className="cursor-pointer"
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={`${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md `}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
            <Link
              to="/"
              className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              onClick={handleLogout}
            >
              <div>
                <BiExit size={20} />
              </div>
              <h2
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Sair
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                Sair
              </h2>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sidebar;
