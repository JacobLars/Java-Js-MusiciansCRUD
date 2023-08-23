package com.example.MusiciansInfoBackend.repositories;

import com.example.MusiciansInfoBackend.models.Song;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SongRepository extends JpaRepository<Song, Integer>{
    
}
