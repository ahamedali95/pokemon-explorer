import React from 'react';
import {render, RenderResult, screen} from '@testing-library/react';

import {ToastNotification} from '@components/notifications';
import {ToastNotificationProps} from '@types';

describe('ToastNotification Component', () => {
    let component: RenderResult;
    const properties = {
        visible: true,
        content: 'Successful action!',
        kind: 'success',
    };
    const getComponent = (properties: ToastNotificationProps): JSX.Element => {
        return (
            <ToastNotification
                {...properties}
            />
        );
    };

    beforeEach(() => {
        component = render(getComponent(properties));
    });

    it('should render the default state', () => {
        expect(screen.getByText('Successful action!') as HTMLSpanElement).toBeVisible();
    });

    it('should render accordingly to state changes', () => {
        component.rerender(getComponent({ ...properties, visible: false }));

        expect(screen.queryByText('Successful action!') as HTMLSpanElement).not.toBeInTheDocument();
    });
});

