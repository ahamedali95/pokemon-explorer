import { useState, useEffect } from 'react';
import {AlertKind} from '../types';

const useToastNotification = () => {
    const [visible, setVisible] = useState<boolean>(false);
    const [content, setContent] = useState<string>('');
    const [kind, setKind] = useState<string>('');

    useEffect(() => {
        if (visible) {
            setTimeout(() => {
                setVisible(false);
            }, 800);
        }
    }, [visible]);

    const openNotification = (kind: AlertKind, content: string): void => {
        setKind(kind);
        setContent(content);
        setVisible(true);
    };

    return {
        openNotification,
        visible,
        content,
        kind
    };
};

export default useToastNotification;