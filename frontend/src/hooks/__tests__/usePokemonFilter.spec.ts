import {pokemonFilterReducer} from '../usePokemonFilter';
import {TabView} from '../../types';

describe('pokemonFilterReducer()', () => {
    it('should return expected values', () => {
        const state = pokemonFilterReducer({
            tabView: TabView.All,
            searchValue: '',
            type: ''
        }, {
            property: 'searchValue',
            value: 'Almeizze',
            type: 'UPDATE_PROPERTY'
        });

        expect(state).toEqual({
            tabView: TabView.All,
            searchValue: 'Almeizze',
            type: ''
        });

        const state2 = pokemonFilterReducer({
            tabView: TabView.All,
            searchValue: 'Almeizze',
            type: 'Grass'
        }, {
            type: 'RESET'
        });

        expect(state2).toEqual({
            tabView: TabView.All,
            searchValue: '',
            type: ''
        });
    });
});

