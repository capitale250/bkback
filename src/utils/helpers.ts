import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class Helpers {

  tokenGenerator(info:any) {
    try {
    const options = { expiresIn: "24h" };

      const payload = {
        email: info.email,
        userid:info._id,
        info
      };
      const secret:any = process.env.JWT_TOKEN;
      const token = jwt.sign(payload, secret, options);
      return token;
    } catch (err) {
      console.log(err)
      return err;
    }
  }


  async hashPassword(password:string) {
    try {
      var salt = await bcrypt.genSalt(10);
      var passHash = await bcrypt.hash(password, salt);
      console.log(passHash, "password");
      return passHash;
    } catch (err) {
      return err;
    }
  }

}
export default new Helpers();
