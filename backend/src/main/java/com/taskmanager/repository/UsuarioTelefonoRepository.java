package com.taskmanager.repository;

import com.taskmanager.entity.UsuarioTelefono;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UsuarioTelefonoRepository extends JpaRepository<UsuarioTelefono, UUID> {

    List<UsuarioTelefono> findByUsuarioId(UUID usuarioId);

    void deleteByUsuarioId(UUID usuarioId);
}
