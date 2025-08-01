import CreatePetForm from "../components/CreatePetForm";

const CreatePet = () =>{
    return(
        <div className="create-container">
            <h1 className="title"> Create a New Pet</h1>
            <CreatePetForm/>
        </div>
    )
};

export default CreatePet;