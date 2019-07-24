create database arduino; 
create user 'arduinoSlave'@'localhost' identified with mysql_native_password by '123456';
grant all privileges on arduino.* to 'arduinoSlave'@'localhost';
