import React, {useCallback, useState} from 'react';
import styled from 'styled-components';

import {PokemonFilter, PokemonsView} from '../../types';
import PokemonFilterMenu from './PokemonFilterMenu';
import { usePokemonFilter } from '@hooks';
import PokemonContainer from './PokemonContainer';

export const RootContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 95vh;
    flex-wrap: nowrap;
`;

const PokemonsPage: React.FC = () => {
    const [ filterData, dispatch ] = usePokemonFilter();
    const [ pokemonsView, setPokemonsView ] = useState(PokemonsView.Detail);
    const handleChange = useCallback((property: keyof PokemonFilter, value: any): void => {
        dispatch({ type: 'UPDATE_PROPERTY', property, value })
    }, [dispatch]);

    const handleViewChange = useCallback((viewType: PokemonsView) => {
        setPokemonsView(viewType);
    }, []);

    return (
        <RootContainer>
            <PokemonFilterMenu
                filterData={filterData}
                onChange={handleChange}
                onViewChange={handleViewChange}
            />
            <PokemonContainer
                filterData={filterData}
                view={pokemonsView}
            />
        </RootContainer>
    );
};

export default PokemonsPage;
