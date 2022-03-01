import React from "react";
import { Filter} from "../../constants";
import {SelectOption} from "../../types";

const AdvancedSearchForm: React.FC<{filterSettings: any,
    updateParam: (name: Filter, value: string) => void,
    getMinPriceOptions: () => SelectOption[],
    getMaxPriceOptions: () =>  SelectOption[],
    getMinBedroomsOptions: () =>  SelectOption[],
    getMaxBedroomsOptions: () =>  SelectOption[],
    onSearchButtonClick: () => void
}> = (
    {
        filterSettings,
        updateParam,
        getMinPriceOptions,
        getMaxPriceOptions,
        getMinBedroomsOptions,
        getMaxBedroomsOptions,
        onSearchButtonClick
    }) => {

    return <AdvancedSearchForm
        filterSettings={filterSettings}
        updateParam={updateParam}
        getMinPriceOptions={getMinPriceOptions}
        getMaxPriceOptions={getMaxPriceOptions}
        getMinBedroomsOptions={getMaxBedroomsOptions}
        getMaxBedroomsOptions={getMinBedroomsOptions}
        onSearchButtonClick={onSearchButtonClick}
    />
}

export default AdvancedSearchForm;
