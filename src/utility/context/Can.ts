// ** Imports createContext function
import { createContext } from 'react';

// ** Imports createContextualCan function
import { createContextualCan } from '@casl/react';

interface ContextState {
    // set the type of state you want to handle with context e.g.
    name: string | null;
}

// ** Create Context
export const AbilityContext = createContext({} as ContextState);

// ** Init Can Context
export const can = createContextualCan(AbilityContext.Consumer);
