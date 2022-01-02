import GlobalContext from 'src/context'
import { useContext, useState, useCallback } from 'react';
import { getStockInfo, setChartOptions } from 'src/controllers';
const SearchStock = () => {
  const { stockSymbol, setStockSymbol, setLoading, echartInstance } = useContext(GlobalContext)
  const [ inputValue, setInputValue ] = useState(stockSymbol)
  const searchFun = useCallback(() => {
    setStockSymbol(inputValue)
    setLoading(true)
    getStockInfo(inputValue).then(data => {
      setLoading(false)
      setChartOptions(data, echartInstance, inputValue)
    })
  }, [setStockSymbol, setLoading, echartInstance, inputValue])
  const setInputFun = useCallback((e: any) => {
    setInputValue(e.target.value)
  }, [setInputValue])
  const pressKeyFun = useCallback((e) => {
    if(e.code === 'Enter') {
      searchFun()
    }
  }, [searchFun])
  return (
    <div>
      <input type="text"  value={inputValue} onChange={setInputFun} onKeyUp={pressKeyFun} className="text-sm ring-1 ring-gray-200 mr-2 focus:outline-none px-3 py-1 w-64" placeholder='Please Type Stock Symbol'/>
      <button className="bg-gray-200 px-2 py-1 rounded" onClick={searchFun}>Search</button>
    </div>  
  )
}
export default SearchStock