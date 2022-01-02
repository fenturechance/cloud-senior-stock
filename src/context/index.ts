import { createContext } from 'react'
export interface GlobalContextType {
  loading: boolean,
  setLoading: Function
}
export const globalContext: GlobalContextType = {
  loading: false,
  setLoading: () => {}
}
export const setLoadingInContext = (state: GlobalContextType, setState: Function) => (bool: Boolean) => {
  setState({ ...state, loading: bool })
}
const contextStore = createContext(globalContext)
export default contextStore