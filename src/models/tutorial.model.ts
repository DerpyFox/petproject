import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "tutorials",
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
    type: DataType.STRING(255),
    field: "title"
  })
  declare title?: string;

  @Column({
    type: DataType.STRING(255),
    field: "description"
  })
  declare description?: string;

  @Column({
    type: DataType.BOOLEAN,
    field: "published"
  })
  declare published?: boolean;
}