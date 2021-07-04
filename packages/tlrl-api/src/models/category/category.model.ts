import { Document, model, Schema, Types } from 'mongoose';
import { UserModel } from '../user/user.model';

export interface ICategory {
  name: string;
  colorCode?: string;
  parent?: Types.ObjectId;
}
export interface Category extends ICategory, Document {
  userId: string;
  bookmarks: Types.ObjectId[];
  children: Types.ObjectId[];
}

const schema = new Schema<Category>(
  {
    name: { type: String, required: true },
    colorCode: { type: String },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    parent: { type: Types.ObjectId, ref: 'Category' },
    children: [{ type: Types.ObjectId, ref: 'Category' }],
    bookmarks: [{ type: Types.ObjectId, ref: 'Bookmark' }],
  },
  { timestamps: true }
);

schema.pre<Category>('save', async function (next) {
  await UserModel.findByIdAndUpdate(this.userId, {
    $push: {
      categories: { name: this.name, _id: this._id, parent: this.parent },
    },
  }).exec();
  if (this.isModified('parent')) {
    await CategoryModel.findByIdAndUpdate(this.parent, {
      $push: {
        children: this._id,
      },
    }).exec();
  }
  next();
});

export const CategoryModel = model<Category>('Category', schema);
