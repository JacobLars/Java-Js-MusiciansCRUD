package com.example.MusiciansInfoBackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import java.util.List;

@Entity
public class Song {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int streams;
    private String duration;
    @Column(columnDefinition = "TEXT")
    private String description;

    public Song() {
    }

    public Song(String name, int streams, String duration, String description) {
        this.name = name;
        this.streams = streams;
        this.duration = duration;
        this.description = description;
    }
    
    @ManyToOne
    @JsonIgnore
    private Album album;
    
    @ManyToMany(mappedBy = "songs")
    private List<Genre> genres;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStreams() {
        return streams;
    }

    public void setStreams(int streams) {
        this.streams = streams;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Album getAlbum() {
        return album;
    }

    public void setAlbum(Album album) {
        this.album = album;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
    
    public void addGenre(Genre genre){
        genres.add(genre);
    }
    
}
