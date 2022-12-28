import Pet from './Pet';

const Results = ({ pets }) => {
    return (
        <div className='search'>
            {!pets.length ? (
                <h1>No Pets Found</h1>
            ): 
                pets.map((pet) => (
                    <Pet 
                        id={pet.id}
                        name={pet.name}
                        animal={pet.animal}
                        breed={pet.breed}
                        key={pet.id}
                        images={pet.images}
                        location={`${pet.city}, ${pet.state}`}
                    />
                ))
            }
        </div>
    )
}

export default Results;