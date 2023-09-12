import React, { useContext, useEffect, useState } from "react";
import { IProfileDate, ISaleDB } from "../interfaces/sales";
import { GlobalContext } from "../context/GlobalContext";

const account = () => {
  const [sales, setSales] = useState<ISaleDB[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<IProfileDate>();

  const { role } = useContext(GlobalContext);

  useEffect(() => {
    handleGetSalesOfClient();
  }, []);

  const handleGetSalesOfClient = async () => {
    const response = await fetch(
      "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/users/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();

    const salesResponse = await fetch(
      `https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/sales?filters[$and][0][client][phone][$eq]=${data.phone}&populate[0]=saledetails&populate[1]=saledetails.furniture&populate[2]=saledetails.furniture.images&populate[3]=client`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    const salesData = await salesResponse.json();

    setSales(salesData.data);
    setProfileData(data);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">ACCOUNT/SALES</h1>

      <div className="container grid grid-cols-1 md:grid-cols-12 items-start pb-16 pt-4 gap-6">
        <div className="col-span-12 md:col-span-4 border border-gray-200 p-4 rounded">
          <div className="w-full  bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex justify-end px-4 pt-4">
              {/* <button
                onClick={() => setIsHidden(!isHidden)}
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className={`inline-block ${
                  !isHidden ? "hidden" : ""
                }  text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200  rounded-lg text-sm p-1.5`}
                type="button"
              >
                <span className="sr-only">Open dropdown</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button> */}

              <div
                id="dropdown"
                className={`z-10 ${
                  isHidden ? "hidden" : ""
                }  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
              >
                <ul className="py-2" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-10"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Export Data
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
                alt={profileData?.message.split("\n")[0].substring(0, 2)}
              />

              <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                {profileData?.message.split("\n")[0]}
              </h5>
              <span className="text-sm text-gray-500 ">
                {profileData?.email}
              </span>
              {/* <div className="flex mt-4 space-x-3 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Add friend
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
                >
                  Message
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 border border-gray-200 p-4 rounded">
          <h2 className="text-2xl font-bold">SHOPPING</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 items-start pb-16 pt-4 gap-6">
            {sales.map((sale) => {
              return (
                <div className=" grid-cols-2 md:grid-cols-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                  <a href="#">
                    <img
                      className="rounded-t-lg"
                      src={
                        sale.saledetails[0].furniture.images[
                          sale.saledetails[0].furniture.images.length - 1
                        ].url
                      }
                      alt={sale.saledetails[0].furniture.name}
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                        ORDER: {sale.id}SL
                        <br />
                        SKU: {sale.saledetails[0].furniture.sku}
                      </h5>
                    </a>

                    <h2>TOTAL ${sale.total}</h2>
                    <p className="mb-3 font-normal text-gray-700">
                      status: {sale.status}
                      <br />
                      bought the day:{" "}
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default account;
