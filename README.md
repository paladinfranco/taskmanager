# TaskManager Pro

Sistema fullstack para gestión de usuarios y tareas. Permite crear, editar, eliminar y asignar tareas a usuarios, con historial de reasignaciones, filtros, modo oscuro y validaciones completas.

Desarrollado con **Angular 17** en el frontend, **Spring Boot 3.5 + Java 17** en el backend y **MySQL 8** como base de datos.

---

## Inicio rápido

¿Quieres tener el proyecto corriendo en minutos? Ejecuta estos comandos:

```bash
git clone https://github.com/paladinfranco/taskmanager.git
cd taskmanager
mysql -u root -p -e "CREATE DATABASE taskmanager_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p taskmanager_db < database/01_schema.sql
mysql -u root -p taskmanager_db < database/02_seed.sql
cd backend && mvn spring-boot:run
# En otra terminal:
cd frontend && ng serve
```

Luego abre: http://localhost:4200

---

## Prerrequisitos

Antes de instalar, verifica que tienes las herramientas necesarias:

```bash
java -version        # Necesitas Java 17 o superior
mvn -version         # Necesitas Maven 3.9 o superior
node -v              # Necesitas Node.js 20 o superior
ng version           # Necesitas Angular CLI 17
mysql --version      # Necesitas MySQL 8.0
git --version        # Cualquier versión reciente
```

Si no tienes alguna de estas herramientas:

- Java 17: https://adoptium.net
- Maven: https://maven.apache.org/download.cgi
- Node.js: https://nodejs.org
- Angular CLI: `npm install -g @angular/cli`
- MySQL: https://dev.mysql.com/downloads/mysql

---

## Instalación completa paso a paso

### Paso 1 — Clonar el repositorio

```bash
# Navega al directorio donde quieres guardar el proyecto
cd ~

# Clona el repositorio completo
git clone https://github.com/paladinfranco/taskmanager.git

# Entra a la carpeta del proyecto
cd taskmanager
```

Verifica que la estructura es correcta:

```bash
ls -la
```

Debes ver las carpetas: `backend/`, `frontend/`, `database/`

---

### Paso 2 — Configurar la base de datos

#### 2.1 Crear la base de datos

Conéctate a MySQL con tu usuario root:

```bash
mysql -u root -p
```

Dentro del prompt de MySQL ejecuta:

```sql
CREATE DATABASE taskmanager_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

SHOW DATABASES;
EXIT;
```

Debes ver `taskmanager_db` en la lista.

#### 2.2 Ejecutar los scripts SQL

Desde la carpeta raíz del proyecto ejecuta los scripts en orden:

```bash
# Crear las tablas
mysql -u root -p taskmanager_db < database/01_schema.sql

# Cargar datos de prueba (10 usuarios + tareas)
mysql -u root -p taskmanager_db < database/02_seed.sql
```

#### 2.3 Verificar que los datos se cargaron correctamente

```bash
mysql -u root -p taskmanager_db -e "
  SELECT 'usuarios' as tabla, COUNT(*) as registros FROM usuarios
  UNION ALL
  SELECT 'telefonos', COUNT(*) FROM usuario_telefonos
  UNION ALL
  SELECT 'tareas', COUNT(*) FROM tareas;
"
```

Debes ver:

```
+-----------+-----------+
| tabla     | registros |
+-----------+-----------+
| usuarios  |        10 |
| telefonos |        13 |
| tareas    |        10 |
+-----------+-----------+
```

---

### Paso 3 — Configurar el backend

Edita el archivo de configuración del backend:

```bash
nano backend/src/main/resources/application.properties
```

Busca las líneas de la base de datos y ajusta tu contraseña:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskmanager_db?useSSL=false&serverTimezone=America/Guayaquil&characterEncoding=UTF-8&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=TU_CONTRASEÑA_AQUI
```

Guarda con `Ctrl+O`, `Enter`, `Ctrl+X`.

> **Nota:** Si tu zona horaria no es Ecuador, cambia `America/Guayaquil` por la tuya. Por ejemplo: `America/Bogota`, `America/Lima`, `America/Mexico_City`.

---

### Paso 4 — Levantar el backend

```bash
cd backend
mvn spring-boot:run
```

La primera vez descargará las dependencias de Maven, puede tardar 2-3 minutos.

Si todo está correcto verás al final:

```
Started BackendApplication in X.XXX seconds
Tomcat started on port 8080
```

**Verifica que el backend responde** abriendo en el navegador:

```
http://localhost:8080/swagger-ui.html
```

Debes ver la documentación interactiva de la API con todos los endpoints disponibles.

> **Deja esta terminal abierta.** El backend debe seguir corriendo mientras usas la aplicación.

---

### Paso 5 — Levantar el frontend

Abre una **segunda terminal** (sin cerrar la del backend):

```bash
cd ~/taskmanager/frontend
npm install
ng serve
```

La primera vez instalará las dependencias de Node, puede tardar 1-2 minutos.

Si todo está correcto verás:

```
✔ Compiled successfully.
** Angular Live Development Server is listening on localhost:4200 **
```

Abre en el navegador:

```
http://localhost:4200
```

Debes ver la aplicación con los 10 usuarios de prueba cargados en el sidebar izquierdo.

---

## Uso de la aplicación

### Gestión de usuarios
- El sidebar izquierdo muestra todos los usuarios con su estado y contador de tareas pendientes
- Usa el buscador para filtrar usuarios por nombre, email o ciudad
- Clic en **+ Nuevo usuario** para crear un usuario con sus teléfonos
- Clic en un usuario para ver su detalle, estadísticas y tareas
- Botones **Editar** y **Eliminar** en la vista de detalle

### Gestión de tareas
- Selecciona un usuario para ver sus tareas
- Usa los filtros **Todas / Pendientes / Completadas** para filtrar
- Clic en el círculo de una tarea para marcarla como completada o pendiente
- Botón **Reasignar** (ícono flechas) para transferir la tarea a otro usuario con motivo
- Pestaña **Historial de reasignaciones** para ver el registro de transferencias
- Botón **Eliminar** para borrar una tarea (pide confirmación)

### Modo oscuro / día
- Toggle en la topbar superior derecha
- La preferencia se guarda automáticamente en el navegador

---

## Estructura del proyecto

```
taskmanager/
├── backend/
│   └── src/main/java/com/taskmanager/
│       ├── config/             # Configuración CORS
│       ├── controller/         # UsuarioController, TareaController
│       ├── dto/
│       │   ├── request/        # UsuarioRequestDTO, TareaRequestDTO, ReasignacionRequestDTO
│       │   └── response/       # UsuarioResponseDTO, TareaResponseDTO, ApiResponseDTO
│       ├── entity/             # Usuario, UsuarioTelefono, Tarea, TareaReasignacion
│       ├── exception/          # GlobalExceptionHandler, ResourceNotFoundException
│       ├── repository/         # Interfaces JPA para cada entidad
│       └── service/            # Interfaces e implementaciones de negocio
├── frontend/
│   └── src/app/
│       ├── core/
│       │   ├── interceptors/   # HttpErrorInterceptor
│       │   └── services/       # UsuarioService, TareaService, ThemeService, AvatarColorService
│       ├── features/
│       │   ├── usuarios/       # UsuarioListComponent, UsuarioFormComponent
│       │   └── tareas/         # TareaListComponent, TareaFormComponent, TareaReasignarComponent
│       ├── models/             # usuario.model.ts, tarea.model.ts, api-response.model.ts
│       └── shared/
│           ├── components/     # Toast, ConfirmDialog, ThemeToggle, Clock
│           └── pipes/          # FilterByEstadoPipe
└── database/
    ├── 01_schema.sql           # Creación de tablas con UUID BINARY(16)
    └── 02_seed.sql             # 10 usuarios + 13 teléfonos + 10 tareas de prueba
```

---

## Endpoints de la API

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
| GET | `/api/tareas/{id}` | Obtener tarea por ID |
| POST | `/api/tareas` | Crear tarea |
| PATCH | `/api/tareas/{id}/toggle` | Cambiar estado (pendiente ↔ completada) |
| PATCH | `/api/tareas/{id}/reasignar` | Reasignar tarea a otro usuario |
| DELETE | `/api/tareas/{id}` | Eliminar tarea |

La documentación completa e interactiva de todos los endpoints está disponible en:
```
http://localhost:8080/swagger-ui.html
```

---

## Funcionalidades implementadas

### Requerimientos base
- CRUD completo de usuarios y tareas
- Relación OneToMany / ManyToOne entre usuarios y tareas
- Validaciones en backend (nombre obligatorio, email válido, título obligatorio)
- Validaciones en frontend con Reactive Forms y mensajes de error visibles
- Botón deshabilitado si el formulario es inválido
- Formularios centrados y ordenados con diseño responsive

### Extras implementados
- **UUIDs** (`BINARY(16)`) como identificadores en lugar de auto-increment
- **DTOs** en backend para desacoplar entidades de la API
- **Manejo global de errores** en backend (`GlobalExceptionHandler`) y frontend (`HttpErrorInterceptor`)
- **Confirmación** antes de eliminar usuarios y tareas
- **Notificaciones toast** de éxito, error y advertencia
- **Múltiples teléfonos** por usuario con validación de formato ecuatoriano (`09XXXXXXXX`)
- **Reasignación de tareas** con registro de motivo e historial
- **Modo oscuro / modo día** con preferencia persistente en `localStorage`
- **Búsqueda en tiempo real** de usuarios en el sidebar
- **Filtros de tareas** por estado: Todas / Pendientes / Completadas
- **Barra de progreso** de completado por usuario
- **Avatares con colores únicos** generados por nombre de usuario
- **Contador de tareas pendientes** visible en el sidebar por usuario
- **Reloj en tiempo real** en la topbar
- **Documentación Swagger / OpenAPI** disponible en `/swagger-ui.html`

---

## Posibles problemas y soluciones

**Error: `Access denied for user 'root'@'localhost'`**
Tu contraseña de MySQL es incorrecta. Verifica el valor en `application.properties`.

**Error: `Unknown database 'taskmanager_db'`**
No creaste la base de datos. Ejecuta el Paso 2.1 nuevamente.

**Error: `Port 8080 already in use`**
Otro proceso está usando el puerto 8080. Detén el proceso con:
```bash
sudo lsof -t -i:8080 | xargs kill -9
```

**Error: `Port 4200 already in use`**
Usa un puerto diferente:
```bash
ng serve --port 4201
```

**El frontend carga pero no trae datos**
Verifica que el backend esté corriendo en `http://localhost:8080` y que no haya errores en la consola del navegador (`F12` → Console).

---

## Tecnologías utilizadas

| Capa | Tecnología | Versión |
|---|---|---|
| Frontend | Angular | 17 |
| Backend | Java + Spring Boot | 17 / 3.5 |
| Base de datos | MySQL | 8.0 |
| ORM | Hibernate / JPA | 6.6 |
| Documentación API | SpringDoc OpenAPI | 2.8 |
| Build tool backend | Maven | 3.9 |
| Build tool frontend | Angular CLI / npm | 17 / 10 |
| Control de versiones | Git + GitHub | — |

---

## Autor

Desarrollado por **Roberto Franco**  
GitHub: [@paladinfranco](https://github.com/paladinfranco)
