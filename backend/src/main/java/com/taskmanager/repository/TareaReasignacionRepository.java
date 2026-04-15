package com.taskmanager.repository;

import com.taskmanager.entity.TareaReasignacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TareaReasignacionRepository extends JpaRepository<TareaReasignacion, UUID> {

    List<TareaReasignacion> findByTareaIdOrderByReasignadoAtDesc(UUID tareaId);
}
