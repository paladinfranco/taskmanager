-- ============================================================
-- TaskManager Pro - Esquema de base de datos
-- Motor: MySQL 8.0
-- Charset: utf8mb4 (soporte completo español)
-- ============================================================

USE taskmanager_db;

-- ------------------------------------------------------------
-- Tabla: usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id            BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
    nombre        VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL,
    ciudad        VARCHAR(80)  NULL,
    estado        ENUM('activo','inactivo') NOT NULL DEFAULT 'activo',
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_usuarios     PRIMARY KEY (id),
    CONSTRAINT uq_usuarios_email UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabla: usuario_telefonos
-- Un usuario puede tener múltiples teléfonos
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuario_telefonos (
    id            BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
    usuario_id    BINARY(16)   NOT NULL,
    telefono      VARCHAR(20)  NOT NULL,
    tipo          ENUM('principal','secundario','otro') NOT NULL DEFAULT 'principal',
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_usuario_telefonos PRIMARY KEY (id),
    CONSTRAINT fk_telefonos_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabla: tareas
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tareas (
    id            BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
    titulo        VARCHAR(200) NOT NULL,
    descripcion   TEXT         NULL,
    estado        ENUM('pendiente','completada') NOT NULL DEFAULT 'pendiente',
    usuario_id    BINARY(16)   NOT NULL,
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT pk_tareas        PRIMARY KEY (id),
    CONSTRAINT fk_tareas_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabla: tarea_reasignaciones
-- Historial de reasignaciones entre usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tarea_reasignaciones (
    id                  BINARY(16)   NOT NULL DEFAULT (UUID_TO_BIN(UUID())),
    tarea_id            BINARY(16)   NOT NULL,
    usuario_origen_id   BINARY(16)   NOT NULL,
    usuario_destino_id  BINARY(16)   NOT NULL,
    motivo              TEXT         NOT NULL,
    reasignado_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT pk_reasignaciones      PRIMARY KEY (id),
    CONSTRAINT fk_reasig_tarea        FOREIGN KEY (tarea_id)
        REFERENCES tareas(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_reasig_origen       FOREIGN KEY (usuario_origen_id)
        REFERENCES usuarios(id)
        ON DELETE RESTRICT,
    CONSTRAINT fk_reasig_destino      FOREIGN KEY (usuario_destino_id)
        REFERENCES usuarios(id)
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Índices adicionales para optimizar consultas frecuentes
-- ------------------------------------------------------------
CREATE INDEX idx_tareas_usuario_id     ON tareas(usuario_id);
CREATE INDEX idx_tareas_estado         ON tareas(estado);
CREATE INDEX idx_telefonos_usuario_id  ON usuario_telefonos(usuario_id);
CREATE INDEX idx_reasig_tarea_id       ON tarea_reasignaciones(tarea_id);
