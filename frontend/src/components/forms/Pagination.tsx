import React from 'react';
import styled from 'styled-components';

import {Button, FlexContainer} from '@components/forms';
import {PaginationProps} from '@types';

const StyledPagination = styled.div`
    .meta-data {
        font-size: 20px;
    }
`;

const Pagination: React.FC<PaginationProps> = ({ buttonsStatus, onClick, currentPage, totalPages }) => {
    return (
        <StyledPagination>
            <FlexContainer alignItems="center">
                <span className='meta-data'>{`Showing results for page ${currentPage} of ${totalPages}`}</span>
                <Button
                    disabled={buttonsStatus.first}
                    name="first"
                    onClick={() => onClick('first')}
                >
                    {'<<'}
                </Button>
                <Button
                    disabled={buttonsStatus.previous}
                    name="previous"
                    onClick={() => onClick('previous')}
                >
                    {'<'}
                </Button>
                <Button
                    disabled={buttonsStatus.next}
                    name="next"
                    onClick={() => onClick('next')}
                >
                    {'>'}
                </Button>
                <Button
                    disabled={buttonsStatus.last}
                    name="last"
                    onClick={() => onClick('last')}
                >
                    {'>>'}
                </Button>
            </FlexContainer>
        </StyledPagination>

    );
};

export default Pagination;