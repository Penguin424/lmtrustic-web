import { Button, Form, Input, Select } from "antd";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import generator from "generate-password";

const contact = () => {
  const [form] = Form.useForm();

  return (
    <div className="grid  grid-cols-1 md:grid-cols-2 gap-4 container mt-5">
      <div className="col-span-2 md:col-span-1">
        <h2
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: "rgb(253 61 87)",
            fontSize: "2.5em",
            fontWeight: 700,
            lineHeight: "1.25",
            marginBottom: "16px",
            marginTop: "0px",
            textAlign: "left",
          }}
          className="uppercase"
        >
          LMT Imports
        </h2>
        <p id="contactUsPageText" />
        <h4>
          <span style={{ fontSize: "1.1em" }}>
            2920 N. State Highway 360, Suite 200,Grand Prairie, TX 75050
          </span>
          <br />
        </h4>
        <p>
          <span style={{ fontWeight: 700 }}>
            Hours of operation:&nbsp; Monday - Friday, from 8:30 am to 5:00
            pm.&nbsp;&nbsp;
          </span>
        </p>
        <p>
          <span style={{ fontWeight: 700 }}>972-641-6700</span>
        </p>
        <p>
          <span style={{ fontWeight: 700 }}>info@lmtrustic.com</span>
        </p>
        <p>
          <span style={{ fontWeight: 700 }}>
            <br />
          </span>
        </p>
        <h4
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: "rgb(51, 51, 51)",
          }}
        >
          Interested in becoming a Stocking Dealer?
        </h4>
        <h4
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            color: "rgb(51, 51, 51)",
          }}
        >
          <br />
        </h4>
        <p>
          We'd love to have your business as part of the LMT Imports
          family!&nbsp;{" "}
        </p>
        <p>
          To become an LMT Stocking Dealer, you must have a registered US
          business in the furniture/home decor industry and provide a valid
          FEIN.&nbsp; Once your application is submitted, please allow a few
          days for us to validate your information.&nbsp;&nbsp;
        </p>
        <ul></ul>
        <p>
          Click on{" "}
          <span style={{ fontWeight: "bold" }}>
            "BECOME A STOCKING DEALER"&nbsp;
          </span>
          below to get started today!
        </p>
        <Button
          className="mt-5"
          style={{
            backgroundColor: "rgb(253 61 87)",
            border: "1px solid rgb(253 61 87)",
            borderRadius: 4,
            color: "#ffffff",
            fontFamily: "sans-serif",
            fontSize: 13,
            fontWeight: "bold",

            textAlign: "center",
            height: "50px",
            textDecoration: "none",
            width: 200,
          }}
        >
          <Link href="/lmt-dealer-form">Become a Stocking Dealer</Link>
        </Button>

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
          className="grid grid-cols-2 gap-4 home-colform-form mt-32"
        >
          <h3
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              color: "rgb(253 61 87)",
              fontSize: "1.5em",
              fontWeight: 700,
              lineHeight: "1.25",
              marginBottom: "16px",
              marginTop: "0px",
              textAlign: "left",
            }}
            className="col-span-2"
          >
            Contact us directly:
          </h3>
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

          <div className="col-span-2">
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

        <h4
          id="contactUsAddressTitle"
          className="section-subheading text-muted mt-24"
        >
          General Inquiries
        </h4>
        <address id="contactUsAddress">
          <a
            target="_blank"
            href="http://maps.google.com/maps?q=2920 Highway 360 North 
Suite 200 
Grand Prairie, TX 75050
"
          >
            2920 Highway 360 North Suite 200 Grand Prairie, TX 75050
          </a>
        </address>
      </div>
      <div className="col-md-6">
        <div className="contact-img">
          <img
            id="contactUsPageImage"
            src="https://d28fw8vtnbt3jx.cloudfront.net/get_photo_signed/1/165582/1536/2048/103935/2ebbbf4673713d9d028306d89a513dbe9d2cc58566a6392/LMT%20Contact%20Picture.png"
            className="w-100"
            alt=""
            style={{
              backgroundImage:
                'url("https://d28fw8vtnbt3jx.cloudfront.net/get_photo_signed/1/165582/1536/2048/103935/2ebbbf4673713d9d028306d89a513dbe9d2cc58566a6392/LMT%20Contact%20Picture.png")',
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
};

export default contact;
