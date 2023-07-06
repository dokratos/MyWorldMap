package server.myWorldMap.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LocationRepository {

    JpaLocationRepository repo;

    public LocationRepository(@Autowired JpaLocationRepository repo) {
        this.repo = repo;
    }

    public List<Location> listLocations() {
        return Streamable.of(repo.findAll()).toList();
    }
}
