import React from 'react';
import {render, RenderResult, screen, fireEvent} from '@testing-library/react';

import {Select} from '@components/forms';
import {SelectProps} from '@types';

describe('Select Component', () => {
    let component: RenderResult;
    const mockHandleChange: jest.Mock = jest.fn();
    const properties = {
        name: 'selection',
        value: '',
        options: ['tiger', 'lion', 'monkey'],
        onChange: mockHandleChange
    };
    const getComponent = (properties: SelectProps): JSX.Element => {
        return (
            <Select
                {...properties}
            />
        );
    };

    beforeEach(() => {
        component = render(getComponent(properties));
    });

    it('should render the default state', () => {
        const select = screen.getByLabelText('selection') as HTMLSelectElement;

        expect(select).toBeVisible();
        expect(select).toHaveValue('');
    });

    it('should render accordingly to state changes', () => {
        component.rerender(getComponent({
            ...properties,
            value: 'tiger'
        }));

        expect(screen.getByLabelText('selection') as HTMLSelectElement).toHaveValue('tiger');
    });

    it('should call ~mockHandleChange~ when selection is made', () => {
        const select = screen.getByLabelText('selection') as HTMLSelectElement;

        fireEvent.change(select, { target: { value: 'tiger' }});
        expect(mockHandleChange).toHaveBeenCalled();
    });
});

