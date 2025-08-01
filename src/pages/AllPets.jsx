import { supabase } from '../client'
import { useEffect, useState } from 'react';
import PetCard from '../components/PetCard';
import { Link } from "react-router-dom";



const AllPets = () =>{
    const [pets,setPets]=useState()

    useEffect(() => {
        const fetchPet = async()=>{
            const {data} = await supabase
                .from('pets')
                .select()
                .order('created_at', { ascending: true })
                setPets(data)
        } 
        fetchPet()
    }, []);


    return(
        <div>
            <h1 className="title"> Meet Your Dream Pet Squad</h1>
            <div className="pets-container">
                { pets && pets.length >0 ? (
                    pets.map(pet=>(
                        <PetCard 
                            id={pet.id}
                            name={pet.name} 
                            breed={pet.breed} 
                            category={pet.category} 
                            attributes={pet.attributes}
                        />
                    ))
                ): <div>
                        <h3>Oops! Your dream pet squad is feeling lonely...<br/> Create your first furry friend now! 🐾</h3>
                        <Link to="/create-pet">
                            <button className="create-pet-btn">Create Pet</button>
                        </Link>
                    </div>}
            </div>
        </div>
    )
};

export default AllPets;