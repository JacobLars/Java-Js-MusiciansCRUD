package com.example.MusiciansInfoBackend.controllers;

import com.example.MusiciansInfoBackend.models.Album;
import com.example.MusiciansInfoBackend.models.Band;
import com.example.MusiciansInfoBackend.models.Musician;
import com.example.MusiciansInfoBackend.models.Song;
import com.example.MusiciansInfoBackend.services.MusicService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/music")
public class MusicController {

    private MusicService musicService;

    public MusicController(MusicService musicService) {
        this.musicService = musicService;
    }

    @PutMapping("/musician/band/add")
    @CrossOrigin("http://127.0.0.1:5500")
    public void addMusicianToBand(
            @RequestParam(name = "bandId") int bandId,
            @RequestParam(name = "musicianId") int musicianId) {

        musicService.addMusicianToBand(bandId, musicianId);
    }

    @PostMapping("/musician/album/save")
    @CrossOrigin("http://127.0.0.1:5500")
    public void saveAlbumToMusician(
            @RequestBody Album album,
            @RequestParam(name = "musicianId") int id,
            @RequestParam(name = "genres")List<String> genres) {
        musicService.saveAlbumToMusician(album, id, genres);
    }

    @PostMapping("/band/album/save")
    @CrossOrigin("http://127.0.0.1:5500")
    public void saveAlbumToBand(
            @RequestBody Album album,
            @RequestParam(name = "bandId") int bandId,
            @RequestParam(name = "genres")List<String> genres) {
        musicService.saveAlbumToBand(album, bandId, genres);
    }

    @PostMapping("/album/song/save")
    public void saveSongToAlbum(
            @RequestBody Song song,
            @RequestParam(name = "albumId") int albumId) {

        musicService.saveSongToAlbum(song, albumId);
    }

    @PutMapping("/musician/band/delete")
    public void deleteMusicianBandConnection(
            @RequestParam(name = "bandId") int bandId,
            @RequestParam(name = "musicianId") int musicianId) {
        musicService.deleteMusicianAndBandConnection(bandId, musicianId);
    }

    @PostMapping("/musician/genres/save")
    @CrossOrigin("http://127.0.0.1:5500")
    public ResponseEntity<String> saveMusicianAndAddGenres(
            @RequestBody Musician musician,
            @RequestParam(name = "genres") List<String> genres) {
        if (musician.getDateOfDeath().isBlank() && musician.getPlaceOfDeath().isBlank()) {
            musician.setPlaceOfDeath(null);
            musician.setDateOfDeath(null);
        }
        musicService.saveMusicianAndAddGenres(musician, genres);
        return ResponseEntity.ok("Musician & Genres saved successfully");

    }

    @PostMapping("/band/genres/save")
    @CrossOrigin("http://127.0.0.1:5500")
    public ResponseEntity<String> saveBandAndAddGenres(
            @RequestBody Band band,
            @RequestParam(name = "genres") List<String> genres) {

        musicService.saveBandAndAddGenres(band, genres);
        return ResponseEntity.ok("Band & Genres saved successfully");

    }
    
}
