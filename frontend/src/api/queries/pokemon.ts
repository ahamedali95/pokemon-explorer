import { gql } from '@apollo/client';

export const pokemons = gql`
    query Pokemons($params: PokemonsQueryInput!) {
        pokemons(query: $params) {
            limit,
            offset,
            count,
            totalCount,
            edges {
                id,
                number,
                weight {
                    minimum,
                    maximum
                },
                height {
                    minimum,
                    maximum
                },
                name,
                types,
                maxCP,
                maxHP,
                image,
                sound,
                isFavorite
            }
        }
    }
`;

export const pokemonTypes = gql`
    query PokemonTypes {
        pokemonTypes
    }
`;

export const pokemonByName = gql`
    query PokemonByName($name: String!) {
        pokemonByName(name: $name) {
            id,
            number,
            weight {
                minimum,
                maximum
            },
            height {
                minimum,
                maximum
            },
            name,
            types,
            maxCP,
            maxHP,
            image,
            sound,
            isFavorite,
            evolutions {
                id,
                name,
                isFavorite,
                image
            }
        }
    }
`;