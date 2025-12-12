package com.unibo.notes.controller;

import com.unibo.notes.dto.PermissionDTO;
import com.unibo.notes.dto.ShareNoteRequest;
import com.unibo.notes.entity.Note;
import com.unibo.notes.service.PermissionService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;

@Path("/api/permissions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PermissionController {

    @Inject
    PermissionService permissionService;

    @POST
    @Path("/notes/{noteId}/share")
    public Response shareNote(@PathParam("noteId") Long noteId,
                              @Valid ShareNoteRequest request,
                              @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        PermissionDTO permission = permissionService.shareNote(noteId, request, userId);
        return Response.status(Response.Status.CREATED).entity(permission).build();
    }

    @GET
    @Path("/notes/{noteId}")
    public Response getNotePermissions(@PathParam("noteId") Long noteId,
                                       @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        List<PermissionDTO> permissions = permissionService.getNotePermissions(noteId, userId);
        return Response.ok(permissions).build();
    }

    @DELETE
    @Path("/notes/{noteId}/users/{targetUserId}")
    public Response revokePermission(@PathParam("noteId") Long noteId,
                                     @PathParam("targetUserId") Long targetUserId,
                                     @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        permissionService.revokePermission(noteId, targetUserId, userId);
        return Response.noContent().build();
    }

    @GET
    @Path("/shared-with-me")
    public Response getSharedNotes(@Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        List<Note> sharedNotes = permissionService.getSharedNotes(userId);
        return Response.ok(sharedNotes).build();
    }
}