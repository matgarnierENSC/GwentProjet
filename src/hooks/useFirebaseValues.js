import { useState, useEffect, useRef } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { firebaseApp } from "../main.jsx";

export const useFirebaseValues = (path, defaultValue = undefined) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    let active = true;
    const dataRef = ref(getDatabase(firebaseApp), path);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (active) {
        const val = snapshot.val();
        initialized.current = true;
        if (val !== undefined) setData(val);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
      initialized.current = false;
      active = false;
    };
  }, [path]);

  return [data, loading];
};
