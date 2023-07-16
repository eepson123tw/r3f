// @ts-nocheck
import React from 'react'
const AppContext = React.createContext()
AppContext.displayName = 'AppContext'

const appActionType = {
  init: 'init',
  patch: 'patch'
}

function appReducer(state, action) {
  switch (action.type) {
    case appActionType.init: {
      return {
        ...state,
        windowWidth: action.windowWidth,
        routerName: action.routerName
      }
    }
    case appActionType.patch: {
      return {
        ...state,
        routerName: action.routerName,
        windowWidth: action.windowWidth
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(appReducer, {
    windowWidth: null,
    routerName: ''
  })
  const value = [state, dispatch]
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

function useApp() {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error(`useApp must be used within a AppContext`)
  }
  return context
}

export { AppProvider, useApp }
