import Location from '../type'

interface CardProps {
  location: Location
}

const Card = ({location}: CardProps) => {
  return (
    <article>
      <h2>{location.name}</h2>
      <p>Type: {location.type}</p>
    </article>
  )
}

export default Card