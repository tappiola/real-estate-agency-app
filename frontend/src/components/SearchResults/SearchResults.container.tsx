import {useEffect, useState} from "react";
import {searchProperties} from "../../queries";
import {useSearchParams} from "react-router-dom";
import SearchResults from "./SearchResults.component";
import {useAppSelector} from '../../redux/store';

const SearchResultsContainer = () => {
    const [properties, setProperties] = useState([]);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [activeItem, setActiveItem] = useState(0);

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const {scrollOffset} = useAppSelector(({ navigation }) => navigation);

        useEffect(() => {
            if (scrollOffset){
                setTimeout(() => window.scrollTo({top: scrollOffset, behavior: 'smooth'}), 100);
            }
        }
        ,[]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await searchProperties(currentPage);
                const {data: {getProperties: {items, pages, count}}} = await response.json();
                setProperties(items);
                setPages(pages);
                setCount(count);
                setIsLoading(false);
            } catch (e){
                console.log(e);
                setIsLoading(false);
            }
        };

        fetchProperties();

    }, [currentPage]);

    useEffect(() => setActiveItem(0), [currentPage]);

    return <SearchResults
        count={count}
        currentPage={currentPage}
        isLoading={isLoading}
        pages={pages}
        properties={properties}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
    />
}

export default SearchResultsContainer;