package com.example.MusiciansInfoBackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import java.util.List;

@Entity
public class Genre {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    public Genre() {
    }

    public Genre(String name) {
        this.name = name;
    }
    

    @ManyToMany
    @JsonIgnore
    private List<Musician> musicians;
    
    @ManyToMany
    @JsonIgnore
    private List<Band> bands;
    
    @ManyToMany
    @JsonIgnore
    private List<Album> albums;
        
    @ManyToMany
    @JsonIgnore
    private List<Song> songs;

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Musician> getMusicians() {
        return musicians;
    }

    public void setMusicians(List<Musician> musicians) {
        this.musicians = musicians;
    }

    public List<Band> getBands() {
        return bands;
    }

    public void setBands(List<Band> bands) {
        this.bands = bands;
    }

    public List<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }

    public List<Song> getSongs() {
        return songs;
    }

    public void setSongs(List<Song> songs) {
        this.songs = songs;
    }
    
    
    public void addMusicians(Musician musician){
        musicians.add(musician);
    }
    
    public void addBand(Band band){
        bands.add(band);
    }
    
    public void addAlbum(Album album){
        albums.add(album);
    }
    
    public void addSong(Song song){
        songs.add(song);
    }
}
