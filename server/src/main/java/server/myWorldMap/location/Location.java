package server.myWorldMap.location;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.hibernate.annotations.UuidGenerator;

@Entity
public class Location {
    @Id
//    @UuidGenerator(style = UuidGenerator.Style.AUTO)
    private String id;
//    private String name;
//    private String address;
//    private Double lat;
//    private Double lng;
//    private String when;
//    private String type;
//    private String imgUrl;

//    public Location(String name, String address, Double lat, Double lng, String when, String type, String imgUrl) {
//        this.name = name;
//        this.address = address;
//        this.lat = lat;
//        this.lng = lng;
//        this.when = when;
//        this.type = type;
//        this.imgUrl = imgUrl;
//    }

    public Location() {

    }


    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getAddress() {
//        return address;
//    }
//
//    public void setAddress(String address) {
//        this.address = address;
//    }

//    public Double getLat() {
//        return lat;
//    }
//
//    public void setLat(Double lat) {
//        this.lat = lat;
//    }
//
//    public Double getLng() {
//        return lng;
//    }
//
//    public void setLng(Double lng) {
//        this.lng = lng;
//    }
//
//    public String getWhen() {
//        return when;
//    }
//
//    public void setWhen(String when) {
//        this.when = when;
//    }
//
//    public String getType() {
//        return type;
//    }

//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public String getImgUrl() {
//        return imgUrl;
//    }
//
//    public void setImgUrl(String imgUrl) {
//        this.imgUrl = imgUrl;
//    }
}
