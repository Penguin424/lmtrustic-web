// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nodeMailer from "nodemailer";

export default (req, res) => {
  const data: {
    username: string;
    email: string;
    password: string;
    pass: string;
    messsage: string;
    phone: string;
  } = req.body;

  console.log(data);

  const transponer = nodeMailer.createTransport({
    host: "mail.arkanadesignstudio.com",
    port: 465,
    secure: true,
    auth: {
      user: "pablo.rizo@arkanadesignstudio.com",
      pass: "Ac03901582",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  transponer.sendMail({
    from: "Pablo Rizo <pablo.rizo@arkanadesignstudio.com>",
    to: data.email,
    subject: "LMT Contact",
    html: `
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #ffffff;
                color: #fff;
                text-align: center;
                padding: 20px;
            }
            .logo {
                max-width: 250px;
                height: auto;
                display: block;
                margin: 0 auto;
            }
            .content {
                padding: 20px;
            }
            .button {
                background-color: #fd3d57;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img class="logo" src="https://lmtrustic-web.web.app/_next/static/media/logo-azul.61b4b31c.png" alt="LMTrustic Logo">
                <h1>Welcome to LMTrustic</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>Your verification process has started in a moment we will send your login credentials</p>
                <p>If you have any questions or need further assistance, please don't hesitate to contact us at <a href="mailto:TUCORREO@EJEMPLO.COM">TUCORREO@EJEMPLO.COM</a>.</p>
                <p>Thank you for choosing LMTrustic!</p>
            </div>
        </div>
    </body>
    </html>
    `,
  });

  res.status(200).json({ name: "John Doe" });
};
