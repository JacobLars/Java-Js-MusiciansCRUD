package com.example.MusiciansInfoBackend.services;

import com.example.MusiciansInfoBackend.models.Album;
import com.example.MusiciansInfoBackend.models.Band;
import com.example.MusiciansInfoBackend.models.Genre;
import com.example.MusiciansInfoBackend.models.Musician;
import com.example.MusiciansInfoBackend.models.Song;
import com.example.MusiciansInfoBackend.repositories.AlbumRepository;
import com.example.MusiciansInfoBackend.repositories.BandRepository;
import com.example.MusiciansInfoBackend.repositories.GenreRepository;
import com.example.MusiciansInfoBackend.repositories.MusicianRepository;
import com.example.MusiciansInfoBackend.repositories.SongRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class MusicService {
    
    private AlbumRepository albumRepository;
    private BandRepository bandRepository;
    private GenreRepository genreRepository;
    private MusicianRepository musicianRepository;
    private SongRepository songRepository;
    
    public MusicService(AlbumRepository albumRepository, BandRepository bandRepository, GenreRepository genreRepository, MusicianRepository musicianRepository, SongRepository songRepository) {
        this.albumRepository = albumRepository;
        this.bandRepository = bandRepository;
        this.genreRepository = genreRepository;
        this.musicianRepository = musicianRepository;
        this.songRepository = songRepository;
    }
    
    public void addMusicianToBand(int bandId, int musicianId) {
        
        Band band = bandRepository.findById(bandId).get();
        Musician musician = musicianRepository.findById(musicianId).get();
        
        band.addMusician(musician);
        musician.addBands(band);
        
        bandRepository.save(band);
        musicianRepository.save(musician);
    }
    
    public void saveAlbumToMusician(Album album, int musicianId, List<String> genres) {
        Musician musician = musicianRepository.findById(musicianId).get();
        musician.addAlbum(album);
        album.setMusician(musician);
        albumRepository.save(album);
        List<Genre> genreList = saveGenresToSubject(genres, album);
        album.setGenres(genreList);
        musicianRepository.save(musician);
    }
    
    public void saveAlbumToBand(Album album, int bandId) {
        Band band = bandRepository.findById(bandId).get();
        band.addAlbum(album);
        album.setBand(band);
        albumRepository.save(album);
        bandRepository.save(band);
    }
    
    public void saveSongToAlbum(Song song, int albumId) {
        Album album = albumRepository.findById(albumId).get();
        album.addSong(song);
        song.setAlbum(album);
        songRepository.save(song);
        albumRepository.save(album);
    }

    
    public List<Genre> saveGenresToSubject(List<String> genres, Object subject) {
        
        List<Genre> genresList = new ArrayList<>();
        
        for (String genreName : genres) {
            Genre genre = genreRepository.findGenreByName(genreName);
            if (subject instanceof Musician musician) {                
                genre.addMusicians(musician);
            } else if (subject instanceof Band band) {
                genre.addBand(band);
            } else if (subject instanceof Album album) {
                genre.addAlbum(album);
            } else if (subject instanceof Song song) {
                genre.addSong(song);
            }
            genreRepository.save(genre);
            genresList.add(genre);
        }
        return genresList;
    }

    public void deleteMusicianAndBandConnection(int bandId, int musicianId) {
        Band band = bandRepository.findById(bandId).get();
        Musician musician = musicianRepository.findById(musicianId).get();
        band.deleteMusician(musician);
        musician.deleteBand(band);
        bandRepository.save(band);
        musicianRepository.save(musician);
    }

    public void saveMusicianAndAddGenres(Musician musician, List<String> genres) {
        musicianRepository.save(musician);
        List<Genre> genreList = saveGenresToSubject(genres, musician);
        musician.setGenres(genreList);
    }

    public void saveBandAndAddGenres(Band band, List<String> genres) {
        bandRepository.save(band);
        band.setGenres(saveGenresToSubject(genres, band));
    }

    
}
