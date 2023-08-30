import Link from "next/link";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { ILoginDB } from "../interfaces/login";
import { useRouter } from "next/router";
import { GlobalContext } from "../context/GlobalContext";
import { Button } from "antd";

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { setRole } = useContext(GlobalContext);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const responseLogin = await fetch(
        "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/auth/local",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: dataForm.email,
            password: dataForm.password,
          }),
        }
      );

      let dataLoginSuccess: ILoginDB;
      const loginDB = await responseLogin.json();

      if (loginDB.error) {
        setIsLoading(false);
        return await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: loginDB.error.message,
        });
      }

      dataLoginSuccess = loginDB;

      localStorage.setItem("token", dataLoginSuccess.jwt);
      localStorage.setItem("user", JSON.stringify(dataLoginSuccess.user));

      const dataMe = await fetch(
        "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/users/me?populate[0]=role",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${dataLoginSuccess.jwt}`,
          },
        }
      );

      const me: {
        role: {
          name: string;
        };
      } = await dataMe.json();

      localStorage.setItem("role", me.role.name);
      setRole(me.role.name);

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login success",
      });

      setIsLoading(false);

      router.push("/");
    } catch (error) {
      setIsLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.error.message,
      });
    }
  };

  return (
    <>
      {/* login */}
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
          <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
          <form onSubmit={handleSubmitForm} method="post" autoComplete="off">
            <div className="space-y-2">
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email address
                </label>
                <input
                  required
                  onChange={(e) => {
                    setDataForm({ ...dataForm, email: e.target.value });
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="youremail.@domain.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="text-gray-600 mb-2 block">
                  Password
                </label>
                <input
                  required
                  onChange={(e) => {
                    setDataForm({ ...dataForm, password: e.target.value });
                  }}
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a href="#" className="text-primary">
                Forgot password
              </a>
            </div>
            <div className="mt-4">
              <Button
                loading={isLoading}
                htmlType="submit"
                className="flex items-center justify-center w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Login
              </Button>
            </div>
          </form>
          {/* login with */}
          {/* <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or login with
            </div>
            <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
          </div>
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
            >
              facebook
            </a>
            <a
              href="#"
              className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500"
            >
              google
            </a>
          </div> */}
          {/* ./login with */}
          <p className="mt-4 text-center text-gray-600">
            Don't have account?
            <Link href="/register" className="text-primary">
              Register now
            </Link>
          </p>
        </div>
      </div>
      {/* ./login */}
    </>
  );
};

export default Login;
