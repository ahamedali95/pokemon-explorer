import {useMemo, useState} from 'react';

const usePagination = (recordsCount = 0, recordsPerPage = -1) => {
    const [currentPage, setCurrentPage] = useState(recordsCount ? 1 : 0);
    const totalPages = Math.ceil(recordsCount / recordsPerPage);

    const buttonsStatus = useMemo(() => {
        return {
            first: currentPage === 1,
            last: currentPage === totalPages || totalPages === 0,
            previous: (currentPage - 1) < 1,
            next: (currentPage + 1) > totalPages
        };
    }, [currentPage, totalPages]);

    const handleClick = (type: string): void => {
        if (type === 'first') {
            setCurrentPage(1);
        } else if (type === 'last') {
            setCurrentPage(totalPages);
        } else if (type === 'previous') {
            setCurrentPage(currentPage - 1);
        } else if (type === 'next') {
            setCurrentPage(currentPage + 1);
        }
    };

    return {
        buttonsStatus,
        currentPage,
        totalPages,
        handleClick,
        setCurrentPage
    };
};

export default usePagination;