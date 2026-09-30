declare global {
  namespace Express {
    interface Request {
      user: {
        dni: string;
        rol: string;
        email: string;
        name: string;
        empresa:number
        [key: string]: any;
        };
    }
  }
}

export {};