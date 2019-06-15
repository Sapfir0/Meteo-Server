Meteo-server

Система работает ~~на божьем слове~~ 

Настройка локальной БД:

    create database arduino; 
    create user 'arduinoSlave'@'localhost' identified with mysql_native_password by '123456';
    grant all privileges on arduino.* to 'arduinoSlave'@'localhost';

[Центральная вики, объединяющая все невозможное](https://github.com/Sapfir0/Meteo-Server/wiki)


Модуль:

0. [Метеостанция](https://github.com/Sapfir0/meteostation "Не юзай это, ты че")
0. [Параметры пк](https://github.com/Sapfir0/scriptForOurLife/tree/master/scanComputerParamsLinux "Не юзай это, ты че")


