package com.taskmanager.service;

import com.taskmanager.dto.request.ReasignacionRequestDTO;
import com.taskmanager.dto.request.TareaRequestDTO;
import com.taskmanager.dto.response.TareaResponseDTO;

import java.util.List;
import java.util.UUID;

public interface TareaService {

    List<TareaResponseDTO> findByUsuarioId(UUID usuarioId);

    TareaResponseDTO findById(UUID id);

    TareaResponseDTO create(TareaRequestDTO dto);

    TareaResponseDTO toggleEstado(UUID id);

    TareaResponseDTO reasignar(UUID id, ReasignacionRequestDTO dto);

    void delete(UUID id);
}
