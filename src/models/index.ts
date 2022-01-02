
export interface stockData {
  'Time Series (60min)': {
    [key: string]: {
      '1. open': string,
      '2. high': string,
      '3. low': string,
      '4. close': string,
      '5. volume': string,
    }
  };
}
export const generateChartOptions = (stockData: stockData, stockSymbol: string) => {
  const stockDataObj = stockData['Time Series (60min)']
  const xAxisArr:string[] = []
  const seriesArr:Array<number>[] = []
  const volumArr:Array<number>[] = []
  Object.keys(stockDataObj).map((key, index) => {
    const {
      '1. open': open,
      '2. high': high,
      '3. low': low,
      '4. close': close,
      '5. volume': volume,
    } = stockDataObj[key]
    const arr = [ parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close) ]
    seriesArr.push(arr)
    xAxisArr.push(key)
    const valueLevel = open > close ? 1 : -1
    volumArr.push([index, parseInt(volume), valueLevel ])
  })
  
  return {
    title: {
      text: stockSymbol,
      left: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Price']
    },
    grid: [
      {
        left: '0%',
        right: '0%',
        height: '50%'
      },
      {
        left: '0%',
        right: '0%',
        top: '63%',
        height: '16%'
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: xAxisArr,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      },
      {
        type: 'category',
        gridIndex: 1,
        data: xAxisArr,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax'
      }
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    visualMap: {
      show: false,
      seriesIndex: 1,
      dimension: 2,
      pieces: [
        {value: 1, color: '#ec0000'},
        {value: -1, color: '#00da3c'},
      ]
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 0,
        end: 100
      }
    ],
    series: [
      {
        name: 'Price',
        type: 'candlestick',
        data: seriesArr,
        // itemStyle: {
        //   color: upColor,
        //   color0: downColor,
        //   borderColor: upBorderColor,
        //   borderColor0: downBorderColor
        // },
      },
      {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: volumArr
      }
    ]
  }
}