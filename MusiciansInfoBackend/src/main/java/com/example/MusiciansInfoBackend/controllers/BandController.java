
package com.example.MusiciansInfoBackend.controllers;

import com.example.MusiciansInfoBackend.models.Band;
import com.example.MusiciansInfoBackend.services.BandService;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/band")
public class BandController {
    
    private BandService bandService;

    public BandController(BandService bandService) {
        this.bandService = bandService;
    }
    
    @PostMapping("/save")
    public void saveBand(@RequestBody Band band){
            
        bandService.saveBand(band);
        
    }
    @GetMapping("/find/all")
    @CrossOrigin("http://127.0.0.1:5500/")
    public List<Band> findAll(){
        return bandService.findAll();
    }
    
}
