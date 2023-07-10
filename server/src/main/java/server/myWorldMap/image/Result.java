package server.myWorldMap.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {
//    public User user;
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }

    public Urls urls;

    public Urls getUrls() {
        return urls;
    }

    public void setUrls(Urls urls) {
        this.urls = urls;
    }
}
