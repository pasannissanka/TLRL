import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  Model,
  Optional,
} from 'sequelize';
import { sequelize } from '../../sequelize';
import Bookmark from '../bookmark/bookmark.model';
import { Tag } from '../tag/tag.model';

interface UserAttributes {
  userId: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  userId!: string;
  userName!: string;
  email!: string;
  firstName!: string;
  lastName!: string;
  password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // https://sequelize.org/master/manual/typescript.html
  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getBookmarks!: HasManyGetAssociationsMixin<Bookmark>; // Note the null assertions!
  public addBookmark!: HasManyAddAssociationMixin<Bookmark, number>;
  public hasBookmark!: HasManyHasAssociationMixin<Bookmark, number>;
  public countBookmarks!: HasManyCountAssociationsMixin;
  public createBookmark!: HasManyCreateAssociationMixin<Bookmark>;

  public getTags!: HasManyGetAssociationsMixin<Tag>; // Note the null assertions!
  public addTag!: HasManyAddAssociationMixin<Tag, number>;
  public hasTag!: HasManyHasAssociationMixin<Tag, any>;
  public countTags!: HasManyCountAssociationsMixin;
  public createTag!: HasManyCreateAssociationMixin<Tag>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly Bookmarks?: Bookmark[]; // Note this is optional since it's only populated when explicitly requested in code
  public readonly Tags?: Tag[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    Bookmarks: Association<User, Bookmark>;
    Tags: Association<User, Tag>;
  };
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Users',
  }
);

User.hasMany(Bookmark, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'Bookmarks',
});

Bookmark.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

User.hasMany(Tag, {
  sourceKey: 'userId',
  foreignKey: 'userId',
  as: 'Tags',
});

Tag.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

export default User;
