package server.myWorldMap.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Urls {
    public String regular;
    public String raw;
    public String full;

    public String getRaw() {
        return raw;
    }

    public void setRaw(String raw) {
        this.raw = raw;
    }

    public String getRegular() {
        return regular;
    }

    public void setRegular(String regular) {
        this.regular = regular;
    }
}
