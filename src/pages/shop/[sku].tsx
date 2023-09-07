import React, { useContext, useEffect } from "react";
import { IFurnitureDB } from "../../interfaces/inventories";
import { useRouter } from "next/router";
import { GlobalContext } from "../../context/GlobalContext";
import Swal from "sweetalert2";
import CardFurniture from "../../components/CardFurniture";

const FurnitureDetail = () => {
  const [furniture, setFurniture] = React.useState<IFurnitureDB>();
  const [imageSelected, setImageSelected] = React.useState<string>("");
  const [furnitures, setFurnitures] = React.useState<IFurnitureDB[]>([]);

  const params = useRouter();
  const { setShoppingCartItems, shoppingCartItems, role, isLogged } =
    useContext(GlobalContext);

  const handleGetFurnitures = async () => {
    const reponseFurDB = await fetch(
      "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/furnitures?populate[0]=images&filters[$and][0][inventory][name][$eq]=Tonala",
      {
        method: "GET",
      }
    );

    const furnituresDB: IFurnitureDB[] = await (await reponseFurDB.json()).data;

    setFurnitures(furnituresDB);
  };

  const handleGetFurniture = async () => {
    const id = params.query.sku.toString().split(".")[1];

    const reponseFurDB = await fetch(
      `https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/furnitures/${id}?populate[0]=images&filters[$and][0][inventory][name][$eq]=Tonala`,
      {
        method: "GET",
      }
    );

    const furnitureDB: IFurnitureDB = await (await reponseFurDB.json()).data;

    setFurniture(furnitureDB);
    setImageSelected(furnitureDB.images[furnitureDB.images.length - 1].url);
  };

  useEffect(() => {
    handleGetFurniture();
    handleGetFurnitures();
  }, [params]);

  if (furniture == null) return <div>Loading...</div>;

  return (
    <>
      {/* product-detail */}
      <div className="container grid grid-cols-2 gap-6">
        <div>
          <img src={imageSelected} alt="product" className="w-full" />
          <div className="grid grid-cols-5 gap-4 mt-4">
            {furniture.images
              .filter((image) => image.url !== imageSelected)
              .map((image) => {
                return (
                  <img
                    src={image.url}
                    alt="product"
                    className="w-full cursor-pointer"
                    onClick={() => {
                      setImageSelected(image.url);
                    }}
                  />
                );
              })}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            {furniture.name}
            {/* <br />
            {furniture.sku} */}
          </h2>
          <div className="flex items-center mb-4">
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
            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
          </div>
          <div className="space-y-2">
            {isLogged && (
              <p className="text-gray-800 font-semibold space-x-2">
                <span>Availability: </span>
                {furniture.stock > 0 ? (
                  <span className="text-green-600">
                    In Stock {furniture.stock}{" "}
                  </span>
                ) : (
                  <span className="text-red-600">
                    Out of Stock {furniture.stock}{" "}
                  </span>
                )}
              </p>
            )}
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">Apex</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">Sofa</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600"> {furniture.sku} </span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            {isLogged && (
              <p className="text-xl text-primary font-semibold">
                $ {furniture[role]}
              </p>
            )}
            {/* <p className="text-base text-gray-400 line-through">$55.00</p> */}
          </div>
          <p className="mt-4 text-gray-600">{furniture.description}</p>
          {/* <div className="pt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Size</h3>
            <div className="flex items-center gap-2">
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-xs"
                  className="hidden"
                />
                <label
                  htmlFor="size-xs"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  XS
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-sm"
                  className="hidden"
                />
                <label
                  htmlFor="size-sm"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  S
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-m"
                  className="hidden"
                />
                <label
                  htmlFor="size-m"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  M
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-l"
                  className="hidden"
                />
                <label
                  htmlFor="size-l"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  L
                </label>
              </div>
              <div className="size-selector">
                <input
                  type="radio"
                  name="size"
                  id="size-xl"
                  className="hidden"
                />
                <label
                  htmlFor="size-xl"
                  className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                >
                  XL
                </label>
              </div>
            </div>
          </div> */}
          {/* <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Color
            </h3>
            <div className="flex items-center gap-2">
              <div className="color-selector">
                <input type="radio" name="color" id="red" className="hidden" />
                <label
                  htmlFor="red"
                  className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                  style={{ backgroundColor: "#fc3d57" }}
                />
              </div>
              <div className="color-selector">
                <input
                  type="radio"
                  name="color"
                  id="black"
                  className="hidden"
                />
                <label
                  htmlFor="black"
                  className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                  style={{ backgroundColor: "#000" }}
                />
              </div>
              <div className="color-selector">
                <input
                  type="radio"
                  name="color"
                  id="white"
                  className="hidden"
                />
                <label
                  htmlFor="white"
                  className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                  style={{ backgroundColor: "#fff" }}
                />
              </div>
            </div>
          </div> */}
          {isLogged && (
            <div className="mt-4">
              <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
              <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>
            </div>
          )}
          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            {isLogged && (
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
                className="bg-primary border border-primary cursor-pointer text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
              >
                <i className="fa-solid fa-bag-shopping" /> Add to cart
              </div>
            )}
            {/* <a
              href="#"
              className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
            >
              <i className="fa-solid fa-heart" /> Wishlist
            </a> */}
          </div>
          {/* <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i className="fa-brands fa-twitter" />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
            >
              <i className="fa-brands fa-instagram" />
            </a>
          </div> */}
        </div>
      </div>
      {/* ./product-detail */}
      {/* description */}
      <div className="container pb-16">
        <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
          Product details
        </h3>
        <div className="w-3/5 pt-6">
          {/* <div className="text-gray-600">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              necessitatibus deleniti natus dolore cum maiores suscipit optio
              itaque voluptatibus veritatis tempora iste facilis non aut
              sapiente dolor quisquam, ex ab.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              quae accusantium voluptatem blanditiis sapiente voluptatum. Autem
              ab, dolorum assumenda earum veniam eius illo fugiat possimus illum
              dolor totam, ducimus excepturi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              quia modi ut expedita! Iure molestiae labore cumque nobis quasi
              fuga, quibusdam rem? Temporibus consectetur corrupti rerum
              veritatis numquam labore amet.
            </p>
          </div> */}
          <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
            <tbody>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Color
                </th>
                <th className="py-2 px-4 border border-gray-300">
                  Blank, Brown, Red
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Material
                </th>
                <th className="py-2 px-4 border border-gray-300">Latex</th>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Dimension
                </th>
                <th className="py-2 px-4 border border-gray-300">
                  {`${furniture.width}W x ${furniture.high}H x ${furniture.long}D "`}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* ./description */}
      {/* related product */}
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Related products
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {furnitures
            .filter((furnitureLocal) => furnitureLocal.sku !== furniture.sku)
            .map((furnitureLocal) => {
              return (
                <CardFurniture
                  furniture={furnitureLocal}
                  key={furnitureLocal.id}
                />
              );
            })}
        </div>
      </div>
      {/* ./related product */}
    </>
  );
};

export default FurnitureDetail;
