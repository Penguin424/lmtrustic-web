import { createContext, useEffect, useState } from "react";
import { ICartShopItem } from "../interfaces/cart";
import NavBar from "../components/navbar";

interface IGlobalContext {
  shoppingCartItems: ICartShopItem[];
  setShoppingCartItems: React.Dispatch<React.SetStateAction<ICartShopItem[]>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext({
  shoppingCartItems: [],
  setShoppingCartItems: () => {},
  role: "retail",
  setRole: () => {},
} as IGlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [shoppingCartItems, setShoppingCartItems] = useState<ICartShopItem[]>(
    []
  );
  const [role, setRole] = useState<string>("retail");

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

      setRole(me.role.name);
    } else {
      setRole("retail");
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
        role: role,
        setRole: setRole,
      }}
    >
      <NavBar>{children}</NavBar>
    </GlobalContext.Provider>
  );
};
