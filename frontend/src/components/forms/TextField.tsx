import React from 'react';
import styled from 'styled-components';

import {TextFieldProps} from '@types';

const StyledTextField = styled.input`
    padding: 13px 14px;
    border-radius: 6px;
    color: #6d1cac;
    font-size: 20px;
    font-weight: 100;
    border: 1px solid #6d1cac;
    outline: 0px;
    height: 22px;
    min-width: 90px;
    margin-left: 4px;
    margin-right: 4px;
    width: 100%;
`;

const TextField: React.FC<TextFieldProps> = ({ className = '', placeholder = '', name, onChange, value }) => {
    return (
        <StyledTextField
            aria-label={name}
            className={className}
            name={name}
            placeholder={placeholder}
            type="text"
            value={value}
            onChange={onChange}
        />
    );
};

export default TextField;