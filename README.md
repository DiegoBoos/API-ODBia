## Pasos para ejecutar el proyecto

1. Instalar paquetes ``npm i``
2. Levantar Docker de base de Datos (Se recomienda pgAdmin como cliente de Base de Datos)
   ``docker-compose up -d``
3. Clonar el archivo ``.env.template``y renombrar la copia a ``.env``
4. Registrar el valor de las variables en ``.env``
5. Inicializar Database ``npm run init:database``
6. Generar primera migracion ``npm run migration:generate --name=first_migration``
7. Ejecutar migracion ``npm run migration:run`` para revertir migración ``npm run migration:revert``
8. Poblar tablas de parametrización ``npm run init:seed``
9. Ejecutar la aplicación en dev: ``npm run start:dev``
