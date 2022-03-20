import React from 'react';
import {render, RenderResult, screen, fireEvent} from '@testing-library/react';

import {TextField} from '@components/forms';
import {TextFieldProps} from '@types';

describe('TextField Component', () => {
    let component: RenderResult;
    const mockHandleChange: jest.Mock = jest.fn();
    const properties = {
        name: 'nameEntry',
        placeholder: 'Enter name',
        value: 'David Cooper',
        onChange: mockHandleChange
    };
    const getComponent = (properties: TextFieldProps): JSX.Element => {
        return (
            <TextField
                {...properties}
            />
        );
    };

    beforeEach(() => {
        component = render(getComponent(properties));
    });

    it('should render the default state', () => {
        const input = screen.getByPlaceholderText('Enter name') as HTMLInputElement;

        expect(input).toBeVisible();
        expect(input).toHaveValue('David Cooper');
    });

    it('should render accordingly to state changes', () => {
        component.rerender(getComponent({ ...properties, value: 'Joanne Cooper' }));
        const input = screen.getByPlaceholderText('Enter name') as HTMLInputElement;

        expect(input).toHaveValue('Joanne Cooper');
    });

    it('should call ~mockHandleChange~ when entry is made', () => {
        const input = screen.getByPlaceholderText('Enter name') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'David Anderson' }});
        expect(mockHandleChange).toHaveBeenCalled();
    });
});

