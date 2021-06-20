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
import Bookmark from '../bookmark/bookmark';

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

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly Bookmarks?: Bookmark[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    Bookmarks: Association<User, Bookmark>;
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

export default User;
