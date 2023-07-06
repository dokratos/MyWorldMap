import Location from '../type'
import Card from './Card'

interface GalleryProps {
  locationList: Location[]
}

const Gallery = ({locationList}: GalleryProps) => {
  // const locationList = getLocations();
  return (
    <section>
      {locationList.map((location, i) =>
      <Card 
      key={i}
      location={location}/>
      )}
    </section>
  )
}

export default Gallery