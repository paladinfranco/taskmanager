package com.taskmanager.repository;

import com.taskmanager.entity.Tarea;
import com.taskmanager.entity.Tarea.EstadoTarea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TareaRepository extends JpaRepository<Tarea, UUID> {

    List<Tarea> findByUsuarioId(UUID usuarioId);

    List<Tarea> findByUsuarioIdAndEstado(UUID usuarioId, EstadoTarea estado);

    long countByUsuarioId(UUID usuarioId);

    long countByUsuarioIdAndEstado(UUID usuarioId, EstadoTarea estado);
}
