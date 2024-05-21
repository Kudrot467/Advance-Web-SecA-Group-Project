// typings/express.d.ts

declare namespace Express {
    interface Request {
      user?: any; // You can replace 'any' with the type of your user object if you have one
    }
  }
  