Meteo-server

Настройка БД:

    create database arduino; 
    create user 'arduinoSlave'@'localhost' identified with mysql_native_password by '123456';
    grant all privileges on arduino.* to 'arduinoSlave'@'localhost';


Модуль:

[Метеостанция](https://github.com/Sapfir0/meteostation "Не юзай это, ты че")
