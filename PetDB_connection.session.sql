CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица постов (связь один-ко-многим с пользователями)
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Внешний ключ с каскадным удалением
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Таблица комментариев (связи с пользователями и постами)
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    comment_text TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Индексы для ускорения поиска
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@site.com', '$2b$10$exampleHash123', 'admin'),
('ivan_petrov', 'ivan@mail.ru', '$2b$10$exampleHash456', 'user'),
('maria_ivanova', 'maria@yandex.ru', '$2b$10$exampleHash789', 'user');

INSERT INTO users (username, email, password_hash, role) VALUES
('EZ25', 'golovach@fan.ru', 'LOVE@@GOLOVACH@@MOST', 'user');

INSERT INTO posts (title, content, user_id) VALUES
('Мой первый пост', 'Привет, это мой первый пост на этом сайте!', 2),
('Второй пост от Ивана', 'Продолжаю изучать базы данных', 2),
('Привет от Марии', 'Рада присоединиться к этому сообществу!', 3);

INSERT INTO posts (title, content, user_id) VALUES
('НАЙС ИГРАЕШЬ: ГОЛОВАЧ НАНОСИТ ОТВЕТНЫЙ УДАР', 'В данном посте мы обсудим какой ГОЛОВАЧЛЕНА хороший игрок', 4);

INSERT INTO comments (comment_text, user_id, post_id) VALUES
('Отличный пост!', 3, 1),
('Спасибо за информацию', 2, 3),
('Интересные мысли', 1, 1),
('Найс играешь', 4, 1),
('Найс играешь', 4, 2),
('Найс играешь', 4, 3),
('ГОЛОВАЧ ЛЕГЕНДА (ai контент ферма golovach.com.ru.ez25.sigma.fun)', 4, 4);

SELECT * FROM users
ORDER BY id;

SELECT * FROM posts;

SELECT * FROM comments
ORDER BY user_id;