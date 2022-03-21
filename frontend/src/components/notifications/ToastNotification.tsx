import React from 'react';
import styled from 'styled-components';

import dangerAlert from '@assets/icons/danger-alert.png';
import successTick from '@assets/icons/success-tick.png';
import { ToastNotificationProps } from '@types';

const StyledToastNotification = styled.div<Partial<ToastNotificationProps>>`
    z-index: 1;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: ${props => props.kind === 'error' ? 'rgb(211, 47, 47)' : 'rgb(56, 142, 60)'};
    visibility: ${props => props.visible ? 'visible' : 'hidden'};
    font-weight: 400;
    font-size: 20px;
    line-height: 20px;
    color: white;
    min-width: 100px;
    padding: 16px;
    border-radius: 5px;
    width: 50%;
    min-height: 30px;
    
    .content-text {
        margin-left: 10px;
    }
`;

const ToastNotification: React.FC<ToastNotificationProps> = ({ visible, content, kind }) => {
    return (
        <>
            {
                visible ?
                    <StyledToastNotification
                        role='alert'
                        kind={kind}
                        visible={visible}
                    >
                        {
                            kind === 'error' ?
                                <img src={dangerAlert} />
                                :
                                <img src={successTick} />
                        }
                        <span className='content-text'>{content}</span>
                    </StyledToastNotification>
                    :
                    null
            }
        </>
    );
};

export default ToastNotification;