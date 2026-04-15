package com.taskmanager.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.UUID;

@Data
public class ReasignacionRequestDTO {

    @NotNull(message = "El usuario destino es obligatorio")
    private UUID usuarioDestinoId;

    @NotBlank(message = "El motivo de reasignación es obligatorio")
    @Size(min = 5, max = 500, message = "El motivo debe tener entre 5 y 500 caracteres")
    private String motivo;
}
