package com.taskmanager.service;

import com.taskmanager.dto.request.UsuarioRequestDTO;
import com.taskmanager.dto.response.UsuarioResponseDTO;

import java.util.List;
import java.util.UUID;

public interface UsuarioService {

    List<UsuarioResponseDTO> findAll();

    UsuarioResponseDTO findById(UUID id);

    UsuarioResponseDTO create(UsuarioRequestDTO dto);

    UsuarioResponseDTO update(UUID id, UsuarioRequestDTO dto);

    void delete(UUID id);
}
