import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  UUIDV4,
} from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../sequelize';
import Category from '../category/category.model';
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

  // Type definitions refer - https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances
  public getTags!: HasManyGetAssociationsMixin<Tag>; // Note the null assertions!
  public addTag!: HasManyAddAssociationMixin<Tag, number>;
  public hasTag!: HasManyHasAssociationMixin<Tag, number>;
  public countTags!: HasManyCountAssociationsMixin;
  public createTag!: HasManyCreateAssociationMixin<Tag>;

  public getCategory!: HasManyGetAssociationsMixin<Category>;
  public addCategory!: HasManyAddAssociationMixin<Category, number>;
  public hasCategory!: HasManyHasAssociationMixin<Category, any>;
  public createCategory!: HasManyCreateAssociationMixin<Category>;
  public countCategories!: HasManyCountAssociationsMixin;
  public removeCategory!: HasManyRemoveAssociationMixin<Category, number>;

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

class BookmarkCategory extends Model {}

BookmarkCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      references: {
        model: Category,
        key: 'categoryId',
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

Bookmark.belongsToMany(Category, {
  through: BookmarkCategory,
  foreignKey: 'bookmarkId',
});

Category.belongsToMany(Bookmark, {
  through: BookmarkCategory,
  foreignKey: 'categoryId',
});

export default Bookmark;
