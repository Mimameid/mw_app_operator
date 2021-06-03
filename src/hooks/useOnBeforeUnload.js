import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export function useOnBeforeUnload() {
  const changed = useSelector((state) => state.deliveryZone.mode.changed);

  useEffect(() => {
    function handler(event) {
      if (changed) {
        event.preventDefault(); // for Firefox
        // event.returnValue = `message="Wenn Sie die Bearbeitung abbrechen, werden alle Veränderungen
        // unwiederruflich gelöscht. Bearbeitung abbrechen?`; // for Chrome
        event.returnValue = ''; // for Chrome
        return '';
      }
    }

    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [changed]);

  return;
}
