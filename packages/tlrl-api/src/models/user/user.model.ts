import { hash, verify } from 'argon2';
import { Document, model, Schema, Types } from 'mongoose';
import { ICategory } from '../category/category.model';

export interface IUser extends Document {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  // User data
  bookmarks: Types.ObjectId[];
  tags: string[];
  categories: any[];
}

export interface User extends IUser {
  password: string;
  comparePassword(candidPassword: string): Promise<boolean>;
}

const userSchema = new Schema<User>(
  {
    userName: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    email: {
      type: String,
      required: true,
      index: { unique: true, dropDups: true },
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    bookmarks: [{ type: Types.ObjectId, ref: 'Bookmark' }],
    tags: [{ type: String }],
    categories: [
      new Schema<ICategory>(
        {
          name: { type: String },
          _id: { type: Types.ObjectId, ref: 'Category' },
          parent: { type: Types.ObjectId, ref: 'Category' },
        },
        { id: false }
      ),
    ],
  },
  { timestamps: true }
);

userSchema.pre<User>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function (
  this: User,
  candidPassword: string
) {
  return await verify(this.password, candidPassword);
};

export const UserModel = model<User>('User', userSchema);
