package com.example.MusiciansInfoBackend.services;

import com.example.MusiciansInfoBackend.models.Genre;
import com.example.MusiciansInfoBackend.repositories.GenreRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class GenreService {
    
    private GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }
    
    public void saveGenre(Genre genre){
        genreRepository.save(genre);
    }
    
    public List<Genre> findAll() {
       return genreRepository.findAll();
    }
    
}
