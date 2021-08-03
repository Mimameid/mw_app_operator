import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setEdited } from 'features/deliveryAreas/slices//mode/actions';

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
          if (currentPolygons[activeArea.selectedPolygonIndex][0].length > 3) {
            return true;
          }
          // TODO: see task #e508ja
          return false;
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
