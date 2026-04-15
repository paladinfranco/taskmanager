package com.taskmanager.controller;

import com.taskmanager.dto.request.ReasignacionRequestDTO;
import com.taskmanager.dto.request.TareaRequestDTO;
import com.taskmanager.dto.response.ApiResponseDTO;
import com.taskmanager.dto.response.TareaResponseDTO;
import com.taskmanager.service.TareaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tareas")
@RequiredArgsConstructor
public class TareaController {

    private final TareaService tareaService;

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<ApiResponseDTO<List<TareaResponseDTO>>> findByUsuario(
            @PathVariable UUID usuarioId) {
        List<TareaResponseDTO> tareas = tareaService.findByUsuarioId(usuarioId);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Tareas obtenidas correctamente", tareas));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<TareaResponseDTO>> findById(@PathVariable UUID id) {
        TareaResponseDTO tarea = tareaService.findById(id);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Tarea obtenida correctamente", tarea));
    }

    @PostMapping
    public ResponseEntity<ApiResponseDTO<TareaResponseDTO>> create(
            @Valid @RequestBody TareaRequestDTO dto) {
        TareaResponseDTO created = tareaService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponseDTO.ok("Tarea creada correctamente", created));
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<ApiResponseDTO<TareaResponseDTO>> toggleEstado(
            @PathVariable UUID id) {
        TareaResponseDTO updated = tareaService.toggleEstado(id);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Estado de tarea actualizado correctamente", updated));
    }

    @PatchMapping("/{id}/reasignar")
    public ResponseEntity<ApiResponseDTO<TareaResponseDTO>> reasignar(
            @PathVariable UUID id,
            @Valid @RequestBody ReasignacionRequestDTO dto) {
        TareaResponseDTO updated = tareaService.reasignar(id, dto);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Tarea reasignada correctamente", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponseDTO<Void>> delete(@PathVariable UUID id) {
        tareaService.delete(id);
        return ResponseEntity.ok(
                ApiResponseDTO.ok("Tarea eliminada correctamente", null));
    }
}
