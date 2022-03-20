import React from 'react';
import {render, RenderResult, screen, fireEvent} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import PokemonFilterMenu, { PokemonFilterMenuProps } from '../PokemonFilterMenu';
import {PokemonsView, TabView} from '../../../types';
import {pokemonTypes} from '@api/queries';

const mocks = [
    {
        request: {
            query: pokemonTypes
        },
        result: jest.fn().mockReturnValue({
            data: {
                pokemonTypes: ['Grass', 'Ice', 'Tape']
            }
        })
    }
];

describe('PokemonFilterMenu Component', () => {
    let component: RenderResult;
    const mockHandleChange: jest.Mock = jest.fn();
    const mockHandleViewChange: jest.Mock = jest.fn();
    const properties: PokemonFilterMenuProps = {
        filterData: {
            tabView: TabView.All,
            searchValue: 'Almeire',
            type: 'Grass'
        },
        onChange: mockHandleChange,
        onViewChange: mockHandleViewChange
    };
    const getComponent = (properties: PokemonFilterMenuProps): JSX.Element => {
        return (
            <MockedProvider mocks={mocks} addTypename={false}>
                <PokemonFilterMenu
                    {...properties}
                />
            </MockedProvider>
        );
    };

    beforeEach(async () => {
        component = render(getComponent(properties));
        await new Promise(resolve => setTimeout(resolve, 0));
    });

    afterEach(() => {
        mockHandleChange.mockClear();
        mockHandleViewChange.mockClear();
    });

    it('should render the default state', () => {
        const allTab = screen.getByRole('button', { name: 'All' }) as HTMLButtonElement;
        const favoriteTab = screen.getByRole('button', { name: 'Favorite' }) as HTMLButtonElement;
        const searchEntry = screen.getByPlaceholderText('Search') as HTMLInputElement;
        const typeSelection = screen.getByLabelText('pokemonType') as HTMLSelectElement;
        const detailView = screen.getAllByAltText('Not found')[0] as HTMLImageElement;
        const listView = screen.getAllByAltText('Not found')[1] as HTMLImageElement;

        expect(allTab).toBeVisible();
        expect(favoriteTab).toBeVisible();
        expect(searchEntry).toHaveValue('Almeire');
        expect(typeSelection).toHaveValue('Grass');
        expect(detailView).toBeVisible();
        expect(listView).toBeVisible();
    });


    it('should call appropriate handlers when changes happen', () => {
        const allTab = screen.getByRole('button', { name: 'All' }) as HTMLButtonElement;
        const favoriteTab = screen.getByRole('button', { name: 'Favorite' }) as HTMLButtonElement;
        const searchEntry = screen.getByPlaceholderText('Search') as HTMLInputElement;
        const typeSelection = screen.getByLabelText('pokemonType') as HTMLSelectElement;
        const detailView = screen.getAllByAltText('Not found')[0] as HTMLImageElement;
        const listView = screen.getAllByAltText('Not found')[1] as HTMLImageElement;

        fireEvent.click(allTab);
        expect(mockHandleChange).toHaveBeenCalledWith('tabView', TabView.All);
        mockHandleChange.mockClear();

        fireEvent.click(favoriteTab);
        expect(mockHandleChange).toHaveBeenCalledWith('tabView', TabView.Favorite);
        mockHandleChange.mockClear();

        fireEvent.change(searchEntry, { target: { value: 'Iba' }});
        expect(mockHandleChange).toHaveBeenCalledWith('searchValue', 'Iba');
        mockHandleChange.mockClear();

        fireEvent.change(typeSelection, { target: { value: 'Ice' }});
        expect(mockHandleChange).toHaveBeenCalledWith('type', 'Ice');
        mockHandleChange.mockClear();

        fireEvent.click(listView);
        expect(mockHandleViewChange).toHaveBeenCalledWith(PokemonsView.List);

        fireEvent.click(detailView);
        expect(mockHandleViewChange).toHaveBeenCalledWith(PokemonsView.Detail);
    });
});

