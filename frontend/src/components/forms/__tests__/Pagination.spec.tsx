import React from 'react';
import {render, RenderResult, screen, fireEvent} from '@testing-library/react';

import {Pagination} from '@components/forms';
import {PaginationProps} from '@types';

describe('Pagination Component', () => {
    let component: RenderResult;
    const mockHandleClick: jest.Mock = jest.fn();
    const properties: PaginationProps = {
        buttonsStatus: {
            first: false,
            previous: false,
            next: false,
            last: false
        },
        currentPage: 10,
        totalPages: 100,
        onClick: mockHandleClick
    };
    const getComponent = (properties: PaginationProps): JSX.Element => {
        return (
            <Pagination
                {...properties}
            />
        );
    };

    beforeEach(() => {
        component = render(getComponent(properties));
    });

    afterEach(() => {
        mockHandleClick.mockClear();
    });

    it('should render the default state', () => {
        const firstBtn = screen.getByRole('button', { name: '<<' }) as HTMLButtonElement;
        const previousBtn = screen.getByRole('button', { name: '<' }) as HTMLButtonElement;
        const nextBtn = screen.getByRole('button', { name: '>' }) as HTMLButtonElement;
        const lastBtn = screen.getByRole('button', { name: '>>' }) as HTMLButtonElement;

        expect(screen.getByText('Showing results for page 10 of 100')).toBeVisible();

        expect(firstBtn).toBeVisible();
        expect(previousBtn).toBeVisible();
        expect(nextBtn).toBeVisible();
        expect(lastBtn).toBeVisible();

        expect(firstBtn).toHaveTextContent('<<');
        expect(previousBtn).toHaveTextContent('<');
        expect(nextBtn).toHaveTextContent('>');
        expect(lastBtn).toHaveTextContent('>>');

        expect(firstBtn).toBeEnabled();
        expect(previousBtn).toBeEnabled();
        expect(nextBtn).toBeEnabled();
        expect(lastBtn).toBeEnabled();
    });

    it('should call ~mockHandleClick~ when each of the navigation button is clicked', () => {
        const firstBtn = screen.getByRole('button', { name: '<<' }) as HTMLButtonElement;
        const previousBtn = screen.getByRole('button', { name: '<' }) as HTMLButtonElement;
        const nextBtn = screen.getByRole('button', { name: '>' }) as HTMLButtonElement;
        const lastBtn = screen.getByRole('button', { name: '>>' }) as HTMLButtonElement;

        fireEvent.click(firstBtn);
        expect(mockHandleClick).toHaveBeenCalledWith('first');
        mockHandleClick.mockClear();

        fireEvent.click(previousBtn);
        expect(mockHandleClick).toHaveBeenCalledWith('previous');
        mockHandleClick.mockClear();

        fireEvent.click(nextBtn);
        expect(mockHandleClick).toHaveBeenCalledWith('next');
        mockHandleClick.mockClear();

        fireEvent.click(lastBtn);
        expect(mockHandleClick).toHaveBeenCalledWith('last');
    });

    it('should render accordingly to state changes', () => {
        component.rerender(getComponent({
            ...properties,
            buttonsStatus: {
                first: true,
                previous: true,
                next: true,
                last: true
            }
        }));

        const firstBtn = screen.getByRole('button', { name: '<<' }) as HTMLButtonElement;
        const previousBtn = screen.getByRole('button', { name: '<' }) as HTMLButtonElement;
        const nextBtn = screen.getByRole('button', { name: '>' }) as HTMLButtonElement;
        const lastBtn = screen.getByRole('button', { name: '>>' }) as HTMLButtonElement;

        expect(firstBtn).toBeDisabled();
        expect(previousBtn).toBeDisabled();
        expect(nextBtn).toBeDisabled();
        expect(lastBtn).toBeDisabled();
    });
});

