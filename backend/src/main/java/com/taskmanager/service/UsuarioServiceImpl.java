package com.taskmanager.service;

import com.taskmanager.dto.request.UsuarioRequestDTO;
import com.taskmanager.dto.response.UsuarioResponseDTO;
import com.taskmanager.entity.Tarea.EstadoTarea;
import com.taskmanager.entity.Usuario;
import com.taskmanager.entity.UsuarioTelefono;
import com.taskmanager.exception.BusinessException;
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
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final TareaRepository tareaRepository;

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioResponseDTO findById(UUID id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));
        return toResponseDTO(usuario);
    }

    @Override
    public UsuarioResponseDTO create(UsuarioRequestDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("Ya existe un usuario con el email: " + dto.getEmail());
        }
        Usuario usuario = Usuario.builder()
                .nombre(dto.getNombre())
                .email(dto.getEmail())
                .ciudad(dto.getCiudad())
                .estado(dto.getEstado())
                .build();

        if (dto.getTelefonos() != null) {
            dto.getTelefonos().forEach(t -> {
                UsuarioTelefono telefono = UsuarioTelefono.builder()
                        .telefono(t.getTelefono())
                        .tipo(t.getTipo())
                        .usuario(usuario)
                        .build();
                usuario.getTelefonos().add(telefono);
            });
        }
        return toResponseDTO(usuarioRepository.save(usuario));
    }

    @Override
    public UsuarioResponseDTO update(UUID id, UsuarioRequestDTO dto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "id", id));

        if (usuarioRepository.existsByEmailAndIdNot(dto.getEmail(), id)) {
            throw new BusinessException("Ya existe otro usuario con el email: " + dto.getEmail());
        }

        usuario.setNombre(dto.getNombre());
        usuario.setEmail(dto.getEmail());
        usuario.setCiudad(dto.getCiudad());
        usuario.setEstado(dto.getEstado());

        usuario.getTelefonos().clear();
        if (dto.getTelefonos() != null) {
            dto.getTelefonos().forEach(t -> {
                UsuarioTelefono telefono = UsuarioTelefono.builder()
                        .telefono(t.getTelefono())
                        .tipo(t.getTipo())
                        .usuario(usuario)
                        .build();
                usuario.getTelefonos().add(telefono);
            });
        }
        return toResponseDTO(usuarioRepository.save(usuario));
    }

    @Override
    public void delete(UUID id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario", "id", id);
        }
        usuarioRepository.deleteById(id);
    }

    private UsuarioResponseDTO toResponseDTO(Usuario u) {
        long total = tareaRepository.countByUsuarioId(u.getId());
        long completadas = tareaRepository.countByUsuarioIdAndEstado(u.getId(), EstadoTarea.completada);

        List<UsuarioResponseDTO.TelefonoDTO> telefonos = u.getTelefonos().stream()
                .map(t -> UsuarioResponseDTO.TelefonoDTO.builder()
                        .id(t.getId())
                        .telefono(t.getTelefono())
                        .tipo(t.getTipo())
                        .build())
                .collect(Collectors.toList());

        return UsuarioResponseDTO.builder()
                .id(u.getId())
                .nombre(u.getNombre())
                .email(u.getEmail())
                .ciudad(u.getCiudad())
                .estado(u.getEstado())
                .createdAt(u.getCreatedAt())
                .updatedAt(u.getUpdatedAt())
                .telefonos(telefonos)
                .totalTareas(total)
                .tareasCompletadas(completadas)
                .tareasPendientes(total - completadas)
                .build();
    }
}
