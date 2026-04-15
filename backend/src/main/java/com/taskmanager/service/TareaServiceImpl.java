package com.taskmanager.service;

import com.taskmanager.dto.request.ReasignacionRequestDTO;
import com.taskmanager.dto.request.TareaRequestDTO;
import com.taskmanager.dto.response.TareaResponseDTO;
import com.taskmanager.entity.Tarea;
import com.taskmanager.entity.Tarea.EstadoTarea;
import com.taskmanager.entity.TareaReasignacion;
import com.taskmanager.entity.Usuario;
import com.taskmanager.exception.ResourceNotFoundException;
import com.taskmanager.repository.TareaRepository;
import com.taskmanager.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TareaServiceImpl implements TareaService {

    private final TareaRepository tareaRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional(readOnly = true)
    public List<TareaResponseDTO> findByUsuarioId(UUID usuarioId) {
        if (!usuarioRepository.existsById(usuarioId)) {
            throw new ResourceNotFoundException("Usuario", "id", usuarioId);
        }
        return tareaRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public TareaResponseDTO findById(UUID id) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea", "id", id));
        return toResponseDTO(tarea);
    }

    @Override
    public TareaResponseDTO create(TareaRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", dto.getUsuarioId()));

        Tarea tarea = Tarea.builder()
                .titulo(dto.getTitulo())
                .descripcion(dto.getDescripcion())
                .estado(EstadoTarea.pendiente)
                .usuario(usuario)
                .build();

        return toResponseDTO(tareaRepository.save(tarea));
    }

    @Override
    public TareaResponseDTO toggleEstado(UUID id) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea", "id", id));

        tarea.setEstado(tarea.getEstado() == EstadoTarea.pendiente
                ? EstadoTarea.completada
                : EstadoTarea.pendiente);

        return toResponseDTO(tareaRepository.save(tarea));
    }

    @Override
    public TareaResponseDTO reasignar(UUID id, ReasignacionRequestDTO dto) {
        Tarea tarea = tareaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea", "id", id));

        Usuario destino = usuarioRepository.findById(dto.getUsuarioDestinoId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario destino", "id", dto.getUsuarioDestinoId()));

        TareaReasignacion reasignacion = TareaReasignacion.builder()
                .tarea(tarea)
                .usuarioOrigen(tarea.getUsuario())
                .usuarioDestino(destino)
                .motivo(dto.getMotivo())
                .build();

        tarea.getReasignaciones().add(reasignacion);
        tarea.setUsuario(destino);

        return toResponseDTO(tareaRepository.save(tarea));
    }

    @Override
    public void delete(UUID id) {
        if (!tareaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Tarea", "id", id);
        }
        tareaRepository.deleteById(id);
    }

    private TareaResponseDTO toResponseDTO(Tarea t) {
        List<TareaResponseDTO.ReasignacionDTO> reasignaciones = t.getReasignaciones().stream()
                .map(r -> TareaResponseDTO.ReasignacionDTO.builder()
                        .id(r.getId())
                        .usuarioOrigenId(r.getUsuarioOrigen().getId())
                        .usuarioOrigenNombre(r.getUsuarioOrigen().getNombre())
                        .usuarioDestinoId(r.getUsuarioDestino().getId())
                        .usuarioDestinoNombre(r.getUsuarioDestino().getNombre())
                        .motivo(r.getMotivo())
                        .reasignadoAt(r.getReasignadoAt())
                        .build())
                .collect(Collectors.toList());

        return TareaResponseDTO.builder()
                .id(t.getId())
                .titulo(t.getTitulo())
                .descripcion(t.getDescripcion())
                .estado(t.getEstado())
                .usuarioId(t.getUsuario().getId())
                .usuarioNombre(t.getUsuario().getNombre())
                .createdAt(t.getCreatedAt())
                .updatedAt(t.getUpdatedAt())
                .reasignaciones(reasignaciones)
                .build();
    }
}
