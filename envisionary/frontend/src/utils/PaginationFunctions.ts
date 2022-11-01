import { useState } from 'react';
import { IReview } from '../types';

// Disclaimer: We used this code in our previous IT2810 project 
// Inspired by: https://codesandbox.io/s/react-hooks-material-ui-pagination-example-trp9o?file=/src/App.js:110-198
function PaginationFunctions(data: Array<IReview>, elementsPerPage: number) {
    const [onPage, setOnPage] = useState(1);
    const numberOfPages = Math.ceil(data.length / elementsPerPage);

    // Skips ahed to a page that isnt after or before the current page
    function skip(page: number) {
        const pageNumber = Math.max(1, page);
        setOnPage(Math.min(pageNumber, numberOfPages));
    }

    // Slices the array at the indexes that indicate what will be displayed
    function dataDisplaying() {
        const start = (onPage - 1) * elementsPerPage;
        const end = start + elementsPerPage;
        return data.slice(start, end);
    }

    return { skip: skip, dataDisplaying: dataDisplaying, onPage: onPage, numberOfPages: numberOfPages };
}

export default PaginationFunctions;
