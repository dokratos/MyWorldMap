package server.myWorldMap.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RootDto {
    public List<Result> getResult() {
        return results;
    }

    public void setResult(List<Result> result) {
        this.results = result;
    }

    public List<Result> results;
}
