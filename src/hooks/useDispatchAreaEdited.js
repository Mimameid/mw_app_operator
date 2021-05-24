import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEdited } from '../store/deliveryZone/mode/action';

function useDispatchAreaEdited(areas, activeArea) {
  const dispatch = useDispatch();

  useEffect(() => {
    function wasAreaEdited() {
      let currentPolygons = activeArea.areaPolygons;

      // check if the current polygon is an existing one
      let selectedArea = areas.find((area) => area.areaNumber === activeArea.areaNumber);
      if (selectedArea) {
        // Check if arrays are equal
        if (JSON.stringify(selectedArea.areaPolygons) === JSON.stringify(currentPolygons)) {
          return false;
        } else {
          // TODO: see task #e508ja
          return true;
        }
      } else {
        // handle new area
        if (currentPolygons.length > 0) {
          return currentPolygons[0][0].length > 3;
        } else {
          return false;
        }
      }
    }
    dispatch(setEdited(wasAreaEdited()));
  }, [areas, activeArea, dispatch]);
}

export default useDispatchAreaEdited;
