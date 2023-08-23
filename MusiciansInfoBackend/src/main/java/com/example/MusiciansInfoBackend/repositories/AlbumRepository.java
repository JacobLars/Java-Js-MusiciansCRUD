package com.example.MusiciansInfoBackend.repositories;

import com.example.MusiciansInfoBackend.models.Album;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AlbumRepository extends JpaRepository<Album, Integer>{
    
}
