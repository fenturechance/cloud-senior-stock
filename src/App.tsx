import { useState, useEffect } from 'react';
import 'src/assets/css/App.css';
import Chart from 'src/views/Chart'
import SearchStock from 'src/components/SearchStock'
import Loading from 'src/components/Loading'
import GlobalContext, { globalContext, setLoadingInContext, setStockSymbolInContext } from 'src/context'
function App() {
  const [state, setState] = useState(globalContext);
  const [echartInstance, setEchartInstance] = useState(null);
  const setLoading = setLoadingInContext(state, setState)
  const setStockSymbol = setStockSymbolInContext(state, setState)
  
  const contextValue = {
    ...state,
    setLoading,
    setStockSymbol,
    setEchartInstance,
    echartInstance
  }
  return (
    <GlobalContext.Provider value={contextValue}>
      <div className="App h-screen flex flex-col">
        { state.loading && <Loading/> }
        <div className="w-full max-w-screen-xl mx-auto flex-col flex h-full py-3 box-border px-2">
          <div className="flex justify-end">
            <SearchStock />
          </div>
          <div className="flex-grow">
            <Chart />
          </div>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
