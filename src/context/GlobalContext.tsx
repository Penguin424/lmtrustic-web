import { createContext, useEffect, useState } from "react";
import { ICartShopItem } from "../interfaces/cart";
import NavBar from "../components/navbar";

interface IGlobalContext {
  shoppingCartItems: ICartShopItem[];
  setShoppingCartItems: React.Dispatch<React.SetStateAction<ICartShopItem[]>>;
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext({
  shoppingCartItems: [],
  setShoppingCartItems: () => {},
  role: "retail",
  setRole: () => {},
  isLogged: false,
  setIsLogged: () => {},
} as IGlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [shoppingCartItems, setShoppingCartItems] = useState<ICartShopItem[]>(
    []
  );
  const [role, setRole] = useState<string>("retail");
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const handleGetRole = async () => {
    let token = sessionStorage.getItem("token");

    if (token !== null) {
      const dataMe = await fetch(
        "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/users/me?populate[0]=role",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const me: {
        role: {
          name: string;
        };
      } = await dataMe.json();

      setRole(me.role.name);
      setIsLogged(true);
    } else {
      setRole("retail");
      setIsLogged(false);
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
        isLogged: isLogged,
        setIsLogged: setIsLogged,
      }}
    >
      <NavBar>{children}</NavBar>
    </GlobalContext.Provider>
  );
};
