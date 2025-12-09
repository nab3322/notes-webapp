package com.unibo.notes.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "note_versions")
public class NoteVersion extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "note_id", nullable = false)
    public Long noteId;

    @Column(nullable = false, length = 280)
    public String content;

    @Column(name = "version_number", nullable = false)
    public Long versionNumber;

    @Column(name = "modified_by", nullable = false)
    public Long modifiedBy;

    @Column(name = "modified_at", nullable = false)
    public LocalDateTime modifiedAt;

    @PrePersist
    protected void onCreate() {
        modifiedAt = LocalDateTime.now();
    }
}