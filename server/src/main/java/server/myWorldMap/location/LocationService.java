package server.myWorldMap.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    LocationRepository repo;

    public LocationService(@Autowired LocationRepository repo) {
        this.repo = repo;
    }

    List<Location> getLocations() {
        return repo.listLocations();
    }
}
