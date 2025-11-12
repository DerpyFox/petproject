import { Model, Table, Column, DataType, Default, CreatedAt, UpdatedAt } from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: true,
})
export default class Tutorial extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  })
  declare id?: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
    field: "username"
  })
  declare username?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    field: "email"
  })
  declare email?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    field: "password_hash"
  })
  declare password_hash?: string;

  @Default("user")
  @Column({
    type: DataType.ENUM("user", "admin"),
    allowNull: false,
    field: "role"
  })
  declare role?: "user" | "admin";

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: "created_at"
  })
  declare createdAt?: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: "updated_at"
  })
  declare updatedAt?: Date;

}