import React, {useCallback, useEffect} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {useParams, useHistory} from 'react-router';
import styled from 'styled-components';

import {MutationFavoritePokemonArgs, Pokemon} from '../../types';
import {favoritePokemon, unFavoritePokemon} from '@api/mutations';
import {pokemonByName} from '@api/queries';
import {Button, FlexContainer} from '@components/forms';
import PokemonCard from './PokemonCard';
import {RootContainer} from './PokemonsPage';
import { useToastNotification } from '@hooks';
import {ToastNotification} from '@components/notifications';

const CustomPokemonCard = styled(PokemonCard)`
    height: 300px;
    width: 96%;
    margin-bottom: 150px;
`;

const PokemonDetailPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const history = useHistory();
    const { openNotification, visible, content, kind } = useToastNotification();
    const { data } = useQuery<{ pokemonByName: Pokemon }, { name: string }>(pokemonByName,
        {
            variables: {
                name
            }
        }
    );

    const [makePokemonFavorite, { error: pokemonFavoriteError, data: pokemonFavoriteData }] = useMutation<{ favoritePokemon: Pokemon }, MutationFavoritePokemonArgs>(favoritePokemon);
    const [makePokemonUnFavorite, { error: pokemonUnFavoriteError, data: pokemonUnFavoriteData }] = useMutation<{ favoritePokemon: Pokemon }, MutationFavoritePokemonArgs>(unFavoritePokemon);

    useEffect((): void => {
        (pokemonFavoriteError || pokemonUnFavoriteError) && openNotification('error', 'Your action failed. Please try again. If issue persists, contact support.');
    }, [pokemonFavoriteError, pokemonUnFavoriteError]);

    useEffect((): void => {
        (pokemonFavoriteData || pokemonUnFavoriteData) && openNotification('success', 'Your action is successful!');
    }, [pokemonFavoriteData, pokemonUnFavoriteData]);

    const handlePokemonFavorite = useCallback((id: string): void => {
        makePokemonFavorite({ variables: { id } });
    }, [makePokemonFavorite]);

    const handleUnFavoritePokemon = useCallback((id: string): void => {
        makePokemonUnFavorite({ variables: { id } });
    }, [makePokemonUnFavorite]);

    return (
        <RootContainer>
            {
                data?.pokemonByName ?
                    <>
                        <FlexContainer flexDirection="column">
                            <Button onClick={() => history.push('/')}>Back</Button>
                            {
                                data?.pokemonByName ?
                                    <>
                                        <CustomPokemonCard
                                            pokemon={data.pokemonByName}
                                            detailView
                                            onFavorite={handlePokemonFavorite}
                                            onUnFavorite={handleUnFavoritePokemon}
                                        />
                                        { data.pokemonByName.evolutions.length ? <h2>Evolutions</h2> : <></> }
                                        <FlexContainer flexDirection="row" flexWrap='wrap'>
                                            {
                                                data.pokemonByName.evolutions.map((pokemon: Pokemon): JSX.Element => {
                                                    return (
                                                        <div key={pokemon.id + '_' + pokemon.name}>
                                                            <PokemonCard
                                                                pokemon={pokemon}
                                                                hideFavoriteOrUnfavoriteOption
                                                            />
                                                        </div>
                                                    );
                                                })
                                            }
                                        </FlexContainer>
                                    </>
                                    :
                                    null
                            }
                        </FlexContainer>
                    </>
                    :
                    null
            }
            <ToastNotification
                kind={kind}
                content={content}
                visible={visible}
            />
        </RootContainer>
    );
};

export default PokemonDetailPage;