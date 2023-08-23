package com.example.MusiciansInfoBackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Band {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String image;
    private String logo;
    private String yearsActive;
    @Column(columnDefinition = "TEXT")
    private String description;

    public Band() {
    }

    public Band(String name, String image, String logo, String yearsActive, String description) {
        this.name = name;
        this.image = image;
        this.logo = logo;
        this.yearsActive = yearsActive;
        this.description = description;
    }
    
    @ManyToMany(mappedBy = "bands")
    private List<Musician> musicians;
    
    @OneToMany
    private List<Album> albums;
    
    @ManyToMany(mappedBy = "bands")
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getYearsActive() {
        return yearsActive;
    }

    public void setYearsActive(String yearsActive) {
        this.yearsActive = yearsActive;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Musician> getMusicians() {
        return musicians;
    }

    public void setMusicians(List<Musician> musicians) {
        this.musicians = musicians;
    }

    public List<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(List<Album> albums) {
        this.albums = albums;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
    
    public void addMusician(Musician musician){
        musicians.add(musician);
    }
    
    public void deleteMusician(Musician musician){
        musicians.remove(musician);
    }
    
    public void addAlbum(Album album){
        albums.add(album);
    }
    
    public void addGenre(Genre genre){
        genres.add(genre);
    }
    
    
    
}
