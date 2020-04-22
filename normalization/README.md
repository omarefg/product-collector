# Objetivo 

El objetivo principal de la normalización es regular la cantidad y calidad de información, medida en base a la importancia que tiene para el negocio, y finalmente definir la estructura de los datos que serán almacenados en Base de datos.


[![normalization](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c6a09f0b-62cb-48d6-8d14-f276aed8615f/Estructura_backend_product_collector.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200423T182300Z&X-Amz-Expires=86400&X-Amz-Signature=827eb6a18f9e50034580c046a9a824efa5eac9f92526e6d4a05fecc02609c65c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Estructura_backend_product_collector.png%22 "normalization")](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c6a09f0b-62cb-48d6-8d14-f276aed8615f/Estructura_backend_product_collector.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200423T182300Z&X-Amz-Expires=86400&X-Amz-Signature=827eb6a18f9e50034580c046a9a824efa5eac9f92526e6d4a05fecc02609c65c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Estructura_backend_product_collector.png%22 "normalization")


## ¿Cómo lo hacemos?

Mediante un API que tiene habilitado un endpoint de tipo post, en el cual se recibe la data que envía backend gracias a su data colector.

### ¿Qué datos necesita el reguest a este endpoint ?
- Que lo primero que necesitamos es un **token** de autorización para hacer el request. La manera que tiene el solucitante para obtener el token es mediante otro endpoint dedicado exclusivamente a autenticar la petición.

- Lo segundo seran los **datos** los cuales llegan atraves del body de la petición hecha por el equipo de dataCollector.

### Las rutas del API

Este proceso cuenta con dos endpoint habilidatos.

  	/normalization/auth/token
    /normalization/data-manager/normalize

Para dar solucion a estas dos necesidades se crean dos componente que se ejecutan deacuerdo al [enrrutador](https://normalization-doc.now.sh/module-router.html "enrrutador") que se le implementa al servidor de express en el que esta construida nuestra [aplicación](https://normalization-doc.now.sh/global.html#app "aplicación").