import axios from 'axios'
import { generateChartOptions, stockData } from 'src/models'
import type { ECharts } from 'echarts';
export const setChartOptions = (stockData: stockData, echartInstance: ECharts) => {
  const options = generateChartOptions(stockData)
  console.log(options);
  
  echartInstance.setOption(options)
}
export const getStockInfo = () => {
  const option = {
    params: {
      interval: '60min',
      function: 'TIME_SERIES_INTRADAY',
      symbol: 'MSFT',
      datatype: 'json',
      output_size: 'compact'
    },
    headers: {
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RapidApiToken as string
    }
  }
  return axios.get('https://alpha-vantage.p.rapidapi.com/query', option).then(rs => {
    return rs.data
  })
}