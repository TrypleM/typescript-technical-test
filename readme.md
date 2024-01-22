# Envita Stories
## Prueba Técnica - Puesto Typescript
Esta prueba técnica está pensada para que el candidato pueda demostrar su conocimiento del código, así como su capacidad de organización y su capacidad de trabajo en equipo.

### La aplicación
Esta aplicación es un ToDo list muy simple que se maneja desde consola. Permite las operaciones básicas de un ToDo list a nivel de CRUD y almacena los datos en una base de datos JSON.

Para lanzar esta aplicación:
1. Haz un fork de este repositorio
2. Clonalo en tu máquina
3. Ejecútalo:
> node todo.js

Necesitarás tener instalado NodeJS para ejecutarlo.

### Ejercicios
1. Convierte el proyecto a Typescript
2. Agrega la funcionalidad para completar tareas
3. Divide el código en clases. Escribe en este fichero `readme.md` una propuesta de arquitectura de software para el proyecto.
4. Teórico: ¿Cómo podríamos convertir la aplicación en una aplicación colaborativa?

## Instalación de la aplicación en typescript

1. Instalamos los modulos de node con
```
    npm install
```

2. Compilamos la aplicación con: 
```
    npm run tsc
```

3. Para lanzar la aplicación usamos:
```
    npm start
```

### Propuesta de Arquitectura

Una buena propuesta de arquitectura para este proyecto podría ser la arquitectura por capas, para así aumentar la modularidad, la reusabilidad
sea mas facil de mantener y con una mayor escalabilidad.

### Aplicación colaborativa

Podria ser una aplicación colaborativa si usasemos una base de datos en linea, con esto y unos pequeños ajustes podría llegar a ser una aplicación colaborativa.
Para ello tendriamos que tener en cuenta la edición de las tareas, ya que dos usuarios podria estar intentando editar el mismo dato al mismo tiempo.