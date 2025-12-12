package com.unibo.notes.dto;

import java.time.LocalDateTime;
import java.util.List;

public class NoteDTO {
    public Long id;
    public String title;
    public String content;
    public Long ownerId;
    public String ownerUsername;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
    public Long version;
    public List<String> tags;
    public List<CollaboratorDTO> collaborators;

    public static class CollaboratorDTO {
        public Long userId;
        public String username;
        public String permission; // "READ" or "WRITE"
    }
}