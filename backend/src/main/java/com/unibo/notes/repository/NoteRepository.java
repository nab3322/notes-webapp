package com.unibo.notes.repository;

import com.unibo.notes.entity.Note;
import com.unibo.notes.entity.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class NoteRepository implements PanacheRepository<Note> {

    public List<Note> findByOwner(User owner) {
        return list("owner", owner);
    }

    public List<Note> findByOwnerId(Long ownerId) {
        return list("owner.id", ownerId);
    }

    public Optional<Note> findByIdAndOwner(Long noteId, Long ownerId) {
        return find("id = ?1 and owner.id = ?2", noteId, ownerId).firstResultOptional();
    }

    public List<Note> searchByContent(String keyword, Long ownerId) {
        return list("(lower(title) like lower(?1) or lower(content) like lower(?1)) and owner.id = ?2",
                "%" + keyword + "%", ownerId);
    }

    public List<Note> findByTag(String tagName, Long ownerId) {
        return list("select distinct n from Note n join n.tags t where lower(t.name) = lower(?1) and n.owner.id = ?2",
                tagName, ownerId);
    }

    public long countByOwner(Long ownerId) {
        return count("owner.id", ownerId);
    }
}