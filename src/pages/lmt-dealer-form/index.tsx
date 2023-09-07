import { Button, Form, Input, Select } from "antd";
import React from "react";
import logonegro from "../../assets/images/logo-azul.png";
import Swal from "sweetalert2";
import generator from "generate-password";

const arraysWhitAllStatesOfEUA = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const index = () => {
  const [form] = Form.useForm();

  return (
    <div
      className="  "
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <div
        style={{
          // backgroundColor: "white",

          // maxHeight: "100vh",
          overflowY: "hidden",
          width: "100%",
          padding: "2%",
        }}
      >
        <div
          style={{
            borderRadius: "20px",
            height: "100%",
            backgroundColor: "white",
            width: "100%",
          }}
          className="container-fluid form-home-container"
        >
          <div className="row grid home-colform-container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(155, 155, 155, 0.2)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
              className="col-md-12"
            >
              <img
                width="40%"
                className="m-2"
                src={logonegro.src}
                alt=""
                style={{
                  zIndex: 2,
                }}
              />
            </div>
            <div className="w-full p-20">
              <Form
                form={form}
                onFinish={async (e) => {
                  try {
                    const password = generator.generate({
                      length: 16,
                      numbers: true,
                    });

                    await fetch(
                      "https://lmtrustic-backend-b50f8f037af7.herokuapp.com/api/auth/local/register",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          username: e.email.split("@")[0],
                          email: e.email,
                          password: password,
                          pass: password,
                          message: `${e.nombre} ${e.apellido} \n${e.mensaje}`,
                          phone: e.telefono,
                          company: e.companyname,
                          street: e.Street,
                          city: e.City,
                          state: e.State,
                          zip: e.Zip,
                          taxid: e.taxid,
                          typeofbusiness: e.typeofbusiness,
                        }),
                      }
                    );

                    await fetch("api/hello", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        username: e.email.split("@")[0],
                        email: e.email,
                        password: "password",
                        pass: "password",
                        message: `${e.nombre} ${e.apellido} \n${e.mensaje}`,
                        phone: e.telefono,
                      }),
                    });

                    await Swal.fire({
                      icon: "success",
                      title: "Tanks for contact us",
                      text: "We will contact you soon",
                    });

                    form.resetFields();
                  } catch (error) {
                    await Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Something went wrong!",
                    });
                  }
                }}
                layout="vertical"
                className="grid grid-cols-2 gap-4 home-colform-form"
              >
                <div className="col-md-6">
                  <Form.Item
                    name="nombre"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required",
                      },
                    ]}
                  >
                    <Input placeholder="First name" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="apellido"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Last Name is required",
                      },
                    ]}
                  >
                    <Input placeholder="Last name" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Email is required",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="telefono"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: "Phone is required",
                      },
                    ]}
                  >
                    <Input placeholder="Phone" />
                  </Form.Item>
                </div>
                <div className="col-md-6">
                  <Form.Item
                    name="companyname"
                    label="Company Name"
                    rules={[
                      {
                        required: true,
                        message: "Company Name is required",
                      },
                    ]}
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="Street"
                    label="Street"
                    rules={[
                      {
                        required: true,
                        message: "Street is required",
                      },
                    ]}
                  >
                    <Input placeholder="Street" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="City"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "City is required",
                      },
                    ]}
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="State"
                    label="State"
                    rules={[
                      {
                        required: true,
                        message: "State is required",
                      },
                    ]}
                  >
                    <Select placeholder="State">
                      {arraysWhitAllStatesOfEUA.map((e) => (
                        <Select.Option value={e}>{e}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="Zip"
                    label="Zip"
                    rules={[
                      {
                        required: true,
                        message: "Zip is required",
                      },
                    ]}
                  >
                    <Input placeholder="Zip" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="taxid"
                    label="Fed Tax ID#"
                    rules={[
                      {
                        required: true,
                        message: "Fed Tax ID# is required",
                      },
                    ]}
                  >
                    <Input placeholder="Fed Tax ID#" />
                  </Form.Item>
                </div>

                <div className="col-md-6">
                  <Form.Item
                    name="typeofbusiness"
                    label="Type of Business"
                    rules={[
                      {
                        required: true,
                        message: "Type of Business is required",
                      },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Designer/Decorator">
                        Designer/Decorator
                      </Select.Option>
                      <Select.Option value="Retailer">
                        Retail Store Front
                      </Select.Option>
                      <Select.Option value="Individual">
                        Individual
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className="">
                  <Form.Item
                    name="mensaje"
                    label="Message"
                    rules={[
                      {
                        required: true,
                        message: "Message is required",
                      },
                    ]}
                  >
                    <Input.TextArea rows={6} placeholder="Message" />
                  </Form.Item>
                </div>

                <div className="col-span-2">
                  <Button
                    style={{
                      backgroundColor: "rgb(253 61 87)",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                    }}
                    htmlType="submit"
                    block
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
