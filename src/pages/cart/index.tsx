import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Link from "next/link";

const index = () => {
  const { setShoppingCartItems, shoppingCartItems, role } =
    useContext(GlobalContext);

  return (
    <>
      {/* wrapper */}
      <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* sidebar */}
        {/* <div className="col-span-3">
          <div className="px-4 py-3 shadow flex items-center gap-4">
            <div className="flex-shrink-0">
              <img
                src="../assets/images/avatar.png"
                alt="profile"
                className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover"
              />
            </div>
            <div className="flex-grow">
              <p className="text-gray-600">Hello,</p>
              <h4 className="text-gray-800 font-medium">John Doe</h4>
            </div>
          </div>
          <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
            <div className="space-y-1 pl-8">
              <a href="#" className="block font-medium capitalize transition">
                <span className="absolute -left-8 top-0 text-base">
                  <i className="fa-regular fa-address-card" />
                </span>
                Manage account
              </a>
              <a
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                Profile information
              </a>
              <a
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                Manage addresses
              </a>
              <a
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                Change password
              </a>
            </div>
            <div className="space-y-1 pl-8 pt-4">
              <a
                href="#"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <i className="fa-solid fa-box-archive" />
                </span>
                My order history
              </a>
              <a
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                My returns
              </a>
              <a
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                My Cancellations
              </a>
              <a
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                My reviews
              </a>
            </div>
            <div className="space-y-1 pl-8 pt-4">
              <a
                href="#"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <i className="fa-regular fa-credit-card" />
                </span>
                Payment methods
              </a>
              <a
                href="#"
                className="relative hover:text-primary block capitalize transition"
              >
                voucher
              </a>
            </div>
            <div className="space-y-1 pl-8 pt-4">
              <a
                href="#"
                className="relative text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <i className="fa-regular fa-heart" />
                </span>
                My wishlist
              </a>
            </div>
            <div className="space-y-1 pl-8 pt-4">
              <a
                href="#"
                className="relative hover:text-primary block font-medium capitalize transition"
              >
                <span className="absolute -left-8 top-0 text-base">
                  <i className="fa-solid fa-right-from-bracket" />
                </span>
                Logout
              </a>
            </div>
          </div>
        </div> */}
        {/* ./sidebar */}
        {/* wishlist */}
        {shoppingCartItems.length === 0 ? (
          <div className="col-span-12 space-y-4">
            <div className="flex items-center justify-center border gap-6 p-4 border-gray-200 rounded">
              <div className="w-28">
                {/* <img
                  src="../assets/images/empty-cart.png"
                  alt="product 6"
                  className="w-full"
                /> */}
              </div>
              <div className="w-1/3">
                <h2 className="text-gray-800 text-xl font-medium uppercase">
                  Your cart is empty
                </h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-12 space-y-4">
            {shoppingCartItems.map((item) => {
              return (
                <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                  <div className="w-28">
                    <img
                      src={
                        item.furniter.images[item.furniter.images.length - 1]
                          .url
                      }
                      alt="product 6"
                      className="w-full"
                    />
                  </div>
                  <div className="w-1/3">
                    <h2 className="text-gray-800 text-xl font-medium uppercase">
                      {item.furniter.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      Availability:{" "}
                      {item.furniter.stock > 0 ? (
                        <span className="text-green-600">
                          In Stock {item.furniter.stock}{" "}
                        </span>
                      ) : (
                        <span className="text-red-600">
                          Out of Stock {item.furniter.stock}{" "}
                        </span>
                      )}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Amount: {item.amount}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Unit Price: $ {item.furniter[role.toLowerCase()]}{" "}
                    </p>
                  </div>
                  <div className="text-primary text-lg font-semibold">
                    $ {item.furniter[role.toLowerCase()] * item.amount}{" "}
                  </div>
                  {/* <a
                  href="#"
                  className="cursor-not-allowed px-6 py-2 text-center text-sm text-white bg-red-400 border border-red-400 rounded transition uppercase font-roboto font-medium"
                >
                  add to cart
                </a> */}
                  <div className="text-gray-600 cursor-pointer hover:text-primary">
                    <i className="fa-solid fa-trash" />
                  </div>
                </div>
              );
            })}

            {shoppingCartItems.length > 0 && (
              <Link
                href="/cart/checkout"
                className="block w-full py-1 text-center cursor-pointer text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              >
                Proceed to checkout
              </Link>
            )}
          </div>
        )}
        {/* ./wishlist */}
      </div>
      {/* ./wrapper */}
    </>
  );
};

export default index;
