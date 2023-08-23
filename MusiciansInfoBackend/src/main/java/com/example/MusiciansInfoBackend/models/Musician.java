package com.example.MusiciansInfoBackend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import java.util.List;

@Entity
public class Musician {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String fullName;
    private String image;
    private String dateOfBirth;
    private String dateOfDeath;
    private String placeOfBirth;
    private String placeOfDeath;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String yearsActive;
    private List<String> instruments;
    
    @ManyToMany
    @JsonIgnore
    private List<Band> bands;
    
    @OneToMany
    private List<Album> albums;
    
    @ManyToMany(mappedBy = "musicians")
    private List<Genre> genres;
    
    public Musician() {
    }

    public Musician(String name, 
            String fullName, 
            String image, 
            String dateOfBirth,
            String dateOfDeath,
            String placeOfBirth, 
            String placeOfDeath, 
            String description, 
            String yearsActive, 
            List<String> instruments) {
        this.name = name;
        this.fullName = fullName;
        this.image = image;
        this.dateOfBirth = dateOfBirth;
        this.dateOfDeath = dateOfDeath;
        this.placeOfBirth = placeOfBirth;
        this.placeOfDeath = placeOfDeath;
        this.description = description;
        this.yearsActive = yearsActive;
        this.instruments = instruments;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getDateOfDeath() {
        return dateOfDeath;
    }

    public void setDateOfDeath(String dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public String getPlaceOfDeath() {
        return placeOfDeath;
    }

    public void setPlaceOfDeath(String placeOfDeath) {
        this.placeOfDeath = placeOfDeath;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getYearsActive() {
        return yearsActive;
    }

    public void setYearsActive(String yearsActive) {
        this.yearsActive = yearsActive;
    }

    public List<String> getInstruments() {
        return instruments;
    }

    public void setInstruments(List<String> instruments) {
        this.instruments = instruments;
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

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }
    
    public void addBands(Band band){
        bands.add(band);
    }
    
    public void deleteBand(Band band){
        bands.remove(band);
    }
    
    public void addAlbum(Album album){
        albums.add(album);
    }
    
    public void addGenre(Genre genre){
        genres.add(genre);
    }
    
    
    
}
