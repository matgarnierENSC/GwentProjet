export const useFirebaseValues = (path, defaultValue = undefined) => {
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true); // ← true par défaut
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    let active = true;
    const dataRef = getFirebaseRef(path);

    const unsubscribe = onValue(dataRef, (snapshot) => {
      if (active) {
        const val = snapshot.val();
        initialized.current = true;
        if (val !== undefined) setData(val);
        setLoading(false); // ← dans le callback, pas dehors
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