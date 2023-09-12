import React, { useContext, useEffect, useState } from "react";
import logonegro from "../assets/images/logo-azul.png";
import Link from "next/link";
import { GlobalContext } from "../context/GlobalContext";
import { ICategoryDB } from "../interfaces/category";
import { useRouter } from "next/router";

const NavBar = ({ children }) => {
  const [categories, setCategories] = useState<ICategoryDB[]>([]);

  const { shoppingCartItems, isLogged, setIsLogged } =
    useContext(GlobalContext);

  const router = useRouter();

  useEffect(() => {
    handleGetCategories();
  }, []);

  const handleGetCategories = async () => {
    const reponseCatDB = await fetch(
      "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/categories?populate[0]=image",
      {
        method: "GET",
      }
    );

    const categoriesDB: ICategoryDB[] = await (await reponseCatDB.json()).data;

    setCategories(categoriesDB);
  };

  return (
    <>
      <header className="py-4 shadow-sm bg-white">
        <div className="container flex items-center justify-between">
          <Link href="/">
            <img src={logonegro.src} alt="Logo" className="w-44" />
          </Link>

          <div className="w-full max-w-xl relative flex">
            <span className="absolute left-4 top-3 text-lg text-gray-400">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input
              type="text"
              name="search"
              id="search"
              className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md hidden md:flex focus:outline-none"
              placeholder="search"
            />
            <button className="bg-primary border border-primary  justify-center items-center text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition md:flex hidden">
              Search
            </button>
          </div>

          {isLogged && (
            <div className="flex items-center space-x-4">
              <Link
                href="/cart"
                className="text-center text-gray-700 hover:text-primary transition relative"
              >
                {/* <div className="text-2xl">
                <i className="fa-regular fa-heart"></i>
              </div> */}
                <div className="text-2xl">
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>
                <div className="text-xs leading-3">Cart</div>
                <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                  {shoppingCartItems
                    .map((item) => item.amount)
                    .reduce((a, b) => a + b, 0)}
                </div>
              </Link>
              <Link
                href="/account"
                className="text-center text-gray-700 hover:text-primary transition relative"
              >
                <div className="text-2xl">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="text-xs leading-3">Account</div>
              </Link>
            </div>
          )}
        </div>
      </header>
      <nav className="bg-gray-800">
        <div className="container flex">
          <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
            <span className="text-white">
              <i className="fa-solid fa-bars"></i>
            </span>
            <span className="capitalize ml-2 text-white hidden">
              All Categories
            </span>

            <div className="absolute w-72 left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              {categories.map((category) => {
                return (
                  <Link
                    href={`/shop?${category.name}`}
                    className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
                  >
                    <img
                      src={category.image[0].url}
                      alt="sofa"
                      className="w-5 h-5 object-contain"
                    />
                    <span className="ml-6 text-gray-600 text-sm">
                      {" "}
                      {category.name}{" "}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                href="/"
                className="text-gray-200 hover:text-white transition"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-gray-200 hover:text-white transition"
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className="text-gray-200 hover:text-white transition"
              >
                Contact
              </Link>
              {/* <Link
                href="/lmt-dealer-form"
                className="text-gray-200 hover:text-white transition"
              >
                Dealer Form
              </Link> */}
              {/* <a href="#" className="text-gray-200 hover:text-white transition">
                About us
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Contact us
              </a> */}
            </div>
            {isLogged ? (
              <Link
                href="/"
                className="text-gray-200 hover:text-white transition"
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsLogged(false);
                  router.push("/");
                }}
              >
                Logout
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-gray-200 hover:text-white transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
      {children}
    </>
  );
};

export default NavBar;
