package com.taskmanager.dto.request;

import com.taskmanager.entity.Usuario.EstadoUsuario;
import com.taskmanager.entity.UsuarioTelefono.TipoTelefono;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UsuarioRequestDTO {

    @NotBlank(message = "El nombre es obligatorio")
    @Size(min = 2, max = 100, message = "El nombre debe tener entre 2 y 100 caracteres")
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "El email no tiene un formato válido")
    @Size(max = 150, message = "El email no puede superar 150 caracteres")
    private String email;

    @Size(max = 80, message = "La ciudad no puede superar 80 caracteres")
    private String ciudad;

    private EstadoUsuario estado = EstadoUsuario.activo;

    @Valid
    private List<TelefonoDTO> telefonos = new ArrayList<>();

    @Data
    public static class TelefonoDTO {

        @NotBlank(message = "El número de teléfono es obligatorio")
        @Size(max = 20, message = "El teléfono no puede superar 20 caracteres")
        private String telefono;

        private TipoTelefono tipo = TipoTelefono.principal;
    }
}
