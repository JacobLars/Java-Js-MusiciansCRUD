
package com.example.MusiciansInfoBackend.services;

import com.example.MusiciansInfoBackend.models.Album;
import com.example.MusiciansInfoBackend.repositories.AlbumRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AlbumService {
    
    private AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }
    
    public void saveAlbum(Album album){
        albumRepository.save(album);
    }
    
    public List<Album> findAll(){
       return albumRepository.findAll();
    }

    public Album findById(int id) {
       return albumRepository.findById(id).get();
    }
    
}
