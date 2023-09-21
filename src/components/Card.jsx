/* eslint-disable react/prop-types */

const Card = ({image, onClick}) => {
    
    
    return (
        <div className="card" onClick={() => onClick(image)}>
            <img className="card-image" src={image} alt="Card-Image" />
        </div>
    )
}

export default Card