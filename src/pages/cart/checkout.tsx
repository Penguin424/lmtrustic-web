"use-client";

import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Button } from "antd";

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { IStripeResponse } from "../../interfaces/cart";
import { User } from "../../interfaces/login";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const checkout = () => {
  const [isloading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    cp: "",
    country: "",
    references: "",
    city: "",
  });

  const { shoppingCartItems, role, setShoppingCartItems } =
    useContext(GlobalContext);

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setIsloading(true);

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      const responseStripe = await fetch(
        "https://api.stripe.com/v1/payment_intents",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",

            Authorization:
              "Bearer sk_test_51K4XvnGBECdG5Iyz8rwm64b65xAjeAFoYnoSVFqIgTU12ALBzfCaMyTN44397X1ANlafQ8nfMgqQFEKl69G9VniL003HXWIHUA",
          },
          body: `amount=${
            shoppingCartItems
              .map((item) => item.furniter[role.toLowerCase()] * item.amount)
              .reduce((a, b) => a + b, 0) * 100
          }&currency=usd&payment_method_types[]=card`,
        }
      );

      const striperes: IStripeResponse = await responseStripe.json();

      await stripe.confirmCardPayment(striperes.client_secret, {
        payment_method: paymentMethod.id,
      });

      const user: User = JSON.parse(sessionStorage.getItem("user"));

      const responseOrder = await (
        await (
          await fetch(
            `https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/clients?filters[$and][0][mail][$eq]=${user.email}`,
            {
              method: "GET",
            }
          )
        ).json()
      ).data;

      let idClient: number;
      let salesDetails: number[] = [];

      if (responseOrder.length === 0) {
        const responseClient = await (
          await fetch(
            "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/clients",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: formData }),
            }
          )
        ).json();

        idClient = responseClient.data.id;
      } else {
        idClient = responseOrder[0].id;
      }

      for (const item of shoppingCartItems) {
        await fetch(
          `https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/furnitures/${item.furniter.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                stock: item.furniter.stock - item.amount,
                paragraphs: item.furniter.paragraphs + item.amount,
              },
            }),
          }
        );

        const response = await (
          await fetch(
            "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/saledetails",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                data: {
                  furniture: item.furniter.id,
                  amount: item.amount,
                  total: item.furniter[role.toLowerCase()] * item.amount,
                  subtotal: item.furniter[role.toLowerCase()] * item.amount,
                },
              }),
            }
          )
        ).json();

        salesDetails.push(response.data.id);
      }

      const responseSale = await (
        await fetch(
          `https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/sales`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: {
                client: idClient,
                total: shoppingCartItems
                  .map(
                    (item) => item.furniter[role.toLowerCase()] * item.amount
                  )
                  .reduce((a, b) => a + b, 0),
                subtotal: shoppingCartItems
                  .map(
                    (item) => item.furniter[role.toLowerCase()] * item.amount
                  )
                  .reduce((a, b) => a + b, 0),
                saledetails: salesDetails,
                datedelivery: new Date().toISOString(),
                status: "paying",
              },
            }),
          }
        )
      ).json();

      await Swal.fire({
        icon: "success",
        title: "Your order has been placed ID" + responseSale.data.id + "SL",
        showConfirmButton: false,
        timer: 1500,
      });

      setShoppingCartItems([]);
      setIsloading(false);

      router.push("/");
    } catch (error) {
      setIsloading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <>
      {/* wrapper */}

      <form
        onSubmit={handleSubmit}
        className="container grid grid-cols-1 md:grid-cols-12 items-start pb-16 pt-4 gap-6"
      >
        <div className="col-span-12 md:col-span-8 border border-gray-200 p-4 rounded">
          <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="text-gray-600">
                  First Name <span className="text-primary">*</span>
                </label>
                <input
                  required
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                  value={formData.name.split(" ")[0]}
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
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: formData.name + " " + e.target.value,
                    });
                  }}
                  value={formData.name.split(" ")[1]}
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
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                }}
                value={formData.phone}
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
                onChange={(e) => {
                  setFormData({ ...formData, street: e.target.value });
                }}
                value={formData.street}
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
                onChange={(e) => {
                  setFormData({ ...formData, cp: e.target.value });
                }}
                value={formData.cp}
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
                onChange={(e) => {
                  setFormData({ ...formData, city: e.target.value });
                }}
                value={formData.city}
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
                onChange={(e) => {
                  setFormData({ ...formData, country: e.target.value });
                }}
                value={formData.country}
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
                onChange={(e) => {
                  setFormData({ ...formData, references: e.target.value });
                }}
                value={formData.references}
                type="text"
                name="references"
                id="references"
                className="input-box"
              />
            </div>

            <CardElement className="border border-gray-200 rounded p-4" />
          </div>
        </div>
        <div className=" col-span-12 md:col-span-4 border border-gray-200 p-4 rounded">
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
                      {role === null
                        ? item.furniter.retail
                        : item.furniter[role.toLowerCase()]}{" "}
                    </p>
                  </div>
                  <p className="text-gray-600">x{item.amount}</p>
                  <p className="text-gray-800 font-medium">
                    $
                    {role === null
                      ? item.furniter.retail * item.amount
                      : item.furniter[role.toLowerCase()] * item.amount}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
            <p>subtotal</p>
            <p>
              $
              {role === null
                ? shoppingCartItems
                    .map((item) => item.furniter.retail * item.amount)
                    .reduce((a, b) => a + b, 0)
                : shoppingCartItems
                    .map(
                      (item) => item.furniter[role.toLowerCase()] * item.amount
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
              {role === null
                ? shoppingCartItems
                    .map((item) => item.furniter.retail * item.amount)
                    .reduce((a, b) => a + b, 0)
                : shoppingCartItems
                    .map(
                      (item) => item.furniter[role.toLowerCase()] * item.amount
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
          <Button
            loading={isloading}
            htmlType="submit"
            type="primary"
            className="flex items-center justify-center w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
          >
            Submit order
          </Button>
        </div>
      </form>

      {/* ./wrapper */}
    </>
  );
};

export default checkout;
