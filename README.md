# fileBAAS
File storage based simple BAAS

Setup using npm install

Start server by npm start

application admin console can be accessed via localhost:3000

Admin console can be used to create users, classes (tables) and rows (objects key,values)

There is api to access class data localhost:3000/api/query.json/classname/username

This BAAS is good for reading data via apis, since its file based, its not good to use it for storigng via apis, since it may lead to data inconsistency. However using diff data store can make it good for writing too.
