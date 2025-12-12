package com.unibo.notes.controller;

import com.unibo.notes.dto.CreateNoteRequest;
import com.unibo.notes.dto.NoteDTO;
import com.unibo.notes.dto.NoteVersionDTO;
import com.unibo.notes.dto.UpdateNoteRequest;
import com.unibo.notes.entity.Note;
import com.unibo.notes.service.NoteService;
import com.unibo.notes.service.VersionService;
import io.smallrye.jwt.auth.principal.JWTCallerPrincipal;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;
import java.util.stream.Collectors;

@Path("/api/notes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class NoteController {

    @Inject
    NoteService noteService;

    @Inject
    VersionService versionService;

    private Long getUserId(SecurityContext securityContext) {
        if (securityContext.getUserPrincipal() == null) {
            throw new SecurityException("No authentication token");
        }
        JWTCallerPrincipal principal = (JWTCallerPrincipal) securityContext.getUserPrincipal();
        return Long.parseLong(principal.getSubject());
    }

    @GET
    public Response getAllNotes(@Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        List<Note> notes = noteService.getAllNotesByUser(userId);
        List<NoteDTO> noteDTOs = notes.stream().map(this::toDTO).collect(Collectors.toList());
        return Response.ok(noteDTOs).build();
    }

    @GET
    @Path("/{noteId}")
    public Response getNoteById(@PathParam("noteId") Long noteId,
                                @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        Note note = noteService.getNoteById(noteId, userId);
        return Response.ok(toDTO(note)).build();
    }

    @GET
    @Path("/folder/{folderId}")
    public Response getNotesByFolder(@PathParam("folderId") Long folderId,
                                     @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        List<Note> notes = noteService.getNotesByFolder(folderId, userId);
        List<NoteDTO> noteDTOs = notes.stream().map(this::toDTO).collect(Collectors.toList());
        return Response.ok(noteDTOs).build();
    }

    @POST
    public Response createNote(@Valid CreateNoteRequest request,
                               @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        Note note = noteService.createNote(request, userId);
        return Response.status(Response.Status.CREATED).entity(toDTO(note)).build();
    }

    @PUT
    @Path("/{noteId}")
    public Response updateNote(@PathParam("noteId") Long noteId,
                               @Valid UpdateNoteRequest request,
                               @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        Note note = noteService.updateNote(noteId, request, userId);
        return Response.ok(toDTO(note)).build();
    }

    @DELETE
    @Path("/{noteId}")
    public Response deleteNote(@PathParam("noteId") Long noteId,
                               @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        noteService.deleteNote(noteId, userId);
        return Response.noContent().build();
    }

    @PUT
    @Path("/{noteId}/move")
    public Response moveNote(@PathParam("noteId") Long noteId,
                             MoveNoteRequest request,
                             @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        Note note = noteService.moveNoteToFolder(noteId, request.folderId, userId);
        return Response.ok(toDTO(note)).build();
    }

    @POST
    @Path("/{noteId}/copy")
    public Response copyNote(@PathParam("noteId") Long noteId,
                             @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        Note copy = noteService.copyNote(noteId, userId);
        return Response.status(Response.Status.CREATED).entity(toDTO(copy)).build();
    }

    @GET
    @Path("/search")
    public Response searchNotes(@QueryParam("q") String keyword,
                                @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        List<Note> notes = noteService.searchNotes(keyword, userId);
        List<NoteDTO> noteDTOs = notes.stream().map(this::toDTO).collect(Collectors.toList());
        return Response.ok(noteDTOs).build();
    }

    // Endpoints per versioning
    @GET
    @Path("/{noteId}/versions")
    public Response getVersions(@PathParam("noteId") Long noteId,
                                @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        List<NoteVersionDTO> versions = versionService.getNoteVersions(noteId, userId);
        return Response.ok(versions).build();
    }

    @GET
    @Path("/{noteId}/versions/{versionNumber}")
    public Response getSpecificVersion(@PathParam("noteId") Long noteId,
                                       @PathParam("versionNumber") Long versionNumber,
                                       @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        NoteVersionDTO version = versionService.getSpecificVersion(noteId, versionNumber, userId);
        return Response.ok(version).build();
    }

    @POST
    @Path("/{noteId}/versions/{versionNumber}/restore")
    public Response restoreVersion(@PathParam("noteId") Long noteId,
                                   @PathParam("versionNumber") Long versionNumber,
                                   @Context SecurityContext securityContext) {
        Long userId = getUserId(securityContext);
        Note note = versionService.restoreVersion(noteId, versionNumber, userId);
        return Response.ok(toDTO(note)).build();
    }

    private NoteDTO toDTO(Note note) {
        NoteDTO dto = new NoteDTO();
        dto.id = note.id;
        dto.title = note.title;
        dto.content = note.content;
        dto.ownerId = note.owner != null ? note.owner.id : null;
        dto.ownerUsername = null;
        dto.createdAt = note.createdAt;
        dto.updatedAt = note.updatedAt;
        dto.version = note.version;
        return dto;
    }

    // DTO interno per move request
    public static class MoveNoteRequest {
        public Long folderId;
    }
}