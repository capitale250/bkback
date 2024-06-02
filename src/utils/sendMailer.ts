import nodemailer from "nodemailer";
import ejs from "ejs";

class SendNotification {
  async sendEmail(reciever:any,data:any) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // port: 465,
        // secure: false,
        auth: {
          user: process.env.MAILERUSER,
          pass: process.env.MAILERPASS,
        },
      });
      const html = ejs.render(`
              <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

              <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
              <head>
              <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
              <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
              <meta content="width=device-width" name="viewport"/>
              <!--[if !mso]><!-->
              <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
              <!--<![endif]-->
              <title></title>
              <!--[if !mso]><!-->
              <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
              <!--<![endif]-->
              <style type="text/css">
                body {
                  margin: 0;
                  padding: 0;
                }

                table,
                td,
                tr {
                  border-collapse: collapse;
                }

                td {
                  padding: 5px;
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                }

                th {
                  padding: 5px;
                  text-align: left;
                  border-bottom: 2px solid #ddd;
                  background-color: #f2f2f2;
                }
              </style>
              </head>
              <body>

              <p>your order is changed <%= data %> </p>
         </body>
              </html>
      `, { data: data });

      const mailOptions = {
        from: `${process.env.MAILERUSER}`,
        to: reciever,
        subject: "order details",
        html,
      };
       transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
			console.log("Mailer Error occured", err);
		} else {
			console.log("Message sent", info);
			transporter.close();
		}
      });
    } catch (err) {
      return err;
    }
  }
}

export default new SendNotification();
