type userInfo = {
  apiKey?: string;
  userId?: string;
  email?: string;
  sendEmailNotifications?: boolean;
  productId?: string;
};

declare namespace Express {
  interface Request {
    user?: userInfo;
  }
}
