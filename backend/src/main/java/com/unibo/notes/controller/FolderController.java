package com.unibo.notes.controller;

import com.unibo.notes.entity.Folder;
import com.unibo.notes.service.FolderService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;

import java.util.List;

@Path("/api/folders")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FolderController {

    @Inject
    FolderService folderService;

    @GET
    public Response getRootFolders(@Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        List<Folder> folders = folderService.getRootFolders(userId);
        return Response.ok(folders).build();
    }

    @GET
    @Path("/{folderId}")
    public Response getFolderById(@PathParam("folderId") Long folderId,
                                  @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        Folder folder = folderService.getFolderById(folderId, userId);
        return Response.ok(folder).build();
    }

    @GET
    @Path("/{folderId}/subfolders")
    public Response getSubfolders(@PathParam("folderId") Long folderId,
                                  @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        List<Folder> subfolders = folderService.getSubfolders(folderId, userId);
        return Response.ok(subfolders).build();
    }

    @POST
    public Response createFolder(CreateFolderRequest request,
                                 @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        Folder folder = folderService.createFolder(
                request.name,
                request.description,
                request.parentId,
                userId
        );
        return Response.status(Response.Status.CREATED).entity(folder).build();
    }

    @PUT
    @Path("/{folderId}")
    public Response updateFolder(@PathParam("folderId") Long folderId,
                                 UpdateFolderRequest request,
                                 @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        Folder folder = folderService.updateFolder(folderId, request.name, request.description, userId);
        return Response.ok(folder).build();
    }

    @DELETE
    @Path("/{folderId}")
    public Response deleteFolder(@PathParam("folderId") Long folderId,
                                 @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        folderService.deleteFolder(folderId, userId);
        return Response.noContent().build();
    }

    @GET
    @Path("/{folderId}/notes/count")
    public Response countNotes(@PathParam("folderId") Long folderId,
                               @Context SecurityContext securityContext) {
        Long userId = Long.parseLong(securityContext.getUserPrincipal().getName());
        long count = folderService.countNotesByFolder(folderId, userId);
        return Response.ok(new CountResponse(count)).build();
    }

    // DTO interni per request/response
    public static class CreateFolderRequest {
        public String name;
        public String description;
        public Long parentId;
    }

    public static class UpdateFolderRequest {
        public String name;
        public String description;
    }

    public static class CountResponse {
        public long count;
        public CountResponse(long count) {
            this.count = count;
        }
    }
}