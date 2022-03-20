import React from 'react';
import styled from 'styled-components';

import {SelectProps} from '@types';

const StyledSelect = styled.select`
    padding: 13px 14px;
    border-radius: 6px;
    color: #6d1cac;
    font-size: 20px;
    font-weight: 100;
    border: 1px solid #6d1cac;
    outline: 0px;
    height: 50px;
    min-width: 90px;
    margin-left: 4px;
    margin-right: 4px;
    width: 100%;
    
    :invalid { 
        color: gray; 
    }
`;

const Select: React.FC<SelectProps> = ({ className = '', name, onChange, options, value }) => {
    return (
        <StyledSelect
            aria-label={name}
            className={className}
            name={name}
            onChange={onChange}
            value={value}
        >
            {
                ['', ...options].map((option: string, index): JSX.Element => {
                    if (index === 0) {
                        return (
                            <option
                                key={`${option}_${index}`}
                                value={option}
                            >
                                {`--${name}--`}
                            </option>
                        );
                    }

                    return (
                        <option
                            key={`${option}_${index}`}
                            value={option}
                        >
                            {option}
                        </option>
                    );
                })
            }
        </StyledSelect>
    );
};

export default Select;