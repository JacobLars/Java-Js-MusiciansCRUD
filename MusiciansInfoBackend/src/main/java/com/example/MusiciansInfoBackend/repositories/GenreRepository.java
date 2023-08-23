package com.example.MusiciansInfoBackend.repositories;

import com.example.MusiciansInfoBackend.models.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface GenreRepository extends JpaRepository<Genre, Integer>{
    
    @Query("SELECT g FROM Genre g WHERE g.name = :name")
    Genre findGenreByName(@Param("name") String name);
    
}
