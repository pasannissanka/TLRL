import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../sequelize';

interface BookmarkAttributes {
  bookmarkId: string;
  userId: string;
  title: string;
  subtitle: string;
  url: string;
  publication: string;
  pubDate: Date;
  readingTime: number;
  imgUrl: string;
  isRead: boolean;
}

interface BookmarkCreationAttributes
  extends Optional<BookmarkAttributes, 'bookmarkId'> {}

class Bookmark
  extends Model<BookmarkAttributes, BookmarkCreationAttributes>
  implements BookmarkAttributes
{
  bookmarkId!: string;
  userId!: string;
  title!: string;
  subtitle!: string;
  url!: string;
  publication!: string;
  pubDate!: Date;
  readingTime!: number;
  imgUrl!: string;
  isRead!: boolean;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bookmark.init(
  {
    bookmarkId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    publication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pubDate: {
      type: DataTypes.DATE,
    },
    readingTime: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    imgUrl: {
      type: DataTypes.TEXT,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'Bookmarks',
  }
);

export default Bookmark;
