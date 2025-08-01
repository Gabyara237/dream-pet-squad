const PetCard =({name,breed,category,attributes})=>{
    return(
        <div className="card-container">
            <h3 className="pet-name">{name}</h3>
            <p className="">Breed:{breed}</p>
            <p> Category:{category}</p>
            <p>Attributes:</p>
            <ul>
                {Object.entries(attributes).map(([key, value]) =>(
                    <li key={key}>{key}:{value}</li>
                ))}
            </ul>
            <div></div>
        </div>

    )
};

export default PetCard;