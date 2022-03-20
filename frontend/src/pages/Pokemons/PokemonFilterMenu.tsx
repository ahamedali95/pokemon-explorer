import React, {ChangeEvent, memo} from 'react';
import {useQuery} from '@apollo/client';
import styled from 'styled-components';

import {Button, FlexContainer, Select, TextField} from '@components/forms';
import {pokemonTypes} from '@api/queries';
import detailViewIcon from '@assets/icons/detail-view.svg';
import listViewIcon from '@assets/icons/list-view.svg';
import {PokemonFilter, PokemonsView, TabView} from '../../types';

export type PokemonFilterMenuProps = {
    filterData: PokemonFilter;
    onChange: (property: keyof PokemonFilter, value: any) => unknown;
    onViewChange: (viewType: PokemonsView) => unknown;
}

const StyledImage = styled.img` 
    margin-top: 10px; 
    width: 80px;
    height: 30px;
    cursor: pointer;
`;

const PokemonFilterMenu: React.FC<PokemonFilterMenuProps> = ({ filterData, onChange, onViewChange }) => {
    const { data } = useQuery<{ pokemonTypes: string[] }>(pokemonTypes);

    return (
        <>
            <FlexContainer>
                <Button
                    className={filterData.tabView === TabView.All ? 'span-width focused' : 'span-width'}
                    onClick={() => onChange('tabView', TabView.All)}
                >
                    All
                </Button>
                <Button
                    className={filterData.tabView === TabView.Favorite ? 'span-width focused' : 'span-width'}
                    onClick={() => onChange('tabView', TabView.Favorite)}
                >
                    Favorite
                </Button>
            </FlexContainer>
            <FlexContainer>
                <TextField
                    name="pokemonNameEntry"
                    value={filterData.searchValue}
                    placeholder="Search"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange('searchValue', e.target.value)}
                />
                <Select
                    name="pokemonType"
                    value={filterData.type}
                    options={data?.pokemonTypes ?? []}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange('type', e.target.value)}
                />
                <StyledImage
                    src={detailViewIcon}
                    alt="Not found"
                    onClick={() => onViewChange(PokemonsView.Detail)}
                />
                <StyledImage
                    src={listViewIcon}
                    alt="Not found"
                    onClick={() => onViewChange(PokemonsView.List)}
                />
            </FlexContainer>
        </>
    );
};

export default memo(PokemonFilterMenu);