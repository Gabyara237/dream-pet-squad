import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import categoryDetails from "../data/categoryDetails.json";
import service from "../assets/service.png"
import athlete from "../assets/athlete.png"
import protector from "../assets/protector.png"
import companion from "../assets/companion.png"

const PetDetails = () => {
    const { id } = useParams();
    console.log("Id:", id)
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const categoryImages = {
        service: service,
        athlete: athlete,
        protector: protector,
        companion: companion
    };

    useEffect(() => {
        const fetchPet = async () => {
            const { data, error } = await supabase
                .from("pets")
                .select()
                .eq("id", id)
                .single();

            if (error) {
                console.error("Error fetching pet:", error.message);
            } else {
                setPet(data);
            }
        };
        fetchPet();
    }, [id]);

    if (!pet) return <p>Loading...</p>;
    const info = categoryDetails[pet.category];
    
    return (
        <div className="detail-container">
            <h1>{pet.name}</h1>
            <p><strong>Breed:</strong> {pet.breed}</p>
            <p><strong>Category:</strong> {pet.category}</p>
            {info && (
            <div className="category-extra">
                <p>{info.description}</p>
                <img 
                    src={categoryImages[pet.category]} 
                    alt={pet.category} 
                    className="category-image" 
                />
                
            </div>
            )}
            
            <h3>Abilities:</h3>
            <ul>
                {Object.entries(pet.attributes || {}).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>

            <button onClick={() => navigate(`/edit/${pet.id}`)}>✏️ Edit this pet</button>
        </div>
    );
};

export default PetDetails;
