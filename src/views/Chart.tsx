import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { useEffect, useRef, useContext } from 'react';
import { getStockInfo, setChartOptions } from 'src/controllers';
import GlobalContext from 'src/context'
let echartInstance: ECharts;
const initChart = (ref: HTMLElement) => {
  const dom = ref 
  echartInstance = echarts.init(dom);
}
const Chart = () => {
  const { setLoading } = useContext(GlobalContext)
  const chartRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    initChart(chartRef.current as HTMLElement)
    setLoading(true)
    getStockInfo().then(data => {
      setLoading(false)
      setChartOptions(data, echartInstance)
    })
  }, [])
  return (
    <div id="main" ref={chartRef} className="max-w-7xl h-full py-8"></div>
  )
}
export default Chart;