import CitiesSelect from "../CitiesSelect";
import React, {useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {enqueueToast} from "../../redux/Notifier";
import {Filter, ToastTypes} from "../../constants";
import {useAppDispatch} from "../../redux/store";
import PropertyTypesSelect from "../PropertyTypesSelect/PropertyTypesSelect.container";

const AdvancedSearchForm: React.FC<{searchType: String}> = ({searchType}) => {

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getFilterParams = (params: Filter[]) =>  params.reduce((prev, param) => {
            const value = searchParams.get(param);
            const filterValue = value ? {[param]: value} : {};
            return {...prev, ...filterValue};
        }
    , {});

    const [filterSettings, setFilterSettings] = useState<{ [key in Filter]?: string}>(getFilterParams(Object.values(Filter)));

    const onButtonClick = () => {
        // @ts-ignore
        if (!filterSettings[Filter.City]){
            dispatch(enqueueToast({
                message: 'City is required',
                type: ToastTypes.Warning,
            }));
            return;
        }

        const queryString = new URLSearchParams(filterSettings).toString();

        navigate('?' + queryString);
    }

    return <>
        <CitiesSelect
            placeholder='Any location'
            selectedOption={filterSettings[Filter.City] || ''}
            onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.City]: value})}
        />
            <PropertyTypesSelect
                placeholder='Any property type'
                selectedOption={filterSettings[Filter.PropertyType] || ''}
                onOptionSelect={value => setFilterSettings({...filterSettings, [Filter.PropertyType]: value})}
            />
            <button onClick={onButtonClick}>Search</button>
        </>
}

export default AdvancedSearchForm;
