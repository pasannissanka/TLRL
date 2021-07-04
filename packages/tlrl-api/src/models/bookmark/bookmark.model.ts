import { Document, model, Schema, Types } from 'mongoose';
import { CategoryModel, ICategory } from '../category/category.model';
import { UserModel } from '../user/user.model';

export interface IBookmark extends Document {
  userId: string;
  title: string;
  url: string;
  publication: IPublication;
  pubDate: Date;
  readingTime: number;
  imgUrl: string;
  isRead: boolean;
  tags: string[];
  category: ICategory;
}

interface IPublication {
  faviconUrl: string;
  hostname: string;
}

const schema = new Schema<IBookmark>(
  {
    userId: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    publication: new Schema<IPublication>(
      {
        faviconUrl: { type: String },
        hostname: { type: String, required: true },
      },
      { _id: false }
    ),
    pubDate: { type: Date },
    readingTime: { type: Number },
    imgUrl: { type: String },
    tags: [{ type: String }],
    category: new Schema<ICategory>(
      {
        name: { type: String },
        _id: { type: Types.ObjectId, ref: 'Category' },
      },
      { id: false }
    ),
    isRead: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

schema.index({ title: 'text', url: 'text' });

schema.pre<IBookmark>('save', async function (next) {
  if (this.isModified('tags')) {
    await UserModel.findByIdAndUpdate(this.userId, {
      $push: { bookmarks: this._id },
      $addToSet: { tags: { $each: this.tags } },
    }).exec();
  }
  if (this.isModified('category')) {
    await CategoryModel.findByIdAndUpdate(this.category, {
      $addToSet: { bookmarks: this._id },
    }).exec();
  }
  next();
});

export const BookmarkModel = model<IBookmark>('Bookmark', schema);

// BookmarkModel.collection.dropIndexes(function () {
//   BookmarkModel.collection.reIndex(function () {
//     console.log('Done');
//   });
// });
