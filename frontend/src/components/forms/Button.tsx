import React from 'react';
import styled from 'styled-components';
import {ButtonProps} from '@types';

const StyledButton = styled.button`
    padding: 6px 7px;
    border-radius: 5px;
    text-align: center;
    color: #6d1cac;
    font-size: 20px;
    font-weight: 500;
    margin-left: 4px;
    margin-right: 4px;
    border: 1px solid #6d1cac;
    outline: 0px;
    min-width: 90px;
    letter-spacing: 1px;
    height: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
    &.focused {
        color: white;
        background-color: #6d1cac;
    };
    
    .span-width {
       width: 100%;
    };
    
    :disabled {
        background-color: #BEBEBE;
        cursor: not-allowed;
    }
    
`;

const Button: React.FC<ButtonProps> = ({ children, className = '', name, disabled = false, onClick }) => {
    return (
        <StyledButton
            className={className}
            disabled={disabled}
            name={name}
            type='button'
            onClick={onClick}
        >
            {children}
        </StyledButton>
    );
};

export default Button;