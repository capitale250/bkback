import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';



class Authentication {
  async checkToken(req: Request, res: Response, next:NextFunction) {
    const token:any = req.header("x-auth-token");
    if (!token) {
        res.status(401).send( "No token provided! Provide token and try again");
    }
    try {
        const secret:any = process.env.JWT_TOKEN;
      const decoded = jwt.verify(token, secret);
      req.body.userEmail = decoded;
      return next();
    } catch (err) {
        res.status(401).send( "Invalid token provided, check your token please");     
    }
  }
  async isTokenExpired(token: string) {
    try {
        const JWT_SECRET:any = process.env.JWT_TOKEN;

      const decoded = jwt.verify(token, JWT_SECRET) as { exp: number };
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTimeInSeconds;
    } catch (error) {
      return true;
    }
  };
}