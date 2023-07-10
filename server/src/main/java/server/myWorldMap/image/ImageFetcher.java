package server.myWorldMap.image;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.CompletableFuture;

@Service
public class ImageFetcher {
    @Value("${image-source.url}")
    private String unsplash;

    @Value("${image-source.access-key}")
    private String accessKey;

    HttpClient client = HttpClient.newBuilder().build();

    public String fetchImage(String name, String country) {
        HttpRequest request = HttpRequest
                .newBuilder()
                .uri(URI.create(unsplash + "photos/?query=" + name + "&client_id=" + accessKey))
                .build();

        CompletableFuture<HttpResponse<String>> response = client.sendAsync(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));

        try {
            HttpResponse<String> stringHttpResponse = response.get();
            System.out.println(stringHttpResponse + "yeah");
            String body = stringHttpResponse.body();

            ObjectMapper objectMapper = new ObjectMapper();
            RootDto image = objectMapper.readValue(body, RootDto.class);
            Thread.sleep(2500);
            System.out.println(body + "BODY!!!");
            return image.getResult().get(0).getUrls().getRaw();
        } catch (Exception e){
            System.out.println("exception");
        }
        return null;

    }
}
