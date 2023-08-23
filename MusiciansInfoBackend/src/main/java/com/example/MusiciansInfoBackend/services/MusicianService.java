package com.example.MusiciansInfoBackend.services;

import com.example.MusiciansInfoBackend.models.Musician;
import com.example.MusiciansInfoBackend.repositories.MusicianRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MusicianService {

    private MusicianRepository musicianRepository;

    public MusicianService(MusicianRepository musicianRepository) {
        this.musicianRepository = musicianRepository;
    }

    public void saveMusician(Musician musiscian) {
        musicianRepository.save(musiscian);
    }

    public List<Musician> findAll() {
        return musicianRepository.findAll();
    }

    public Musician findById(int id) {
        return musicianRepository.findById(id).get();
    }

    

}
