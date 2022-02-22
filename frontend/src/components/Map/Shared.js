import {useState} from "react";
import PropertiesList from '../PropertiesList/PropertiesList';
import Map from "./Map";
import {listItems} from "./consts";
import './Shared.style.scss';

const Shared = () => {
    const [activeItem, setActiveItem] = useState(0);

    return <div className="container">
        <div className="pane left">
            <PropertiesList properties={listItems} activeItem={activeItem} setActiveItem={setActiveItem}/>
        </div>
        <div className="pane right">
            <Map properties={listItems} activeItem={activeItem} setActiveItem={setActiveItem}/>
        </div>
    </div>
}

export default Shared;