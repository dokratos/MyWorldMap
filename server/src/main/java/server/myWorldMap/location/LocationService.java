package server.myWorldMap.location;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import server.myWorldMap.geolocation.GeoLocationFetcher;
import server.myWorldMap.geolocation.GeoResponseDto;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Service
public class LocationService {
@Autowired
GeoLocationFetcher fetch;

    LocationRepository repo;

    public LocationService(@Autowired LocationRepository repo) {
        this.repo = repo;
    }

    public List<Location> getLocations() {
        return repo.listLocations();
    }

    public Location postLocation(FrontEndLocationDto newData) throws IOException, InterruptedException {
        GeoResponseDto coordinates = fetch.fetchCoordinates(newData.name(), newData.country());
        System.out.println(newData.name()+ " PRINTING DATA");
        Location newLocation = LocationConverter.buildLocation(newData, coordinates);
        return repo.createLocation(newLocation);
    }

    public void deleteLocation(String id) {
        repo.deleteLocation(id);
    }
}
