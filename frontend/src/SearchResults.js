import {useEffect, useState} from "react";

const SearchResults = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            const graphqlQuery = {
                query:`
            {
              getProperties {
                id
                title
                description
                city { id name }
                propertyType { id name }
              }
            }`}

            try {
                const response = await fetch('http://localhost/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(graphqlQuery)
                });
                const {data: {getProperties}} = await response.json();
                console.log(getProperties);
                setProperties(getProperties);
            } catch (e){
                console.log(e);
            }
        };

        fetchProperties();
    }, []);

    return <>
    <h1>Search results</h1>
        {properties.map(p =>
            <div key={p.id}>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <p>{p.city.name}</p>
                <p>{p.propertyType.name}</p>
                </div>)}
    </>
}

export default SearchResults;