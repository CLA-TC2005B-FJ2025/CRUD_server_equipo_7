# CRUD_server_equipo_7

-- Este proyecto implementa un servidor CRUD utilizando Node.js y SQL Server. A continuación, se detallan los pasos para configurar y ejecutar el servidor, tanto en Codespaces como en Docker.

# Configuración en Codespaces

1. Crear la base de datos y las tablas:

Utilizar el script init_db.sql para crear las tablas necesarias en la base de datos.

2. Insertar datos de prueba:

Utilizar el script populate_db.sql para insertar datos dummy en la base de datos.

3. Crear una instancia de SQL Server:

En Codespaces, se debe configurar una instancia de SQL Server antes de ejecutar el servidor.

4. Instalar dependencias:

Ejecutar npm install para instalar las dependencias necesarias.

5. Ejecutar el servidor:

Correr npm start para iniciar el servidor CRUD.


## Configuración con Docker

En nuestro desarrollo, utilizamos Docker para ejecutar la base de datos SQL Server dentro de un contenedor. Los pasos fueron los siguientes:

1. Levantar el contenedor con SQL Server:

docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourPassword123!' \
  -p 1433:1433 --name sql_server_container \
  -d mcr.microsoft.com/mssql/server:2019-latest


2. Conectarse a la base de datos:

Usamos un cliente SQL o herramientas como Azure Data Studio para conectarnos al servidor y ejecutar los scripts init_db.sql y populate_db.sql.

3. Ejecutar el servidor CRUD:

Luego de configurar la base de datos, el servidor se ejecuta con npm start.

4. Servicios CRUD

Este proyecto proporciona endpoints para realizar operaciones CRUD sobre la base de datos SQL Server. Asegúrate de tener la base de datos configurada correctamente antes de probar los servicios.

Si tienes problemas, verifica que la base de datos esté corriendo y que las credenciales sean correctas.
