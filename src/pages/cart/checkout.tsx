"use-client";

import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const checkout = () => {
  const { shoppingCartItems } = useContext(GlobalContext);

  return (
    <>
      {/* wrapper */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submit");
        }}
        className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6"
      >
        <div className="col-span-8 border border-gray-200 p-4 rounded">
          <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="text-gray-600">
                  First Name <span className="text-primary">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="input-box"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="text-gray-600">
                  Last Name <span className="text-primary">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="input-box"
                />
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="text-gray-600">
                Phone number
              </label>
              <input
                required
                type="text"
                name="phone"
                id="phone"
                className="input-box"
              />
            </div>
            <div>
              <label htmlFor="address" className="text-gray-600">
                Street address
              </label>
              <input
                required
                type="text"
                name="address"
                id="address"
                className="input-box"
              />
            </div>

            <div>
              <label htmlFor="cp" className="text-gray-600">
                CP
              </label>
              <input
                required
                type="text"
                name="cp"
                id="cp"
                className="input-box"
              />
            </div>

            <div>
              <label htmlFor="city" className="text-gray-600">
                City
              </label>
              <input
                required
                type="text"
                name="city"
                id="city"
                className="input-box"
              />
            </div>

            <div>
              <label htmlFor="country" className="text-gray-600">
                Country/Region
              </label>
              <input
                required
                type="text"
                name="country"
                id="country"
                className="input-box"
              />
            </div>

            {/* <div>
              <label htmlFor="email" className="text-gray-600">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-box"
              />
            </div> */}

            <div>
              <label htmlFor="references" className="text-gray-600">
                References
              </label>
              <input
                required
                type="text"
                name="references"
                id="references"
                className="input-box"
              />
            </div>
          </div>
        </div>
        <div className="col-span-4 border border-gray-200 p-4 rounded">
          <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
            order summary
          </h4>
          <div className="space-y-2">
            {shoppingCartItems.map((item) => {
              return (
                <div className="flex justify-between">
                  <div>
                    <h5 className="text-gray-800 font-medium">
                      {item.furniter.name}
                    </h5>
                    <p className="text-sm text-gray-600">
                      Unit price: $
                      {localStorage.getItem("role") === null
                        ? item.furniter.retail
                        : item.furniter[
                            localStorage.getItem("role").toLowerCase()
                          ]}{" "}
                    </p>
                  </div>
                  <p className="text-gray-600">x{item.amount}</p>
                  <p className="text-gray-800 font-medium">
                    $
                    {localStorage.getItem("role") === null
                      ? item.furniter.retail * item.amount
                      : item.furniter[
                          localStorage.getItem("role").toLowerCase()
                        ] * item.amount}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>subtotal</p>
            <p>
              $
              {localStorage.getItem("role") === null
                ? shoppingCartItems
                    .map((item) => item.furniter.retail * item.amount)
                    .reduce((a, b) => a + b, 0)
                : shoppingCartItems
                    .map(
                      (item) =>
                        item.furniter[
                          localStorage.getItem("role").toLowerCase()
                        ] * item.amount
                    )
                    .reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>shipping</p>
            <p>Free</p>
          </div>
          <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
            <p className="font-semibold">Total</p>
            <p>
              $
              {localStorage.getItem("role") === null
                ? shoppingCartItems
                    .map((item) => item.furniter.retail * item.amount)
                    .reduce((a, b) => a + b, 0)
                : shoppingCartItems
                    .map(
                      (item) =>
                        item.furniter[
                          localStorage.getItem("role").toLowerCase()
                        ] * item.amount
                    )
                    .reduce((a, b) => a + b, 0)}
            </p>
          </div>
          <div className="flex items-center mb-4 mt-2">
            <input
              type="checkbox"
              name="aggrement"
              id="aggrement"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
            />
            <label
              htmlFor="aggrement"
              className="text-gray-600 ml-3 cursor-pointer text-sm"
            >
              I agree to the
              <a href="#" className="text-primary">
                terms &amp; conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          >
            Submit order
          </button>
        </div>
      </form>
      {/* ./wrapper */}
    </>
  );
};

export default checkout;
