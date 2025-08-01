import { useNavigate } from "react-router-dom";

const PetCard =({id,name,breed,category,attributes})=>{

    const navigate = useNavigate();
    

    return(
        <div className="card-container">
            <div className="options">
               <button onClick={() => navigate(`/edit/${id}`)} title="Edit Pet">
                    Edit
                </button>
                <button onClick={() => navigate(`/details/${id}`)} title="View Details">
                    View
                </button>
            </div>
            <div className="description">
                <h3 className="pet-name">{name}</h3>
                <p className="">Breed:{breed}</p>
                <p> Category:{category}</p>
                <p>Attributes:</p>
                <ul>
                    {Object.entries(attributes).map(([key, value]) =>(
                        <li key={key}>{key}:{value}</li>
                    ))}
                </ul>

            </div>
        </div>

    )
};

export default PetCard;