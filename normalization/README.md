# Objetivo 

El objetivo principal de la normalización es regular la cantidad y calidad, medida en base a la importancia que tiene para el negocio, y finalmente definir la estructura de los datos que serán almacenados en Baso de datos.

## ¿Cómo lo hacemos?

Mediante un API que tiene habilitado un endpoint de tipo post, en el cual se recibe la data que envía backend gracias a su data colector.

### ¿Qué datos necesita el reguest a este endpoint ?
- Que lo primero que necesitamos es un token de autorización para hacer el request. La manera que tiene el solucitante para obtener el token es mediante otro endpoint dedicado exclusivamente a autenticar la petición.

- Lo segundo seran los datos los cuales llegan atraves del body de la petición.

### Las rutas del API

Este proceso cuenta con dos endpoint habilidatos.

  	/normalization/auth/token
    /normalization/data-manager/normalize

Para dar solucion a estas dos necesidades se crean dos componente que se ejecutan deacuerdo al [enrrutador](https://documentacion-normalizacion.now.sh/module-router.html "enrrutador") que se le implementa al servidor de express en el que esta construida nuestra aplicación.