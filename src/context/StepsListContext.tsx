import React, {createContext, useContext, useState, ReactNode} from 'react';

interface listProps {
  key: string;
  todo: string;
}

interface StepsListProps {
  step: number;
  list: listProps[];
}

interface StepsListContextProps {
  stepsListData: StepsListProps;
  setStepsListData: React.Dispatch<React.SetStateAction<StepsListProps>>;
}

const StepsListContext = createContext<StepsListContextProps | undefined>(
  undefined,
);

interface DataProviderProps {
  children: ReactNode;
}

export const StepsListProvider: React.FC<DataProviderProps> = ({children}) => {
  const [stepsListData, setStepsListData] = useState<StepsListProps>({
    step: 1,
    list: [],
  } as StepsListProps);

  return (
    <StepsListContext.Provider
      value={{
        setStepsListData,
        stepsListData,
      }}>
      {children}
    </StepsListContext.Provider>
  );
};

export const useStepsList = () => {
  const context = useContext(StepsListContext);

  if (!context) {
    throw new Error('usePreview must be used within a PreviewProvider');
  }

  return context;
};
