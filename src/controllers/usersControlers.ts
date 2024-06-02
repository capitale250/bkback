import helpers from "../utils/helpers";
import bcrypt from "bcrypt";


import { Request, Response } from 'express';
import { Farmer } from '../models/Farmer';


class UsersController {
  static async login(req: Request, res: Response){
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send("Fill all required fields please");
     const user = await Farmer.findOne({email}).exec()
      if (!user) {
        return res.status(401).send("Wrong username or password");
      }
      const compare = await bcrypt.compare(password, user.pass);
      if (!compare) return res.status(401).send("Wrong username or password");
      const token = await helpers.tokenGenerator(user);
      return res.status(200).send( token);
    } catch (err) {
      console.log("Error debug " + err);
      return res.status(500).send(err);
    }
  }

  static async userRegistration(req: Request, res: Response) {
    try {
      const { email, password,landSize } = req.body;
      const user = await Farmer.findOne({email}).exec()
      if (!email || !password || !landSize)
        return res.status(400).send("Fill all required fields please");
      if (user)
        return res.status(400).send("user allready exists");
      const role="farmer"
      const pass = await helpers.hashPassword(password);
      const farmer = new Farmer({
        email,
        pass,
        role,
        landSize
      });
      await farmer.save();
      return res.status(201).send(farmer);
    } catch (err) {
        console.log(err)
        return res.status(409).send( "error occured");
   
    }
  }

}
export default UsersController;
