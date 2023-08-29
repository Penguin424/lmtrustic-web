import React, { useContext } from "react";
import { IFurnitureDB } from "../interfaces/inventories";
import Link from "next/link";
import Swal from "sweetalert2";
import { GlobalContext } from "../context/GlobalContext";

interface IPropsCardFurniture {
  furniture: IFurnitureDB;
}

const CardFurniture = ({ furniture }: IPropsCardFurniture) => {
  const { setShoppingCartItems, shoppingCartItems } = useContext(GlobalContext);

  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <img
          src={furniture.images[furniture.images.length - 1].url}
          alt="product 1"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
          <Link
            href={`/shop/${furniture.sku}.${furniture.id}`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <i className="fa-solid fa-magnifying-glass" />
          </Link>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <a href="#">
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
            {furniture.name}
          </h4>
        </a>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            $
            {localStorage.getItem("role") === null
              ? furniture.retail
              : furniture[localStorage.getItem("role").toLowerCase()]}
          </p>
          {/* <p className="text-sm text-gray-400 line-through">$55.90</p> */}
        </div>
        <div className="flex items-center">
          <div className="flex gap-1 text-sm text-yellow-400">
            <span>
              <i className="fa-solid fa-star" />
            </span>
            <span>
              <i className="fa-solid fa-star" />
            </span>
            <span>
              <i className="fa-solid fa-star" />
            </span>
            <span>
              <i className="fa-solid fa-star" />
            </span>
            <span>
              <i className="fa-solid fa-star" />
            </span>
          </div>
          <div className="text-xs text-gray-500 ml-3">({furniture.stock})</div>
        </div>
      </div>
      <div
        onClick={() => {
          const isExist = shoppingCartItems.find(
            (item) => item.furniter.id === furniture.id
          );

          if (isExist) {
            if (isExist.furniter.stock < isExist.amount + 1) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Out of stock",
              });

              return;
            }

            setShoppingCartItems((prev) => {
              return prev.map((item) => {
                if (item.furniter.id === furniture.id) {
                  return {
                    ...item,
                    amount: item.amount + 1,
                  };
                } else {
                  return item;
                }
              });
            });
          } else {
            if (furniture.stock < 1) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Out of stock",
              });
              return;
            }

            setShoppingCartItems((prev) => {
              return [
                ...prev,
                {
                  furniter: furniture,
                  amount: 1,
                },
              ];
            });
          }
        }}
        className="block w-full py-1 text-center cursor-pointer text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
      >
        Add to cart
      </div>
    </div>
  );
};

export default CardFurniture;
