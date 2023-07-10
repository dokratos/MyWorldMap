package server.myWorldMap.image;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    public ProfileImage getProfile_image() {
        return profile_image;
    }

    public void setProfile_image(ProfileImage profile_image) {
        this.profile_image = profile_image;
    }

    public ProfileImage profile_image;
}
