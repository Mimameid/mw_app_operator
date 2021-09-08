import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// prevents to accidently close the page when there are changes
export default function useOnBeforeUnload() {
  const changed = useSelector((state) => state.mode.changed);

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
