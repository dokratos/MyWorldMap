package server.myWorldMap.geolocation;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletableFuture;

@Service
public class GeoLocationFetcher {

    @Value("${source.url}")
    private String geoApi;

//    Dotenv dotenv = Dotenv.load();
//dotenv.get()
//
//    System.getenv("GEO_KEY");

    @Value("${source.key}")
    private String geoKey;

    HttpClient client = HttpClient.newBuilder().build();

    public server.myWorldMap.geolocation.GeoResponseDto fetchCoordinates(String name, String country) {
        HttpRequest request = HttpRequest
                .newBuilder()
                .uri(URI.create(geoApi + name + "%2C%20" + country + "&format=json&apiKey=" + geoKey))
                .build();

        CompletableFuture<HttpResponse<String>> response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
        try {
            HttpResponse<String> stringHttpResponse = response.get();
            String body = stringHttpResponse.body();
            ObjectMapper objectMapper = new ObjectMapper();
            RootDto coordinates = objectMapper.readValue(body, RootDto.class);
            Thread.sleep(2500);
            return new GeoResponseDto(coordinates.getResult().get(0).getLat(), coordinates.getResult().get(0).getLon());
        } catch (Exception e){

        }
        return null;
    }

}
