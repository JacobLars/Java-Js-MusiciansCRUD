package com.example.MusiciansInfoBackend.repositories;

import com.example.MusiciansInfoBackend.models.Musician;
import org.springframework.data.jpa.repository.JpaRepository;



public interface MusicianRepository extends JpaRepository<Musician, Integer>{
    
}
