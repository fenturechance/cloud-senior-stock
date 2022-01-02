import * as echarts from 'echarts';
import { useEffect, useRef, useContext } from 'react';
import { getStockInfo, setChartOptions } from 'src/controllers';
import GlobalContext from 'src/context'
let nowEchartInstance: any
const Chart = () => {
  const { setLoading, stockSymbol, setEchartInstance } = useContext(GlobalContext)
  const chartRef = useRef<HTMLDivElement>(null)
  const initChart = (ref: HTMLElement, setEchartInstance: Function) => {
    const dom = ref
    nowEchartInstance = echarts.init(dom)
    setEchartInstance(nowEchartInstance)
  }
  useEffect(() => {
    initChart(chartRef.current as HTMLElement, setEchartInstance)
    setLoading(true)
    getStockInfo(stockSymbol).then(data => {
      setLoading(false)
      setChartOptions(data, nowEchartInstance, stockSymbol)
    })
    const resizeListener = () => {
      nowEchartInstance.resize()
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])
  return (
    <div id="main" ref={chartRef} className="h-full py-8"></div>
  )
}
export default Chart;