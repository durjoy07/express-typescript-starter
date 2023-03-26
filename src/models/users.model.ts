import mongoose, { model, Schema, Document } from 'mongoose';
import mongooseTimestamp from 'mongoose-timestamp';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  authId: String,
  phone: String,
  email: {
    type: String,
    required: true,
  },
  alternateEmails: [String],
  notificationEmail: String,
  sendEmailNotifications: {
    type: Boolean,
    default: true,
  },
  apiKey: {
    type: String,
    require: true,
  },
  stripeId: String,
  subscription: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    status: String,
    productId: String,
    cancelAtPeriodEnd: Boolean,
  },
});

userSchema.plugin(mongooseTimestamp);
const userModel = model<User & Document>('user', userSchema);

export default userModel;
