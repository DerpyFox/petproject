// src/migrations/20251113-create-users.ts
import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  
  const tables = await queryInterface.showAllTables();
  const hasUsers = tables.includes('users') || tables.includes('Users');

  if (hasUsers) {
    
    console.log('Table "users" already exists — skipping creation in migration 20251113-create-users');
    return;
  }

  await queryInterface.createTable("users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM("user", "admin"), allowNull: false, defaultValue: "user" },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP') },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP') }
  });
}

export async function down(queryInterface: QueryInterface) {
  // standard down: drop the table
  await queryInterface.dropTable("users");
}
