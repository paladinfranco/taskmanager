-- ============================================================
-- TaskManager Pro - Datos de prueba
-- 10 usuarios ficticios con teléfonos y tareas de ejemplo
-- ============================================================

USE taskmanager_db;

-- Variables para almacenar los UUIDs generados
SET @u1 = UUID(); SET @u2 = UUID(); SET @u3 = UUID();
SET @u4 = UUID(); SET @u5 = UUID(); SET @u6 = UUID();
SET @u7 = UUID(); SET @u8 = UUID(); SET @u9 = UUID();
SET @u10 = UUID();

-- ------------------------------------------------------------
-- Usuarios
-- ------------------------------------------------------------
INSERT INTO usuarios (id, nombre, email, ciudad, estado) VALUES
(UUID_TO_BIN(@u1),  'Carlos Mendoza',    'cmendoza@taskpro.ec',    'Quito',      'activo'),
(UUID_TO_BIN(@u2),  'Valeria Torres',    'vtorres@taskpro.ec',     'Guayaquil',  'inactivo'),
(UUID_TO_BIN(@u3),  'Diego Herrera',     'dherrera@taskpro.ec',    'Cuenca',     'activo'),
(UUID_TO_BIN(@u4),  'Andrea Vásquez',    'avasquez@taskpro.ec',    'Loja',       'activo'),
(UUID_TO_BIN(@u5),  'Sebastián Mora',    'smora@taskpro.ec',       'Ambato',     'activo'),
(UUID_TO_BIN(@u6),  'Lucía Paredes',     'lparedes@taskpro.ec',    'Manta',      'activo'),
(UUID_TO_BIN(@u7),  'Andrés Cifuentes',  'acifuentes@taskpro.ec',  'Riobamba',   'inactivo'),
(UUID_TO_BIN(@u8),  'Gabriela Romero',   'gromero@taskpro.ec',     'Ibarra',     'activo'),
(UUID_TO_BIN(@u9),  'Fernando Salinas',  'fsalinas@taskpro.ec',    'Quito',      'activo'),
(UUID_TO_BIN(@u10), 'Patricia Olvera',   'polvera@taskpro.ec',     'Guayaquil',  'activo');

-- ------------------------------------------------------------
-- Teléfonos
-- ------------------------------------------------------------
INSERT INTO usuario_telefonos (id, usuario_id, telefono, tipo) VALUES
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u1),  '0991234561', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u1),  '0221234561', 'secundario'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u2),  '0992234562', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u3),  '0993234563', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u3),  '0723234563', 'secundario'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u4),  '0994234564', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u5),  '0995234565', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u6),  '0996234566', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u7),  '0997234567', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u8),  '0998234568', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u8),  '0628234568', 'secundario'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u9),  '0999234569', 'principal'),
(UUID_TO_BIN(UUID()), UUID_TO_BIN(@u10), '0990234560', 'principal');

-- ------------------------------------------------------------
-- Tareas
-- ------------------------------------------------------------
INSERT INTO tareas (id, titulo, descripcion, estado, usuario_id) VALUES
(UUID_TO_BIN(UUID()), 'Revisar informe Q1',             'Revisar y aprobar el informe del primer trimestre',         'completada', UUID_TO_BIN(@u1)),
(UUID_TO_BIN(UUID()), 'Actualizar base de clientes',    'Depurar registros duplicados en el CRM',                    'pendiente',  UUID_TO_BIN(@u1)),
(UUID_TO_BIN(UUID()), 'Coordinar reunión mensual',      'Agendar sala y enviar invitaciones al equipo',              'pendiente',  UUID_TO_BIN(@u1)),
(UUID_TO_BIN(UUID()), 'Entregar propuesta técnica',     'Propuesta para el cliente Inversiones del Pacífico',        'completada', UUID_TO_BIN(@u3)),
(UUID_TO_BIN(UUID()), 'Revisar contratos nuevos',       'Validar cláusulas con el área legal',                       'pendiente',  UUID_TO_BIN(@u3)),
(UUID_TO_BIN(UUID()), 'Capacitación de personal',       'Preparar material para la capacitación del viernes',        'pendiente',  UUID_TO_BIN(@u4)),
(UUID_TO_BIN(UUID()), 'Auditoría de accesos del sistema','Verificar permisos y roles activos',                       'pendiente',  UUID_TO_BIN(@u5)),
(UUID_TO_BIN(UUID()), 'Reporte de ventas mensual',      'Consolidar datos de las 3 sucursales',                      'completada', UUID_TO_BIN(@u6)),
(UUID_TO_BIN(UUID()), 'Migración de servidor',          'Coordinar ventana de mantenimiento con infraestructura',    'pendiente',  UUID_TO_BIN(@u9)),
(UUID_TO_BIN(UUID()), 'Cierre contable marzo',          'Cuadrar cuentas con el área financiera antes del viernes',  'pendiente',  UUID_TO_BIN(@u10));
