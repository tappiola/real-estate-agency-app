import {useEffect, useState} from "react";
import {searchProperties} from "../../queries";
import {useNavigate, useSearchParams} from "react-router-dom";
import SearchResults from "./SearchResults.component";
import {useDispatch, useSelector} from "react-redux";
import {saveScrollPosition} from "../../store/Navigation/actions";
import {queryProperties} from "../../store/Properties/actions";

const SearchResultsContainer = () => {
    const [properties, setProperties] = useState([]);
    const [pages, setPages] = useState(1);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    // @ts-ignore
    const {scrollOffset} = useSelector(({ navigation }) => navigation);

    // @ts-ignore
    const {items} = useSelector(({ properties }) => properties);
    console.log(items);

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

        dispatch(queryProperties(currentPage));
    }, [currentPage]);

    return <SearchResults count={count} currentPage={currentPage} isLoading={isLoading} pages={pages} properties={properties}/>
}

export default SearchResultsContainer;