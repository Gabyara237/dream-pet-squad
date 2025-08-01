import { useState,useEffect } from "react";
import breedsByCategory from "../data/breedsByCategory.json"
import attributesByCategory from "../data/attributesByCategory.json"
import {supabase} from "../client"



const CreatePetForm = () => {
    
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [category,setCategory]= useState("");
    const [attributes,setAttributes] = useState({});

    useEffect(() => {
        if (category && attributesByCategory[category]) {
            const initialAttributes = {};
            attributesByCategory[category].forEach(attr => {
                initialAttributes[attr] = 5; // valor por defecto
            });
            setAttributes(initialAttributes);
        }
    }, [category]);
    const createNewPet = async (e)=>{
        e.preventDefault();
        
        const {error}= await supabase
            await supabase
                .from('pets')
                .insert({
                    name,
                    breed,
                    category,
                    attributes 
                })
                .select()
                window.location = "/";
            if (error) {
                console.error("Error inserting:", error.message);
            } else {
                alert("Successfully created pet");
            }
    }


    const handleAttributeChange = (attribute, value)=>{
        setAttributes(prev=>({
            ...prev,
            [attribute]:value
        }));
    }
    
    return (
        <div className="form-container">
            <div className="form">
                <form>

                    <div className="form-group name-group" >
                        <label htmlFor="name" >Pet Name:</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            id="name" 
                            placeholder=""
                        />
                    </div>
                    <div className="form-group category-group">
                        <input 
                            type="radio" 
                            id="service"
                            name="category" 
                            value="service"
                            checked={category==="service"}
                            onChange={(e)=>setCategory(e.target.value)}
                        />
                        <label htmlFor="service"> 🦮 Service dog</label>
                        <input
                            type="radio"
                            id="protector"
                            name="category"
                            value="protector"
                            checked={category==="protector"}
                            onChange={(e)=>setCategory(e.target.value)}
                        />
                        <label htmlFor="protector">🐕‍🦺Home Protector</label>
                        <input
                            type="radio"
                            id="athlete"
                            name="category"
                            value="athlete"
                            checked={category==="athlete"}
                            onChange={(e)=>setCategory(e.target.value)}
                        />
                        <label htmlFor="athlete">🐶 Athlete</label>
                        <input
                            type="radio"
                            id="companion"
                            name="category"
                            value="companion"
                            checked={category==="companion"}
                            onChange={(e)=>setCategory(e.target.value)}
                        />                    
                        <label htmlFor="companion">🐩 Home Companion </label>
                    </div>
                    
                    <div className="form-group breed-group">
                        <select 
                            value={breed} 
                            onChange={(e)=>setBreed(e.target.value)} 
                            disabled={!category}
                        
                        >
                            <option value="" disabled>Select a category</option>
                            {
                                breedsByCategory[category]?breedsByCategory[category].map(breed=>(
                                    <option key={breed} value={breed}>{breed}</option>
                                )):[]
                            }
                        </select>
                    </div>

                    <div className="form-group attribute-group">
                        
                            {attributesByCategory[category]?(
                                <>
                                    <h3>Customize your dream pet's abilities 🐾</h3>
                                    <p>Attributes of your {category} dog </p>
                                    {attributesByCategory[category].map(attribute =>(      
                                    <div key={attribute}>
                                        <label htmlFor={attribute.toLowerCase()}>{attribute}: </label>
                                        {attributes[attribute]?attributes[attribute]:5}
                                        <input 
                                            type="range"
                                            min={1}
                                            max={10}
                                            step={1}
                                            value={attributes[attribute]}
                                            onChange={(e) => handleAttributeChange(attribute,Number(e.target.value))}
                                            /> 
                                    </div>
                                    ))}
                                </>    
                            ):( 
                                <p>Select a category and customize your dream pet's abilities</p>
                            )}

                    </div>

                    <button type="submit" value="Submit" onClick={createNewPet}>Create New Pet</button>
                </form>
            </div>
            <div className="preview-pet"> </div>

        </div>
    )
};

export default CreatePetForm;
