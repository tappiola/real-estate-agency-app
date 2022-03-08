import React from "react";
import './Curtain.style.scss';
import AdvancedSearchForm from "../AdvancedSearchForm";
import {AdType} from "../../constants";
import clsx from "clsx";

const Curtain: React.FC<{searchType: AdType, isCurtainActive: boolean, setIsCurtainActive: (status: boolean) => void}> = ({searchType, isCurtainActive, setIsCurtainActive}) => {

    return <div className={clsx("Curtain", isCurtainActive && 'Curtain_isActive')}>
        <AdvancedSearchForm searchType={searchType} setIsCurtainActive={setIsCurtainActive}/>
    </div>
}

export default Curtain;
