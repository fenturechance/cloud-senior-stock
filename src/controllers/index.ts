import axios from 'axios'
import { generateChartOptions, stockData } from 'src/models'
import type { ECharts } from 'echarts';
export const setChartOptions = (stockData: stockData, echartInstance: ECharts, stockSymbol: string) => {
  const options = generateChartOptions(stockData, stockSymbol)
  echartInstance.setOption(options)
}
export const getStockInfo = (stockSymbol: string) => {
  const option = {
    params: {
      interval: '60min',
      function: 'TIME_SERIES_INTRADAY',
      symbol: stockSymbol,
      datatype: 'json',
      output_size: 'compact'
    },
    headers: {
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RapidApiToken as string
    }
  }
  return axios.get('https://alpha-vantage.p.rapidapi.com/query', option).then(rs => {
    if(rs.data['Error Message']) {
      return alert(rs.data['Error Message'])
    }
    return rs.data
  }).catch(e => {
    if(!e.response) return
    alert(e.response.data.message)
  })
}