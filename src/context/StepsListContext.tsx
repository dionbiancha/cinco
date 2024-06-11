import React, {createContext, useContext, useState, ReactNode} from 'react';

interface GoalsProps {
  title: string;
  date: Date;
  repeat?: string[];
  finished?: boolean;
}

interface listProps {
  key: string;
  title: string;
  date?: Date;
  goals?: GoalsProps[];
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
  const currentDate = new Date();
  const [stepsListData, setStepsListData] = useState<StepsListProps>({
    step: 3,
    list: [
      {
        date: currentDate,
        key: '4b1f79e4-dfda-46b5-bb3d-7f0789c86906',
        title: 'asdasdasdasdasd',
      },
      {
        date: currentDate,
        key: '55eace6a-00f6-4584-8367-7aade3a80668',
        title: 'asdasdasdasd',
      },
      {
        date: currentDate,
        key: '0cfa78b2-9cc4-48a1-ae3f-19f3c7c55333',
        title: 'asdasdasdasd',
      },
      {
        date: currentDate,
        key: '1ccb5bab-2e2d-423e-97bc-84c4163e7f94',
        title: 'asdasdasdasd',
      },
      {
        date: currentDate,
        key: '8f5f2a79-72b8-4082-81de-a9e5b2afecaf',
        title: 'asdasdasdasd',
      },
      {key: 'c7b27cf1-cea5-4c2c-b484-5792bed7fecd', title: 'asdasdasdasdasd'},
    ],
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
