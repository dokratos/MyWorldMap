package server.myWorldMap.location;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("api/locations")
public class LocationController {

    private final LocationService service;

    public LocationController(LocationService service) {
        this.service = service;
    }

    @GetMapping
    ResponseEntity<List<Location>> getLocations () {
        return ResponseEntity.ok().body(service.getLocations());
    }

    @PostMapping
    ResponseEntity<Location> postLocation(@RequestBody FrontEndLocationDto request, HttpServletRequest req) throws IOException, InterruptedException {
        Location newLocation = service.postLocation(request);
        URI location = URI.create(req.getRequestURI());
        return ResponseEntity.created(location).body(newLocation);
    }

    @DeleteMapping(path = "{id}")
    ResponseEntity deleteLocation(@PathVariable String id) {
        service.deleteLocation(id);
        return ResponseEntity.noContent().header("message", "ok").build();
    }
}
