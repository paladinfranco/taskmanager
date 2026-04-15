package com.taskmanager.controller;

import com.taskmanager.dto.request.UsuarioRequestDTO;
import com.taskmanager.dto.response.ApiResponseDTO;
import com.taskmanager.dto.response.UsuarioResponseDTO;
import com.taskmanager.service.UsuarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<ApiResponseDTO<List<UsuarioResponseDTO>>> findAll() {
        List<UsuarioResponseDTO> usuarios = usuarioService.findAll();
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Usuarios obtenidos correctamente", usuarios));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<UsuarioResponseDTO>> findById(@PathVariable UUID id) {
        UsuarioResponseDTO usuario = usuarioService.findById(id);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Usuario obtenido correctamente", usuario));
    }

    @PostMapping
    public ResponseEntity<ApiResponseDTO<UsuarioResponseDTO>> create(
            @Valid @RequestBody UsuarioRequestDTO dto) {
        UsuarioResponseDTO created = usuarioService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok("Usuario creado correctamente", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<UsuarioResponseDTO>> update(
            @PathVariable UUID id,
            @Valid @RequestBody UsuarioRequestDTO dto) {
        UsuarioResponseDTO updated = usuarioService.update(id, dto);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Usuario actualizado correctamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> delete(@PathVariable UUID id) {
        usuarioService.delete(id);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Usuario eliminado correctamente", null));
    }
}
