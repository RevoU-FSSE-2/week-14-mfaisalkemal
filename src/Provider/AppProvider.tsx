import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface CategoryData {
    key: string;
    id: string;
    name: string;
    is_active: boolean;
}

interface Token {
    value?: string;
}

interface ContextProps {
    categories: CategoryData[];
    setCategories: Dispatch<SetStateAction<CategoryData[]>>;
    token: Token | null;
    setToken: Dispatch<SetStateAction<Token | null>>;
}

interface Props {
    children: ReactNode;
}

const defaultValue: ContextProps = {
    categories: [],
    setCategories: () => { },
    token: null,
    setToken: () => { }
};

export const AppContext = createContext<ContextProps>(defaultValue);

const AppProvider = ({ children }: Props) => {
    const [categories, setCategories] = useState<CategoryData[]>([]);
    const [token, setToken] = useState<Token | null>(null)

    return (
        <AppContext.Provider value={{ categories, setCategories, token, setToken }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;