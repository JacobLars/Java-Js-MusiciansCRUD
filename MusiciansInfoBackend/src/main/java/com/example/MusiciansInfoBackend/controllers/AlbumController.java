
package com.example.MusiciansInfoBackend.controllers;

import com.example.MusiciansInfoBackend.models.Album;
import com.example.MusiciansInfoBackend.services.AlbumService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/album")
public class AlbumController {
    
    private AlbumService albumService;

    public AlbumController(AlbumService albumService) {
        this.albumService = albumService;
    }
    
    
    @PostMapping("/save")
    public void saveAlbum(@RequestBody Album album){
        albumService.saveAlbum(album);
    }
    
    @GetMapping("/find/all")
    @CrossOrigin("http://127.0.0.1:5500")
    public List<Album> findAll(){
        return albumService.findAll();
    }
    
}
