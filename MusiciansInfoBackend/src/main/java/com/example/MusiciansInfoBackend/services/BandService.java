package com.example.MusiciansInfoBackend.services;

import com.example.MusiciansInfoBackend.models.Band;
import com.example.MusiciansInfoBackend.repositories.BandRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class BandService {
            
    private BandRepository bandRepository;

    public BandService(BandRepository bandRepository) {
        this.bandRepository = bandRepository;
    }
    
    
    
    public void saveBand(Band band){
        bandRepository.save(band);
    }
    
    public List<Band> findAll(){
        return bandRepository.findAll();
    }
    
    
    public Band findById(int id){
        return bandRepository.findById(id).get();
    }
    
}
