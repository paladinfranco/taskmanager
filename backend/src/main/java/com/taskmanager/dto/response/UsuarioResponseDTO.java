package com.taskmanager.dto.response;

import com.taskmanager.entity.Usuario.EstadoUsuario;
import com.taskmanager.entity.UsuarioTelefono.TipoTelefono;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class UsuarioResponseDTO {

    private UUID id;
    private String nombre;
    private String email;
    private String ciudad;
    private EstadoUsuario estado;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<TelefonoDTO> telefonos;
    private long totalTareas;
    private long tareasCompletadas;
    private long tareasPendientes;

    @Data
    @Builder
    public static class TelefonoDTO {
        private UUID id;
        private String telefono;
        private TipoTelefono tipo;
    }
}
