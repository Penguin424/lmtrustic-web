import { useEffect, useState } from "react";
import { IFurnitureDB } from "../interfaces/inventories";
import CardFurniture from "../components/CardFurniture";
import banner1 from "../assets/images/banner1.jpg";
import llamadas from "../assets/images/llamadas.jpg";
import dinero from "../assets/images/dinero.jpg";
import camion from "../assets/images/camion.jpg";
import oferta from "../assets/images/oferta.jpg";
import { ICategoryDB } from "../interfaces/category";

export default function Home() {
  const [furnitures, setFurnitures] = useState<IFurnitureDB[]>([]);
  const [categories, setCategories] = useState<ICategoryDB[]>([]);

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

  const handleGetFurnitures = async () => {
    const reponseFurDB = await fetch(
      "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/furnitures?populate[0]=images",
      {
        method: "GET",
      }
    );

    const furnituresDB: IFurnitureDB[] = await (await reponseFurDB.json()).data;

    setFurnitures(furnituresDB);
  };

  useEffect(() => {
    handleGetFurnitures();
    handleGetCategories();
  }, []);

  return (
    <>
      {/* banner */}
      <img src={banner1.src} alt="banner" className="w-full" />
      {/* <div
        className="bg-cover bg-no-repeat py-36"
        style={{ backgroundImage: `url("${banner1.src}")` }}
      >
        <div className="container absolute top-1">
          <h1 className="text-6xl text-white font-medium mb-4 capitalize">
            best collection for <br />
            home decoration
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            <br />
            accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
            odio
          </p>
          <div className="mt-12 ">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div> */}
      {/* ./banner */}

      {/* features */}
      <div className="container py-16">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
          <div
            style={{
              backgroundImage: `url("${camion.src}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="rounded-sm px-3 py-6 flex justify-center items-center gap-5 h-64"
          >
            <div>
              <h4 className="font-medium text-white capitalize text-5xl text-center">
                Free Shipping
              </h4>
              <p className="text-white opacity-90 text-xl text-center">
                Order over $200
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url("${dinero.src}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="rounded-sm px-3 py-6 flex justify-center items-center gap-5 h-64"
          >
            {/* <img
              src={dinero.src}
              alt="Delivery"
              className="w-12 h-12 object-contain"
            /> */}
            <div>
              <h4 className="font-medium text-white capitalize text-5xl text-center">
                Money Rturns
              </h4>
              <p className="text-white opacity-90 text-xl text-center">
                30 days money returs
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url("${llamadas.src}")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            className="rounded-sm px-3 py-6 flex justify-center items-center gap-5 h-64"
          >
            {/* <img
              src={llamadas.src}
              alt="Delivery"
              className="w-12 h-12 object-contain"
            /> */}
            <div>
              <h4 className="font-medium text-white capitalize text-5xl text-center">
                24/7 Support
              </h4>
              <p className="text-white opacity-90 text-xl text-center">
                Customer support
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ./features */}

      {/* categories */}
      <div className="container py-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          shop by category
        </h2>

        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => {
            return (
              <div className="relative rounded-sm overflow-hidden group">
                <img
                  src={category.image[0].url}
                  alt="category 1"
                  className="w-full"
                />
                <a
                  href="#"
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
                >
                  {category.name}
                </a>
              </div>
            );
          })}
        </div>
      </div>
      {/* ./categories */}

      {/* new arrival */}
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          top new arrival
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {furnitures.map((furniture) => {
            return <CardFurniture furniture={furniture} />;
          })}
        </div>
      </div>
      {/* ./new arrival */}

      {/* ads */}
      <div className="container pb-16">
        <a href="#">
          <img src={oferta.src} alt="ads" className="w-full" />
        </a>
      </div>
      {/* ./ads */}

      {/* product */}
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          recomended for you
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {furnitures.map((furniture) => {
            return <CardFurniture furniture={furniture} />;
          })}
        </div>
      </div>
      {/* ./product */}
    </>
  );
}
