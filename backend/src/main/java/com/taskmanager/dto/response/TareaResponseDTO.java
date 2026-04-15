package com.taskmanager.dto.response;

import com.taskmanager.entity.Tarea.EstadoTarea;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class TareaResponseDTO {

    private UUID id;
    private String titulo;
    private String descripcion;
    private EstadoTarea estado;
    private UUID usuarioId;
    private String usuarioNombre;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ReasignacionDTO> reasignaciones;

    @Data
    @Builder
    public static class ReasignacionDTO {
        private UUID id;
        private UUID usuarioOrigenId;
        private String usuarioOrigenNombre;
        private UUID usuarioDestinoId;
        private String usuarioDestinoNombre;
        private String motivo;
        private LocalDateTime reasignadoAt;
    }
}
