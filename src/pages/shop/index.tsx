import React, { useContext, useEffect } from "react";
import FiltersShop from "../../components/FiltersShop";
import { IFurnitureDB } from "../../interfaces/inventories";
import Link from "next/link";
import { GlobalContext } from "../../context/GlobalContext";
import Swal from "sweetalert2";
import CardFurniture from "../../components/CardFurniture";
import { useRouter } from "next/router";

const index = () => {
  const [furnitures, setFurnitures] = React.useState<IFurnitureDB[]>([]);

  const { setShoppingCartItems, shoppingCartItems } = useContext(GlobalContext);
  const router = useRouter();

  const handleGetFurnitures = async () => {
    const reponseFurDB = await fetch(
      "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/furnitures?populate[0]=images&populate[1]=categories",
      {
        method: "GET",
      }
    );

    const furnituresDB: IFurnitureDB[] = await (await reponseFurDB.json()).data;

    setFurnitures(furnituresDB);
  };

  useEffect(() => {
    handleGetFurnitures();
  }, []);

  return (
    <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
      {/* sidebar */}
      {/* drawer init and toggle */}

      {/* drawer component */}
      <FiltersShop />
      {/* ./sidebar */}

      {/* products */}
      <div className="col-span-3">
        <div className="flex items-center mb-4">
          <select
            name="sort"
            id="sort"
            className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
          >
            <option value="">Default sorting</option>
            <option value="price-low-to-high">Price low to high</option>
            <option value="price-high-to-low">Price high to low</option>
            <option value="latest">Latest product</option>
          </select>
          <div className="flex gap-2 ml-auto">
            <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
              <i className="fa-solid fa-grip-vertical" />
            </div>
            <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
              <i className="fa-solid fa-list" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
          {furnitures
            .filter((furniture) => {
              const keys = Object.keys(router.query);
              const cats = furniture.categories.map((cat) => cat.name);
              let isIncludesArray: boolean[] = [];

              if (keys.length === 0) return true;

              keys.forEach((key) => {
                if (cats.includes(key)) {
                  isIncludesArray.push(true);
                } else {
                  isIncludesArray.push(false);
                }
              });

              return !isIncludesArray.includes(false);
            })
            .map((furniture) => {
              return <CardFurniture furniture={furniture} key={furniture.id} />;
            })}
        </div>
      </div>
      {/* ./products */}
    </div>
  );
};

export default index;
