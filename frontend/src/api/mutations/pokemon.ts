import { gql } from '@apollo/client';

export const favoritePokemon = gql`
    mutation FavoritePokemon($id: ID!) {
        favoritePokemon(id: $id) {
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
`;

export const unFavoritePokemon = gql`
    mutation UnFavoritePokemon($id: ID!) {
        unFavoritePokemon(id: $id) {
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
`;