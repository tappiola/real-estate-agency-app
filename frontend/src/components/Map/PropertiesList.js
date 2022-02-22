  import inView from 'in-view';
  import {useEffect, useRef} from "react";
  import './List.style.scss';

  const Property = ({listItem, index}) => {
    return <div className="list-item" id={`list-item-${index}`}>
      <a href={listItem.website}>
        <img src={listItem.image} alt={listItem.name}/>
        <h2>{listItem.name}</h2>
      </a>
      {listItem.description}
    </div>
  };

  const PropertiesList = ({properties, activeItem, setActiveItem}) => {
    const listRef = useRef();

    const scrollListener = () => {
      // Active list item is top-most fully-visible item
      const visibleListItems = Array.from(
          document.getElementsByClassName('list-item')
      ).map(inView.is);

      // If it's a new one, update active list item
      const topMostVisible = visibleListItems.indexOf(true);
      if (topMostVisible !== activeItem) {
        setActiveItem(topMostVisible);
      }
    };

    useEffect(() => inView.offset(200), []);

    // Update list scroll position when active list item is updated via map
    useEffect(() => {
      if (listRef && listRef.current) {
        listRef.current.scrollTop = document.getElementById(
            `list-item-${activeItem}`
        ).offsetTop;
      }}, [listRef.current, activeItem]);

    return <div id="list-items" ref={listRef} onScroll={scrollListener}>
      { properties.map((listItem, index) => <Property key={index} listItem={listItem} index={index} />)}
        </div>
  }

  export default PropertiesList;