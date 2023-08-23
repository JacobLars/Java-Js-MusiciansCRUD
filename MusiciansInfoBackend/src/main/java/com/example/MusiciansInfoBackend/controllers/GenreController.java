package com.example.MusiciansInfoBackend.controllers;

import com.example.MusiciansInfoBackend.models.Genre;
import com.example.MusiciansInfoBackend.services.GenreService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/genre")
public class GenreController {
    
    private GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }
    
    @PostMapping("/save")
    public void saveGenre(@RequestBody Genre genre){
        genreService.saveGenre(genre);
    }
    
    @GetMapping("/find/all")
    @CrossOrigin("http://127.0.0.1:5500")
    public List<Genre> findAll(){
        return genreService.findAll();
    }
    
}
