INSERT INTO users (username, email, password_hash) 
VALUES ('golovach', 'golovach@legenda.com', 'TITYAN_GOD_YATORO_LOX');

SELECT * FROM users;

SELECT p.title, p.content, u.username
FROM posts p
JOIN users u ON p.user_id = u.id;

SELECT * FROM posts 
WHERE user_id IN (2, 4)
ORDER BY created_at DESC;

UPDATE users 
SET email = 'golovach@LEGENDA.ru' 
WHERE id = 4;

SELECT * FROM comments WHERE user_id = 4;

DELETE FROM comments 
WHERE post_id = 3 AND user_id = 4;

SELECT * FROM comments;