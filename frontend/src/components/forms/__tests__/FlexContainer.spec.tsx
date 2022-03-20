import React from 'react';
import {render, RenderResult, screen} from '@testing-library/react';
import {noop} from 'lodash-es';

import {Button, FlexContainer} from '@components/forms';
import {FlexContainerProps} from '@types';

describe('FlexContainer Component', () => {
    let component: RenderResult;
    const getComponent = (properties: FlexContainerProps): JSX.Element => {
        return (
            <FlexContainer
                {...properties}
            >
                <Button
                    name='sample'
                    onClick={noop}
                >
                    Sample
                </Button>
            </FlexContainer>
        );
    };

    beforeEach(() => {
        component = render(getComponent({}));
    });

    it('should render the default state', () => {
        const button = screen.getByRole('button', { name: 'Sample' }) as HTMLButtonElement;
        const container = button.parentElement as HTMLDivElement;
        const style = window.getComputedStyle(container);

        expect(container).toBeVisible();
        //should render the child component
        expect(button).toBeVisible();

        //check default style configuration
        expect(style.justifyContent).toBe('flex-start');
        expect(style.alignItems).toBe('flex-start');
        expect(style.flexDirection).toBe('row');
        expect(style.flexWrap).toBe('nowrap');
    });

    it('should render accordingly to state changes', () => {
        component.rerender(getComponent({
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'wrap'
        }));
        const button = screen.getByRole('button', { name: 'Sample' }) as HTMLButtonElement;
        const container = button.parentElement as HTMLDivElement;
        const style = window.getComputedStyle(container);

        expect(style.justifyContent).toBe('center');
        expect(style.alignItems).toBe('center');
        expect(style.flexDirection).toBe('column');
        expect(style.flexWrap).toBe('wrap');
    });
});

