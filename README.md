## Pasos para ejecutar el proyecto

1. Instalar paquetes ``npm i``
2. Levantar Docker de base de Datos (Se recomienda pgAdmin como cliente de Base de Datos)

```
docker-compose up -d
```

1. Clonar el archivo ``.env.template``y renombrar la copia a ``.env``
2. Registrar el valor de las variables en ``.env``
3. Ejecutar la aplicación en dev:

````
npm run start:dev
````
