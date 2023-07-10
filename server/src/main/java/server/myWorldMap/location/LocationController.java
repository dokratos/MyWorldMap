package server.myWorldMap.location;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.MediaType;
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

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    ResponseEntity<List<Location>> getLocations () {
        try {
            return ResponseEntity.ok().body(service.getLocations());
        } catch (IllegalArgumentException ex) {
           return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    ResponseEntity<Location> postLocation(@RequestBody @Valid FrontEndLocationDto request, HttpServletRequest req) throws IOException, InterruptedException {
        try {
            Location newLocation = service.postLocation(request);
            URI location = URI.create(req.getRequestURI());
            return ResponseEntity.created(location).body(newLocation);
        } catch (IOException | InterruptedException ex) {
            return ResponseEntity.badRequest().header("error", "No Location").build();
        }
    }

    @DeleteMapping(path = "{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    ResponseEntity deleteLocation(@PathVariable @NotNull String id) {
        try {
            service.deleteLocation(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
