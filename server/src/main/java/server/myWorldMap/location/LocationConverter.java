package server.myWorldMap.location;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import server.myWorldMap.geolocation.GeoResponseDto;

public class LocationConverter {
    static Location buildLocation(FrontEndLocationDto locationData, GeoResponseDto locationCoordinates) {
        return new Location(
                locationData.name(),
                locationData.country(),
                locationCoordinates.lat(),
                locationCoordinates.lng(),
                locationData.year(),
                locationData.type(),
                "");
    }
}
