# Servidor Rest con autenticacion JWT

Creacion de una aplicacion capas de registrar usuarios con caracteristicas unicas y cifrar su contraseña para tener mas seguridad ya que este esta subido a la red
Para acceder a esta aplicacion sera necesario Postman

## Comenzando 🚀

Para poder usuarlo dentro de un entorno local peudes seguir los siguientes pasos:


Mira **Deployment** para conocer como desplegar el proyecto.
descargar el repositorio
Ingresar a la url de heroku donde esta subida la app
https://radiant-brushlands-26494.herokuapp.com/
usando esta url en el entorno de postman podra acceder a los servicios

### Pre-requisitos 📋

Visual Studio o un entorno de programacion de node.js
Postman
Conexion a heroku
dependencias de la app (package.json)
```
Da un ejemplo
```
Postman
url:https://radiant-brushlands-26494.herokuapp.com/usuarios
se puede utilizar el metodo deseado
Get,Put,Post

### Instalación 🔧

Apliacion:
dependencias necesarias de instalacion
npm i bcrypt --save
asi con cada una de las dependencias

El siguiente codigo ayudara a que la aplicacion se ejecute y corra en este caso usaremos nodemon
nodemon server.js

Si todo esta correcto se mostrara en la consola el siguiente mensaje:
Escuchando en el puerto (por defecto esta el puerto 3000)
Base de Datos ONLINE!

Postman:
metodo get
https://radiant-brushlands-26494.herokuapp.com/usuario?caja=caja3
esto nos mostrara un resultado 
{
    "ok": false,
    "err": {
        "message": "Token no válido!"
    }
}
Si no se autentica el token 

## Si el token se a autenticado
{
    "ok": true,
    "registros": 11,
    "cajas": [
        {
            "_id": "60086dc4db22a476b841346f"
        },
        {
            "_id": "6014d2939c237c6e14a543b6",
            "caja": "caja2"
        }


## Ejecutando las pruebas ⚙️

Metodo post para registrar un usuario dentro de la base de datos online

Postman:

https://radiant-brushlands-26494.herokuapp.com/usuario

Se ingresara los campos necesarios para poder ingresar un registro
nombre:  patricio
password: 123456
email: patricio@hotmail.com
role: ADMIN_USER
caja:78
hora:22:48
fecha:12/04/2021

## Resultado
{
    "ok": true,
    "usuario": {
        "role": "ADMIN_ROLE",
        "google": false,
        "_id": "60177a3a01b6ee0015675ccf",
        "nombre": "patricio",
        "email": "patricio@hotmail.com",
        "caja": "caja78",
        "fecha": "12/04/2021",
        "hora": "22:48",
        "__v": 0
    }
}



## Despliegue 📦

Se necesita un entorno que soprote node.js si se desea ejecutarlo localmente
Si se usa Postman solo necesita el url de la app en heroku

## Construido con 🛠️



* [MongoAtlas](https://www.mongodb.com/cloud/atlas) - Base de datos utilizada
* [Maven](https://www.heroku.com/home) - Servidor de la app
* [ROME](https://jwt.io/) - Herramienta de cifrado



## Autores ✒️



* **Jordy Quilachamin** - *Trabajo derivado* - [jordy]()
* **Rodrigo Tufiño** - *Trabajo Real* - [Rodrigo](https://github.com/rtufino)


