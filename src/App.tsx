import { useContext, useState } from 'react';
import 'src/assets/css/App.css';
import Chart from 'src/views/Chart'
import Loading from 'src/components/Loading'
import GlobalContext, { globalContext, GlobalContextType, setLoadingInContext } from 'src/context'
function App() {
  const [state, setState] = useState(globalContext);
  const setLoading = setLoadingInContext(state, setState)
  const contextValue = {
    ...globalContext,
    setLoading
  }
  return (
    <GlobalContext.Provider value={contextValue}>
      <div className="App h-screen flex flex-col">
        { state.loading && <Loading/> }
        <div className="flex-grow">
          <Chart />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
