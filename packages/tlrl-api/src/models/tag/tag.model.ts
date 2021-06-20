import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../sequelize';

interface TagAttributes {
  tag: string;
  tagId: string;
  userId: string;
}

interface TagCreationAttributes extends Optional<TagAttributes, 'tagId'> {}

class Tag
  extends Model<TagAttributes, TagCreationAttributes>
  implements TagAttributes
{
  tag!: string;
  tagId!: string;
  userId!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tag.init(
  {
    tagId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    tag: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'Tags',
  }
);

export { Tag };
