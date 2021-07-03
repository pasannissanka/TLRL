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
}

const schema = new Schema<Category>(
  {
    name: { type: String, required: true },
    colorCode: { type: String },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    parent: { type: Types.ObjectId, ref: 'Category' },
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
  next();
});

export const CategoryModel = model<Category>('Category', schema);
