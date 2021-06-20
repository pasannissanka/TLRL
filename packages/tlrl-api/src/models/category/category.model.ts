import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../sequelize';

interface CategoryAttributes {
  categoryId: string;
  name: string;
  parentCategoryId: string | undefined;
  userId: string;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, 'categoryId' | 'parentCategoryId'> {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  categoryId!: string;
  name!: string;
  parentCategoryId!: string;
  userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    categoryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentCategoryId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  { sequelize }
);

export default Category;
