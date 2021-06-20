import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  UUIDV4,
} from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../sequelize';
import { Tag } from '../tag/tag.model';

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

  public getTags!: HasManyGetAssociationsMixin<Tag>; // Note the null assertions!
  public addTag!: HasManyAddAssociationMixin<Tag, number>;
  public hasTag!: HasManyHasAssociationMixin<Tag, number>;
  public countTags!: HasManyCountAssociationsMixin;
  public createTag!: HasManyCreateAssociationMixin<Tag>;

  public static associations: {
    Tags: Association<Bookmark, Tag>;
  };
}

Bookmark.init(
  {
    bookmarkId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
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

class BookmarkTag extends Model {}

BookmarkTag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    tagId: {
      type: DataTypes.UUID,
      references: {
        model: Tag,
        key: 'tagId',
      },
    },
    bookmarkId: {
      type: DataTypes.UUID,
      unique: false,
      references: {
        model: Bookmark,
        key: 'bookmarkId',
      },
    },
  },
  {
    sequelize,
  }
);

Bookmark.belongsToMany(Tag, {
  through: BookmarkTag,
  foreignKey: 'bookmarkId',
});

Tag.belongsToMany(Bookmark, {
  through: BookmarkTag,
  foreignKey: 'tagId',
});

export default Bookmark;
