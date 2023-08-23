package com.example.MusiciansInfoBackend.controllers;

import com.example.MusiciansInfoBackend.models.Musician;
import com.example.MusiciansInfoBackend.services.MusicianService;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/musician")
public class MusicianController {

    private MusicianService musicianService;

    public MusicianController(MusicianService musicianService) {
        this.musicianService = musicianService;
    }

    @PostMapping("/save")
    @CrossOrigin("http://127.0.0.1:5500")
    public ResponseEntity<String> saveMusician(@RequestBody Musician musician) {
        try {
            musicianService.saveMusician(musician);
            return ResponseEntity.ok("Musician saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save musician: " + e.getMessage());
        }
    }

    @GetMapping("/find/all")
    @CrossOrigin("http://127.0.0.1:5500")
    public List<Musician> findAllMusicians() {
        return musicianService.findAll();
    }
    
    @GetMapping("/find/{id}")
    @CrossOrigin("http://127.0.0.1:5500")
    public Musician findByMusicianById(@PathVariable("id") int id){
        return musicianService.findById(id);
    }

}
