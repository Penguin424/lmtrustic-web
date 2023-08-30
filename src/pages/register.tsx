import Link from "next/link";
import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { ILoginDB } from "../interfaces/login";
import { useRouter } from "next/router";
import { Button } from "antd";
import { GlobalContext } from "../context/GlobalContext";

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: false,
    confirmPassword: "",
  });

  const router = useRouter();
  const { setRole } = useContext(GlobalContext);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (dataForm.password !== dataForm.confirmPassword) {
        return await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password and confirm password not match!",
        });
      }

      const responseRegister = await fetch(
        "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: dataForm.name,
            email: dataForm.email,
            password: dataForm.password,
          }),
        }
      );

      let dataRegisterSuccess: ILoginDB;
      const resgisterDB = await responseRegister.json();

      if (resgisterDB.error) {
        setIsLoading(false);
        return await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: resgisterDB.error.message,
        });
      }

      dataRegisterSuccess = resgisterDB;

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Register success",
      });

      localStorage.setItem("token", dataRegisterSuccess.jwt);
      localStorage.setItem("user", JSON.stringify(dataRegisterSuccess.user));
      localStorage.setItem("role", dataRegisterSuccess.user.role.name);

      setRole(dataRegisterSuccess.user.role.name);

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
          <h2 className="text-2xl uppercase font-medium mb-1">
            Create an account
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Register for new cosutumer
          </p>
          <form method="post" autoComplete="on" onSubmit={handleSubmitForm}>
            <div className="space-y-2">
              <div>
                <label htmlFor="name" className="text-gray-600 mb-2 block">
                  Full Name
                </label>
                <input
                  required
                  onChange={(e) =>
                    setDataForm({ ...dataForm, name: e.target.value })
                  }
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="fulan fulana"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-gray-600 mb-2 block">
                  Email address
                </label>
                <input
                  required
                  onChange={(e) =>
                    setDataForm({ ...dataForm, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setDataForm({ ...dataForm, password: e.target.value })
                  }
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
              </div>
              <div>
                <label htmlFor="confirm" className="text-gray-600 mb-2 block">
                  Confirm password
                </label>
                <input
                  required
                  onChange={(e) =>
                    setDataForm({
                      ...dataForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  type="password"
                  name="confirm"
                  id="confirm"
                  className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                  placeholder="*******"
                />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <input
                  required
                  onChange={(e) =>
                    setDataForm({ ...dataForm, confirm: e.target.checked })
                  }
                  type="checkbox"
                  name="aggrement"
                  id="aggrement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                />
                <label
                  htmlFor="aggrement"
                  className="text-gray-600 ml-3 cursor-pointer"
                >
                  I have read and agree to the
                  <a href="#" className="text-primary">
                    terms &amp; conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="mt-4">
              <Button
                htmlType="submit"
                loading={isLoading}
                className="flex items-center justify-center  w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                create account
              </Button>
            </div>
          </form>
          {/* login with */}
          {/* <div className="mt-6 flex justify-center relative">
            <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
              Or signup with
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
            Already have account?
            <Link href="/login" className="text-primary">
              Login now
            </Link>
          </p>
        </div>
      </div>
      {/* ./login */}
    </>
  );
};

export default Register;
