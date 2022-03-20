import React from 'react';
import {render, RenderResult, screen, fireEvent} from '@testing-library/react';

import { Button } from '@components/forms';
import {ButtonProps} from '@types';

describe('Button Component', () => {
    let component: RenderResult;
    const mockHandleClick: jest.Mock = jest.fn();
    const properties = {
        onClick: mockHandleClick,
        name: 'sample'
    };
    const getComponent = (properties: ButtonProps): JSX.Element => {
        return (
            <Button
                {...properties}
            >
                Sample
            </Button>
        );
    };

    beforeEach(() => {
        component = render(getComponent(properties));
    });

    afterEach(() => {
        mockHandleClick.mockClear();
    });

    it('should render the default state', () => {
        const button = screen.getByRole('button', { name: 'Sample' }) as HTMLButtonElement;

        expect(button).toBeVisible();
        expect(button).toBeEnabled();
        expect(button).toHaveTextContent('Sample');
    });

    it('should render accordingly to state changes', () => {
        component.rerender(getComponent({ ...properties, disabled: true }));
        const button = screen.getByRole('button', { name: 'Sample' }) as HTMLButtonElement;

        expect(button).toBeDisabled();
    });

    it('should call ~mockHandleClick~ when it is clicked', () => {
        const button = screen.getByRole('button', { name: 'Sample' }) as HTMLButtonElement;
        fireEvent.click(button);

        expect(mockHandleClick).toHaveBeenCalled();
    });
});

