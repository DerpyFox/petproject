"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
async function up(queryInterface) {
    const rows = await queryInterface.sequelize.query(`SELECT username FROM users WHERE username IN ('admin','ivan_petrov','maria_ivanova','EZ25','golovach')`, { type: sequelize_1.QueryTypes.SELECT });
    const existingUsernames = new Set(rows.map(r => r.username));
    const now = new Date();
    const toInsert = [
        { username: 'admin', email: 'admin@site.com', password_hash: '$2b$10$exampleHash123', role: 'admin', created_at: now, updated_at: now },
        { username: 'ivan_petrov', email: 'ivan@mail.ru', password_hash: '$2b$10$exampleHash456', role: 'user', created_at: now, updated_at: now },
        { username: 'maria_ivanova', email: 'maria@yandex.ru', password_hash: '$2b$10$exampleHash789', role: 'user', created_at: now, updated_at: now },
        { username: 'EZ25', email: 'golovach@fan.ru', password_hash: 'LOVE@@GOLOVACH@@MOST', role: 'user', created_at: now, updated_at: now },
        { username: 'golovach', email: 'golovach@legenda.com', password_hash: 'TITYAN_GOD_YATORO_LOX', role: 'user', created_at: now, updated_at: now }
    ].filter(u => !existingUsernames.has(u.username));
    if (toInsert.length > 0) {
        await queryInterface.bulkInsert('users', toInsert, {});
    }
    else {
        console.log('Seed users already present — skipping insert');
    }
}
async function down(queryInterface) {
    await queryInterface.bulkDelete('users', {
        username: ['admin', 'ivan_petrov', 'maria_ivanova', 'EZ25']
    }, {});
}
