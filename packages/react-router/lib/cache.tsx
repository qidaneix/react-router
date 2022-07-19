import * as React from "react";
import { useLocation } from "./hooks";

type CacheType = Record<string, React.ReactElement>;

const CacheContext = React.createContext<CacheType>({});

const useCache = (element: React.ReactElement) => {
  const cacheRef = React.useRef<CacheType>({});

  const { pathname, search, hash } = useLocation();
  const theKey = pathname + search + hash;

  if (!Object.prototype.hasOwnProperty.call(cacheRef.current, theKey)) {
    cacheRef.current[theKey] = element;
  }
};

const Cache: React.FC = ({ children }) => {
  const cacheRef = React.useRef<CacheType>({});

  return (
    <CacheContext.Provider value={cacheRef.current}>
      {children}
    </CacheContext.Provider>
  );
};

export { Cache };
