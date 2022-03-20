import React from 'react';
import styled from 'styled-components';
import {FlexContainerProps} from '@types';

const StyledContainer = styled.div<FlexContainerProps>`
    display: flex;
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    flex-direction: ${props => props.flexDirection};
    flex-wrap: ${props => props.flexWrap};
    width: 100%;
    padding: 5px;
    min-height: 50px;
    overflow: auto;
    .span-width {
       width: 100%;
    }
`;

const FlexContainer: React.FC<FlexContainerProps> = ({ className = '', children, justifyContent = 'flex-start', alignItems = 'flex-start', flexDirection = 'row', flexWrap = 'nowrap'}) => {
    return (
        <StyledContainer
            className={className}
            alignItems={alignItems}
            justifyContent={justifyContent}
            flexDirection={flexDirection}
            flexWrap={flexWrap}
        >
            {children}
        </StyledContainer>
    );
};

export default FlexContainer;