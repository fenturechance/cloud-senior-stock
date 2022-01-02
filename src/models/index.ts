import { log } from "console"

export interface stockData {
  'Time Series (60min)': {
    [key: string]: {
      '1. open': string,
      '2. high': string,
      '3. low': string,
      '4. close': string
    }
  };
}
export const generateChartOptions = (stockData: stockData) => {
  const stockDataObj = stockData['Time Series (60min)']
  const seriesArr:any[] = []
  Object.keys(stockDataObj).map(key => {
    const {
      '1. open': open,
      '2. high': high,
      '3. low': low,
      '4. close': close
    } = stockDataObj[key]
    const arr = [ key, parseFloat(open), parseFloat(high), parseFloat(low), parseFloat(close) ]
    seriesArr.push(arr)
  })
  return {
    title: {
      text: '上证指数',
      left: 0
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['日K']
    },
    grid: {
      left: '10%',
      right: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'category',
      data: [],
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 50,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 50,
        end: 100
      }
    ],
    series: [
      {
        name: '日K',
        type: 'candlestick',
        data: seriesArr,
        // itemStyle: {
        //   color: upColor,
        //   color0: downColor,
        //   borderColor: upBorderColor,
        //   borderColor0: downBorderColor
        // },
        markPoint: {
          // label: {
          //   formatter: function (param) {
          //     return param != null ? Math.round(param.value) + '' : '';
          //   }
          // },
          data: [
            {
              name: 'Mark',
              coord: ['2013/5/31', 2300],
              value: 2300,
              itemStyle: {
                color: 'rgb(41,60,85)'
              }
            },
            {
              name: 'highest value',
              type: 'max',
              valueDim: 'highest'
            },
            {
              name: 'lowest value',
              type: 'min',
              valueDim: 'lowest'
            },
            {
              name: 'average value on close',
              type: 'average',
              valueDim: 'close'
            }
          ],
          // tooltip: {
          //   formatter: function (param) {
          //     return param.name + '<br>' + (param.data.coord || '');
          //   }
          // }
        },
        markLine: {
          symbol: ['none', 'none'],
          data: [
            [
              {
                name: 'from lowest to highest',
                type: 'min',
                valueDim: 'lowest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              },
              {
                type: 'max',
                valueDim: 'highest',
                symbol: 'circle',
                symbolSize: 10,
                label: {
                  show: false
                },
                emphasis: {
                  label: {
                    show: false
                  }
                }
              }
            ],
            {
              name: 'min line on close',
              type: 'min',
              valueDim: 'close'
            },
            {
              name: 'max line on close',
              type: 'max',
              valueDim: 'close'
            }
          ]
        }
      },
    ]
  }
}