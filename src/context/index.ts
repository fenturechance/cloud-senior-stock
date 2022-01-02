import { createContext } from 'react'
export interface GlobalContextType {
  loading: boolean,
  stockSymbol: string,
  setLoading: Function,
  setStockSymbol: Function,
  echartInstance: any,
  setEchartInstance: Function,
}
export const globalContext: GlobalContextType = {
  loading: false,
  stockSymbol: 'MSFT',
  setLoading: () => {},
  setStockSymbol: () => {},
  echartInstance: null,
  setEchartInstance: () => {},
}
export const setLoadingInContext = (state: GlobalContextType, setState: Function) => (bool: Boolean) => {
  setState({ ...state, loading: bool })
}
export const setStockSymbolInContext = (state: GlobalContextType, setState: Function) => (stockSymbol: string) => {
  setState({ ...state, stockSymbol: stockSymbol })
}
const contextStore = createContext(globalContext)
export default contextStore