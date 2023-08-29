import { createContext, useEffect, useState } from "react";
import { ICartShopItem } from "../interfaces/cart";
import NavBar from "../components/navbar";

interface IGlobalContext {
  shoppingCartItems: ICartShopItem[];
  setShoppingCartItems: React.Dispatch<React.SetStateAction<ICartShopItem[]>>;
}

export const GlobalContext = createContext({
  shoppingCartItems: [],
  setShoppingCartItems: () => {},
} as IGlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [shoppingCartItems, setShoppingCartItems] = useState<ICartShopItem[]>(
    []
  );

  const handleGetRole = async () => {
    let token = localStorage.getItem("token");

    if (token !== null) {
      const dataMe = await fetch(
        "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/users/me?populate[0]=role",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const me: {
        role: {
          name: string;
        };
      } = await dataMe.json();

      localStorage.setItem("role", me.role.name);
    }
  };

  useEffect(() => {
    handleGetRole();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        shoppingCartItems: shoppingCartItems,
        setShoppingCartItems: setShoppingCartItems,
      }}
    >
      <NavBar>{children}</NavBar>
    </GlobalContext.Provider>
  );
};
