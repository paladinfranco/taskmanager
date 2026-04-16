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

---

## Requisitos previos

- Java 17
- Maven 3.9+
- Node.js 20+ y npm
- Angular CLI 17
- MySQL 8.0

---

## Configuración e instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/paladinfranco/taskmanager.git
cd taskmanager
```

### 2. Configurar la base de datos

```bash
mysql -u root -p -e "CREATE DATABASE taskmanager_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p taskmanager_db < database/01_schema.sql
mysql -u root -p taskmanager_db < database/02_seed.sql
```

### 3. Configurar credenciales del backend

Edita `backend/src/main/resources/application.properties`:

```properties
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

Servidor en: http://localhost:8080

Swagger UI en: http://localhost:8080/swagger-ui.html

### Frontend

```bash
cd frontend
ng serve
```

Aplicación en: http://localhost:4200

---

## Funcionalidades implementadas

### Gestión de usuarios
- Crear, listar, editar y eliminar usuarios
- Múltiples teléfonos por usuario con validación ecuatoriana (09XXXXXXXX)
- Búsqueda en tiempo real en el sidebar
- Indicador visual de tareas pendientes por usuario

### Gestión de tareas
- Crear y eliminar tareas asociadas a un usuario
- Marcar tareas como completadas con toggle visual
- Filtrar tareas: Todas / Pendientes / Completadas
- Reasignar tareas entre usuarios con historial de motivo

### Extras implementados
- UUIDs como identificadores
- DTOs en backend
- Manejo global de errores en backend y frontend
- Confirmación antes de eliminar
- Notificaciones toast
- Modo oscuro / modo día persistente
- Reloj en tiempo real
- Barra de progreso de tareas
- Avatares con colores únicos por usuario
- Documentación Swagger/OpenAPI

---

## Endpoints principales

### Usuarios
| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/usuarios | Listar todos |
| GET | /api/usuarios/{id} | Obtener por ID |
| POST | /api/usuarios | Crear |
| PUT | /api/usuarios/{id} | Editar |
| DELETE | /api/usuarios/{id} | Eliminar |

### Tareas
| Método | Endpoint | Descripción |
|---|---|---|
| GET | /api/tareas/usuario/{id} | Tareas de un usuario |
| POST | /api/tareas | Crear tarea |
| PATCH | /api/tareas/{id}/toggle | Cambiar estado |
| PATCH | /api/tareas/{id}/reasignar | Reasignar |
| DELETE | /api/tareas/{id} | Eliminar |

---

## Autor

Desarrollado por **Roberto Franco**
GitHub: [@paladinfranco](https://github.com/paladinfranco)
