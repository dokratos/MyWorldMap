package server.myWorldMap.location;

import org.springframework.data.repository.CrudRepository;

public interface JpaLocationRepository extends CrudRepository<Location, String> {
}
