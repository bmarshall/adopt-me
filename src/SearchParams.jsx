import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
    
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: ""
    });

    const [animal, setAnimal] = useState("")
    const [breeds] = useBreedList(animal);
    const [adoptedPet] = useContext(AdoptedPetContext);

    
    const results = useQuery(['search', requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];


    return (
        <div className="search-params">
            <form onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                const obj = {
                    animal: formData.get("animal") ?? "",
                    location: formData.get("location") ?? "",
                    breed: formData.get("breed") ?? "",
                }
                setRequestParams(obj);
            }}>
                {
                    adoptedPet ? 
                    <div className="pet image-container">
                        <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
                    </div>
                    : null
                }
                <label htmlFor="location">
                    Location:
                    <input 
                        id="location" 
                        name="location"
                        placeholder="location" 
                        />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select 
                        id="animal" 
                        name="animal"
                        value={animal} 
                        onChange={(event) => {
                            setAnimal(event.target.value);
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select 
                        id="breed" 
                        name="breed"
                        disabled={breeds.length === 0}
                    >
                        <option />
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
           <Results pets={pets}/>
        </div>
    );
}

export default SearchParams