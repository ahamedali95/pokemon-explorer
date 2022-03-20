import { renderHook, act } from '@testing-library/react-hooks';

import {useToastNotification} from '@hooks';

jest.useFakeTimers();

describe('useToastNotification()', () => {
    it('should handle showing and unshowing of notification', () => {
        const { result } = renderHook((() => useToastNotification()));

        act(() => {
            result.current.openNotification('error', 'Failure.');
        });

        expect(result.current.visible).toBe(true);
        expect(result.current.kind).toBe('error');
        expect(result.current.content).toBe('Failure.');

        act(() => {
            jest.advanceTimersByTime(800);
        });

        expect(result.current.visible).toBe(false);
    });
});