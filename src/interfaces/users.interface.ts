type subscriptionType = {
  id?: string;
  createdAt: Date;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  status: string;
  productId: string;
  cancelAtPeriodEnd: boolean;
};

export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  authId: string;
  phone?: string;
  email: string;
  alternateEmails?: string[];
  notificationEmail: string;
  sendEmailNotifications: boolean;
  apiKey: string;
  stripeId?: string;
  subscription?: subscriptionType;
  createdAt?: Date;
  updatedAt?: Date;
}
