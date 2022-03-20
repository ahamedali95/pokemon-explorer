import {ChangeEvent} from 'react';

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
    { [SubKey in K]: Maybe<T[SubKey]> }

export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type Attack = {
    __typename?: 'Attack'
    name: Scalars['String']
    type: Scalars['String']
    damage: Scalars['Int']
}

export type Pokemon = {
    __typename?: 'Pokemon'
    id: Scalars['ID']
    number: Scalars['Int']
    name: Scalars['String']
    weight: PokemonDimension
    height: PokemonDimension
    classification: Scalars['String']
    types: Array<Scalars['String']>
    resistant: Array<Scalars['String']>
    attacks: PokemonAttack
    weaknesses: Array<Scalars['String']>
    fleeRate: Scalars['Float']
    maxCP: Scalars['Int']
    evolutions: Array<Pokemon>
    evolutionRequirements?: Maybe<PokemonEvolutionRequirement>
    maxHP: Scalars['Int']
    image: Scalars['String']
    sound: Scalars['String']
    isFavorite: Scalars['Boolean']
}

export type PokemonConnection = {
    __typename?: 'PokemonConnection'
    limit: Scalars['Int']
    offset: Scalars['Int']
    count: Scalars['Int']
    totalCount: Scalars['Int']
    edges: Array<Pokemon>
}

export type PokemonsQueryInput = {
    limit?: Maybe<Scalars['Int']>
    offset?: Maybe<Scalars['Int']>
    search?: Maybe<Scalars['String']>
    filter?: Maybe<PokemonFilterInput>
}

export type PokemonFilterInput = {
    type?: Maybe<Scalars['String']>
    isFavorite?: Maybe<Scalars['Boolean']>
}

export type PokemonAttack = {
    __typename?: 'PokemonAttack'
    fast: Array<Attack>
    special: Array<Attack>
}

export type PokemonDimension = {
    __typename?: 'PokemonDimension'
    minimum: Scalars['String']
    maximum: Scalars['String']
}

export type PokemonEvolutionRequirement = {
    __typename?: 'PokemonEvolutionRequirement'
    amount: Scalars['Int']
    name: Scalars['String']
}

export type Query = {
    __typename?: 'Query'
    pokemons: PokemonConnection
    pokemonByName?: Maybe<Pokemon>
    pokemonById?: Maybe<Pokemon>
    pokemonTypes: Array<Scalars['String']>
}

export type QueryPokemonsArgs = {
    query: PokemonsQueryInput
}

export type QueryPokemonByNameArgs = {
    name: Scalars['String']
}

export type QueryPokemonByIdArgs = {
    id: Scalars['ID']
}

export type Mutation = {
    __typename?: 'Mutation'
    favoritePokemon?: Maybe<Pokemon>
    unFavoritePokemon?: Maybe<Pokemon>
}

export type MutationFavoritePokemonArgs = {
    id: Scalars['ID']
}

export type MutationUnFavoritePokemonArgs = {
    id: Scalars['ID']
}

export type Root = {
    __typename?: 'Root'
    query: Query
}

export enum TabView {
    All,
    Favorite
}

export enum PokemonsView {
    Detail,
    List
}

export type PokemonFilter = {
    tabView: TabView;
    searchValue: string;
    type: string;
};

export type ActionWithPayload = {
    type: string;
    property: string;
    value: any;
};

export type ActionWithoutPayload = {
    type: string;
};

export type Action = ActionWithPayload | ActionWithoutPayload;

export type AlertKind = 'success' | 'error';

export type ButtonsStatus = {
    first: boolean;
    last: boolean;
    previous: boolean;
    next: boolean;
};

namespace Components {
    export namespace Forms {
        export type ButtonProps = {
            children: string | JSX.Element;
            className?: string;
            disabled?: boolean;
            onClick: () => unknown;
            name: string;
        };

        export type FlexContainerProps = {
            className?: string;
            children: JSX.Element | JSX.Element[];
            justifyContent?: string;
            alignItems?: string;
            flexDirection?: string;
            flexWrap?: string;
        };

        export type PaginationProps = {
            onClick: (type: string) => unknown;
            currentPage: number;
            totalPages: number;
            buttonsStatus: ButtonsStatus;
        };

        export type SelectProps = {
            className?: string;
            name: string;
            value: string;
            options: string[];
            onChange: (e: ChangeEvent<HTMLSelectElement>) => unknown;
        };

        export type TextFieldProps = {
            className?: string;
            placeholder?: string;
            name: string;
            value: string;
            onChange: (e: ChangeEvent<HTMLInputElement>) => unknown;
        };
    }

    export namespace Notifications {
        export type ToastNotificationProps = {
            visible: boolean;
            content: string;
            kind: AlertKind;
        }
    }
}
