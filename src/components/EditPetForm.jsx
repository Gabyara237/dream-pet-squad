import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import breedsByCategory from "../data/breedsByCategory.json";
import attributesByCategory from "../data/attributesByCategory.json";

const EditPetForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [category, setCategory] = useState("");
    const [attributes, setAttributes] = useState({});

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
                setName(data.name);
                setBreed(data.breed);
                setCategory(data.category);
                setAttributes(data.attributes || {});
            }
        };
        fetchPet();
    }, [id]);
    

    const handleAttributeChange = (attribute, value) => {
        setAttributes(prev => ({
            ...prev,
            [attribute]: value
        }));
    };

    const updatePet = async () => {
        const { error } = await supabase
            .from("pets")
            .update({
                name,
                breed,
                category,
                attributes
            })
            .eq("id", id);

        if (error) {
            console.error("Update failed:", error.message);
            alert("There was an error updating the pet.");
        } else {
            alert("Pet updated successfully!");
            navigate("/pet-squad");
        }
    };

    return (
        <div className="form">
            <form onSubmit={(e) => { e.preventDefault(); updatePet(); }}>
                <div className="form-group name-group">
                    <label htmlFor="name">Pet Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                    />
                </div>

                <div className="form-group category-group">
                    {["service", "protector", "athlete", "companion"].map((category) => (
                        <div key={category}>
                            <input
                                type="radio"
                                id={category}
                                name="category"
                                value={category}
                                checked={category === category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <label htmlFor={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)} dog
                            </label>
                        </div>
                    ))}
                </div>

                <div className="form-group breed-group">
                    <select
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        disabled={!category}
                    >
                        <option value="" disabled>Select a breed</option>
                        {breedsByCategory[category]?.map((breed) => (
                            <option key={breed} value={breed.toLowerCase().replace(/\s+/g, "")}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group attribute-group">
                    {attributesByCategory[category] ? (
                        <>
                            <h3>Customize your dream pet's abilities 🐾</h3>
                            {attributesByCategory[category].map((attribute) => (
                                <div key={attribute}>
                                    <label htmlFor={attribute}>{attribute}:</label>
                                    {attributes[attribute] ?? 5}
                                    <input
                                        type="range"
                                        min={1}
                                        max={10}
                                        step={1}
                                        value={attributes[attribute] || 5}
                                        onChange={(e) => handleAttributeChange(attribute, e.target.value)}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>Select a category to customize attributes</p>
                    )}
                </div>

                <button type="submit">Update Pet</button>
            </form>
        </div>
    );
};

export default EditPetForm;
