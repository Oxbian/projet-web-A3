CREATE DATABASE projet_web DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
CREATE USER 'etu0126'@'localhost' IDENTIFIED BY 'kwrmdnou';
GRANT ALL PRIVILEGES ON projet_web.* TO 'etu0126'@'localhost';
FLUSH PRIVILEGES;
