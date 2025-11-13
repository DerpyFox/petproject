"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
// src/migrations/20251113-create-users.ts
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    // showAllTables возвращает список таблиц; в разных PG-установках имена могут быть в разном регистре
    const tables = await queryInterface.showAllTables();
    const hasUsers = tables.includes('users') || tables.includes('Users');
    if (hasUsers) {
        // таблица уже существует — пропускаем создание (миграция всё равно будет помечена как выполненная)
        console.log('Table "users" already exists — skipping creation in migration 20251113-create-users');
        return;
    }
    await queryInterface.createTable("users", {
        id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: sequelize_1.DataTypes.STRING(50), allowNull: false, unique: true },
        email: { type: sequelize_1.DataTypes.STRING(100), allowNull: false, unique: true },
        password_hash: { type: sequelize_1.DataTypes.STRING(255), allowNull: false },
        role: { type: sequelize_1.DataTypes.ENUM("user", "admin"), allowNull: false, defaultValue: "user" },
        created_at: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP') },
        updated_at: { type: sequelize_1.DataTypes.DATE, allowNull: false, defaultValue: queryInterface.sequelize.literal('CURRENT_TIMESTAMP') }
    });
}
async function down(queryInterface) {
    // standard down: drop the table
    await queryInterface.dropTable("users");
}
