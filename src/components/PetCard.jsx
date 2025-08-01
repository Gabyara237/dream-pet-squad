import { Link,useNavigate } from "react-router-dom";

const PetCard =({id,name,breed,category,attributes})=>{

    const navigate = useNavigate();
    

    return(
        <div className="card-container">
            <div className="options">
               <button onClick={() => navigate(`/edit/${id}`)} title="Edit Pet">
                    Edit
                </button>
            </div>
            
            <Link to={`/details/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="description">
                    <h3 className="pet-name">{name}</h3>
                    <p className="">Breed: {breed}</p>
                    <p> Category: {category} dog</p>
                    <p>Attributes:</p>
                    <ul>
                        {Object.entries(attributes).map(([key, value]) =>(
                            <li key={key}>{key}:{value}</li>
                        ))}
                    </ul>

                </div>
            </Link>
        </div>
       
    )
};

export default PetCard;