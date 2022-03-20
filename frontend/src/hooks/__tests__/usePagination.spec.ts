import { renderHook, act } from '@testing-library/react-hooks';

import {usePagination} from '@hooks';

describe('usePagination()', () => {
    it('should allow to navigate between pages', () => {
        const { result } = renderHook((() => usePagination(151, 10)));

        expect(result.current.currentPage).toBe(1);
        expect(result.current.totalPages).toBe(16);

        act(() => {
            result.current.handleClick('first');
        });

        expect(result.current.currentPage).toBe(1);
        expect(result.current.buttonsStatus).toEqual({
            first: true,
            previous: true,
            next: false,
            last: false
        });

        act(() => {
            result.current.handleClick('last');
        });

        expect(result.current.currentPage).toBe(16);
        expect(result.current.buttonsStatus).toEqual({
            first: false,
            previous: false,
            next: true,
            last: true
        });

        act(() => {
            result.current.handleClick('previous');
        });

        expect(result.current.currentPage).toBe(15);
        expect(result.current.buttonsStatus).toEqual({
            first: false,
            previous: false,
            next: false,
            last: false
        });

        act(() => {
            result.current.handleClick('next');
        });

        expect(result.current.currentPage).toBe(16);
        expect(result.current.buttonsStatus).toEqual({
            first: false,
            previous: false,
            next: true,
            last: true
        });
    });
});