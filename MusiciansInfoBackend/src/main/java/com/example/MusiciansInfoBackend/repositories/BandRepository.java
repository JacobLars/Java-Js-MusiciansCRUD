package com.example.MusiciansInfoBackend.repositories;

import com.example.MusiciansInfoBackend.models.Band;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BandRepository extends JpaRepository<Band, Integer>{
    
}
