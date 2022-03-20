import React, {memo} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { noop } from 'lodash-es';

import likeFilled from '@assets/icons/like-filled.svg';
import likeUnfilled from '@assets/icons/like-unfilled.svg';
import { FlexContainer } from '@components/forms';
import soundHighIcon from '@assets/icons/sound-high.svg';
import {Pokemon, PokemonsView} from '../../types';

type PokemonCardProps = {
    className?: string;
    // Improvement: consolidate the views in a single enum. There could be potentially more card views and easy to manage that way
    view?: PokemonsView;
    detailView?: boolean;
    hideFavoriteOrUnfavoriteOption?: boolean;
    onFavorite?: (id: string) => unknown;
    onUnFavorite?: (id: string) => unknown;
    pokemon: Pokemon;
};

const StyledCard = styled.div<Partial<PokemonCardProps>>`
    border-radius: 6px;
    border: 1px solid gray;
    min-width: 290px;
    margin: 4px 5px;
    width: ${props => props.view === PokemonsView.List.valueOf() ? '100%' : '0%'};
    
    .profile-image-small {
        width: 150px;
        height: 150px;
        cursor: pointer;
    };
    
    .profile-image-big {
        width: 250px;
        height: 250px;
    };
    
    .profile-image-horizontal-view {
        width: 70px;
        height: 60px;
        cursor: pointer;
    }
    
    .sound-icon {
        cursor: pointer;
    }
    
    > .content {
       border-bottom: ${props => props.detailView ? '1px solid black' : '0px'};
    }
    
    > .content > div {
       padding: 0px !important;
    }
    
    > .content, .extra-content {
       color: black;
       background-color: #E8E8E8;
       font-size: 16px;
    };
    
    > .extra-content .height-info-container {
       border-left: 1px solid black;
    }
    
    > .content .header {
       font-weight: 700;
       font-size: 23px;
       cursor: pointer;
    };
    
    > .content .description {
       display: block;
    };
    
     > .content .favorite {
       width: 20px;
       height: 20px;
       cursor: pointer;
    };
    
    > .detailView, .weight-height-info-header {
       padding-left: 15px;
       font-weight: 700;
       font-size: 17px;
    }
`;

const PokemonCard: React.FC<PokemonCardProps> = ({ className = '', view = PokemonsView.Detail, detailView = false, hideFavoriteOrUnfavoriteOption = false, pokemon, onFavorite = noop, onUnFavorite = noop }) => {
    const history = useHistory();

    const playSound = (): void => {
        new Audio(pokemon.sound).play();
    };

    return (
        <StyledCard
            className={className}
            detailView={detailView}
            view={view}
        >
            {
                view === PokemonsView.Detail ?
                    <>
                        <FlexContainer
                            justifyContent="center"
                            alignItems="flex-end"
                        >
                            <img
                                className={detailView ? 'profile-image-big' : 'profile-image-small'}
                                src={pokemon.image}
                                onClick={() => history.push(`${pokemon.name}`)}
                            />
                            {
                                detailView ?
                                    <img
                                        className="sound-icon"
                                        src={soundHighIcon}
                                        onClick={playSound}
                                    />
                                    :
                                    <></>
                            }
                        </FlexContainer>
                        <div className="content">
                            <FlexContainer>
                                <FlexContainer flexDirection="column">
                                    <a
                                        className="header"
                                        onClick={() => history.push(`${pokemon.name}`)}
                                    >
                                        {pokemon.name}
                                    </a>
                                    <span className="description">{(pokemon.types ?? []).join(', ')}</span>
                                    {
                                        detailView ?
                                            <>
                                                <span>{`CP: ${pokemon.maxCP}`}</span>
                                                <span>{`HP: ${pokemon.maxHP}`}</span>
                                            </>
                                            :
                                            <></>
                                    }
                                </FlexContainer>
                                {
                                    !hideFavoriteOrUnfavoriteOption ?
                                        <FlexContainer justifyContent="flex-end">
                                            {
                                                pokemon.isFavorite ?
                                                    <img
                                                        className="favorite"
                                                        src={likeFilled}
                                                        onClick={() => onUnFavorite(pokemon.id)}
                                                    />
                                                    :
                                                    <img
                                                        className="favorite"
                                                        src={likeUnfilled}
                                                        onClick={() => onFavorite(pokemon.id)}
                                                    />
                                            }
                                        </FlexContainer>
                                        :
                                        <></>
                                }
                            </FlexContainer>
                        </div>
                        {
                            detailView &&
                                <div className="extra-content">
                                    <FlexContainer>
                                        <FlexContainer justifyContent="center" flexDirection="column" alignItems="center">
                                            <span className="weight-height-info-header">Weight</span>
                                            <span>{`${pokemon.weight.minimum}-${pokemon.weight.maximum}`}</span>
                                        </FlexContainer>
                                        <FlexContainer className="height-info-container" justifyContent="center" flexDirection="column" alignItems="center">
                                            <span className="weight-height-info-header">Height</span>
                                            <span>{`${pokemon.height.minimum}-${pokemon.height.maximum}`}</span>
                                        </FlexContainer>
                                    </FlexContainer>
                                </div>
                        }
                    </>
                    :
                    <div className="content">
                        <FlexContainer>
                            <img
                                className="profile-image-horizontal-view"
                                src={pokemon.image}
                                onClick={() => history.push(`${pokemon.name}`)}
                            />
                            <FlexContainer flexDirection="column">
                                <a
                                    className="header"
                                    onClick={() => history.push(`${pokemon.name}`)}
                                >
                                    {pokemon.name}
                                </a>
                                <span className="description">{(pokemon.types ?? []).join(', ')}</span>
                            </FlexContainer>
                            {
                                !hideFavoriteOrUnfavoriteOption ?
                                    <FlexContainer justifyContent="flex-end" alignItems="center">
                                        {
                                            pokemon.isFavorite ?
                                                <img
                                                    className="favorite"
                                                    src={likeFilled}
                                                    onClick={() => onUnFavorite(pokemon.id)}
                                                />
                                                :
                                                <img
                                                    className="favorite"
                                                    src={likeUnfilled}
                                                    onClick={() => onFavorite(pokemon.id)}
                                                />
                                        }
                                    </FlexContainer>
                                    :
                                    <></>
                            }
                        </FlexContainer>
                    </div>
            }
        </StyledCard>
    );
};

export default memo(PokemonCard);