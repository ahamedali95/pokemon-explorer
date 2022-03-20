import React, {memo, useCallback, useEffect} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';

import {
    Pokemon,
    PokemonConnection,
    PokemonFilter,
    PokemonsQueryInput,
    PokemonsView,
    TabView,
    MutationFavoritePokemonArgs,
    ButtonsStatus
} from '../../types';
import PokemonCard from './PokemonCard';
import {pokemons} from '@api/queries';
import {favoritePokemon, unFavoritePokemon} from '@api/mutations';
import {ToastNotification} from '@components/notifications';
import {FlexContainer, Pagination} from '@components/forms';
import { useToastNotification, usePagination } from '@hooks';

type PokemonContainerProps = {
    filterData: PokemonFilter;
    view: PokemonsView;
}

const PokemonContainer: React.FC<PokemonContainerProps> = ({ filterData, view }) => {
    const { openNotification, visible, content, kind } = useToastNotification();
    const POKEMONS_PER_PAGE = 10;
    const [fetchPokemons, { data: pokemonsData }] = useLazyQuery<{ pokemons: PokemonConnection }, { params: PokemonsQueryInput }>(pokemons,
        {
            variables: {
                params: {
                    limit: POKEMONS_PER_PAGE,
                    search: filterData.searchValue,
                    filter: {
                        isFavorite: filterData.tabView === TabView.Favorite,
                        type: filterData.type
                    }
                }
            }
        }
    );
    const [makePokemonFavorite, { error: pokemonFavoriteError, data: pokemonFavoriteData }] = useMutation<{ favoritePokemon: Pokemon }, MutationFavoritePokemonArgs>(favoritePokemon);
    const [makePokemonUnFavorite, { error: pokemonUnFavoriteError, data: pokemonUnFavoriteData }] = useMutation<{ favoritePokemon: Pokemon }, MutationFavoritePokemonArgs>(unFavoritePokemon);
    const { buttonsStatus, totalPages, currentPage, handleClick, setCurrentPage } = usePagination(pokemonsData?.pokemons.count, POKEMONS_PER_PAGE);

    useEffect((): void => {
        fetchPokemons();
        setCurrentPage(1);
    }, [filterData.tabView, filterData.searchValue, filterData.type]);

    useEffect((): void => {
        (pokemonFavoriteError || pokemonUnFavoriteError) && openNotification('error', 'Your action failed. Please try again. If issue persists, contact support.');
    }, [pokemonFavoriteError, pokemonUnFavoriteError]);

    useEffect((): void => {
        (pokemonFavoriteData || pokemonUnFavoriteData) && openNotification('success', 'Your action is successful!');
    }, [pokemonFavoriteData, pokemonUnFavoriteData]);

    useEffect((): void => {
        fetchPokemons({
            variables: {
                params: {
                    limit: POKEMONS_PER_PAGE,
                    offset: (currentPage - 1) * POKEMONS_PER_PAGE,
                    search: filterData.searchValue,
                    filter: {
                        isFavorite: filterData.tabView === TabView.Favorite,
                        type: filterData.type
                    }
                }
            }
        });
    }, [currentPage]);

    const handlePokemonFavorite = useCallback((id: string): void => {
        makePokemonFavorite({ variables: { id } });
    }, [makePokemonFavorite]);

    const handleUnFavoritePokemon = useCallback((id: string): void => {
        makePokemonUnFavorite({ variables: { id } });
    }, [makePokemonUnFavorite]);

    return (
        <>
            <FlexContainer
                alignItems={'flex-start'}
                flexDirection={view === PokemonsView.Detail ? 'row' : 'column'}
                flexWrap={view === PokemonsView.Detail ? 'wrap' : 'nowrap'}
                justifyContent="flex-start"
            >
                {
                    (pokemonsData?.pokemons.edges ?? []).map((pokemon: Pokemon) => {
                        return (
                            <div
                                className={view === PokemonsView.List ? 'span-width' : ''}
                                key={pokemon.id + '_' + pokemon.name}
                            >
                                <PokemonCard
                                    onFavorite={handlePokemonFavorite}
                                    onUnFavorite={handleUnFavoritePokemon}
                                    pokemon={pokemon}
                                    view={view}
                                />
                            </div>
                        );
                    })
                }
            </FlexContainer>
            <ToastNotification
                kind={kind}
                content={content}
                visible={visible}
            />
            <Pagination
                /* @ts-ignore */

                buttonsStatus={buttonsStatus as ButtonsStatus}
                totalPages={totalPages}
                currentPage={currentPage}
                onClick={handleClick}
            />
        </>
    );
};

export default memo(PokemonContainer);
