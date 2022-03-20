import {Dispatch, useReducer} from 'react';
import {TabView, Action, ActionWithPayload, PokemonFilter} from '../types';

const initialState: PokemonFilter = {
    tabView: TabView.All,
    searchValue: '',
    type: ''
};

/**
 From my experience, one improvement I suggest we make is build a genericReducer that may be used throughout our
 application wherever we have forms. This would allow us to easily manage updates to JSON blobs which may be persisted later. Moreover,
 this generic reducer may also take in property validators that validates property values.
 i.e., is this field valid? did the user enter a valid year? etc... Then we show an error accordingly at field level.
**/

export const pokemonFilterReducer = (state: PokemonFilter, action: Action) => {
    switch (action.type) {
    case('UPDATE_PROPERTY'): {
        const $action = action as ActionWithPayload;

        return {
            ...state,
            [$action.property]: $action.value
        };
    }
    case 'RESET':
        return initialState;
    default:
        return state;
    }
};

const usePokemonFilter = (): [PokemonFilter, Dispatch<Action>] => {
    const [ state, dispatch ] = useReducer(pokemonFilterReducer, initialState, undefined);

    return [
        state,
        dispatch
    ]
};

export default usePokemonFilter;