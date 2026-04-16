# TaskManager Pro

Sistema fullstack para gestión de usuarios y tareas, desarrollado con Angular, Spring Boot y MySQL.

---

## Tecnologías utilizadas

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | Angular | 17 |
| Backend | Java + Spring Boot | 17 / 3.5 |
| Base de datos | MySQL | 8.0 |
| ORM | Hibernate / JPA | 6.6 |
| Build tool | Maven | 3.9 |
| Control de versiones | Git + GitHub | — |

---

## Estructura del proyecto

```
taskmanager/
├── backend/
│   └── src/main/java/com/taskmanager/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── entity/
│       ├── exception/
│       ├── repository/
│       └── service/
├── frontend/
│   └── src/app/
│       ├── core/
│       ├── features/
│       ├── models/
│       └── shared/
└── database/
    ├── 01_schema.sql
    └── 02_seed.sql
```

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Java 17
- Maven 3.9+
- Node.js 20+ y npm
- Angular CLI 17 — `npm install -g @angular/cli`
- MySQL 8.0

---

## Configuración e instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/paladinfranco/taskmanager.git
cd taskmanager
```

### 2. Configurar la base de datos

Inicia MySQL y ejecuta los scripts en orden:

```bash
mysql -u root -p -e "CREATE DATABASE taskmanager_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p taskmanager_db < database/01_schema.sql
mysql -u root -p taskmanager_db < database/02_seed.sql
```

### 3. Configurar credenciales del backend

Edita el archivo `backend/src/main/resources/application.properties` y ajusta los valores:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager_db?useSSL=false&serverTimezone=America/Guayaquil&characterEncoding=UTF-8&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=TU_CONTRASEÑA
```

---

## Ejecución

### Backend

```bash
cd backend
mvn spring-boot:run
```

El servidor arranca en: `http://localhost:8080`

Documentación Swagger disponible en: `http://localhost:8080/swagger-ui.html`

### Frontend

Abre una segunda terminal:

```bash
cd frontend
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

> Asegúrate de que el backend esté corriendo antes de levantar el frontend.

---

## Funcionalidades implementadas

### Gestión de usuarios
- Crear, listar, editar y eliminar usuarios
- Múltiples teléfonos por usuario con validación de formato ecuatoriano (09XXXXXXXX)
- Búsqueda en tiempo real en el sidebar
- Indicador visual de tareas pendientes por usuario
- Avatares con colores únicos generados por nombre

### Gestión de tareas
- Crear y eliminar tareas asociadas a un usuario
- Marcar tareas como completadas con toggle visual
- Filtrar tareas por estado: Todas / Pendientes / Completadas
- Reasignar tareas entre usuarios con registro de motivo e historial
- Barra de progreso de completado por usuario

### Extras implementados
- UUIDs (`BINARY(16)`) como identificadores en lugar de auto-increment
- DTOs en backend para desacoplar entidades de la API
- Manejo global de errores en backend (`GlobalExceptionHandler`) y frontend (`HttpErrorInterceptor`)
- Confirmación antes de eliminar usuarios y tareas
- Notificaciones toast de éxito, error y advertencia
- Modo oscuro / modo día con preferencia persistente en `localStorage`
- Reloj en tiempo real en la topbar
- Documentación de API con Swagger / OpenAPI

---

## Endpoints principales

### Usuarios

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/usuarios` | Listar todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| POST | `/api/usuarios` | Crear usuario |
| PUT | `/api/usuarios/{id}` | Editar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

### Tareas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tareas/usuario/{id}` | Listar tareas de un usuario |
| POST | `/api/tareas` | Crear tarea |
| PATCH | `/api/tareas/{id}/toggle` | Cambiar estado de tarea |
| PATCH | `/api/tareas/{id}/reasignar` | Reasignar tarea a otro usuario |
| DELETE | `/api/tareas/{id}` | Eliminar tarea |

---

## Autor

Desarrollado por **Roberto Franco**  
GitHub: [@paladinfranco](https://github.com/paladinfranco)
