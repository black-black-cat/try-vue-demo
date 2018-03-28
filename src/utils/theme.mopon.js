var colorPalette = [
  '#26a7ff',
  '#00db9c',
  '#f1d412',
  '#26baff',
  '#26cfff',
  '#96dee8'
]

var theme = {
  color: colorPalette,

  title: {
    textStyle: {
      fontWeight: 'normal',
      color: '#008acd'
    }
  },

  visualMap: {
    itemWidth: 15,
    color: ['#5ab1ef', '#e0ffff']
  },

  toolbox: {
    iconStyle: {
      normal: {
        borderColor: colorPalette[0]
      }
    }
  },

  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.5)',
    axisPointer: {
      type: 'line',
      lineStyle: {
        color: '#008acd'
      },
      crossStyle: {
        color: '#008acd'
      },
      shadowStyle: {
        color: 'rgba(200,200,200,0.2)'
      }
    }
  },

  dataZoom: {
    dataBackgroundColor: '#efefff',
    fillerColor: 'rgba(182,162,222,0.2)',
    handleColor: '#008acd'
  },

  grid: {
    borderColor: '#eee'
  },

  categoryAxis: {
    axisLine: {
      lineStyle: {
        color: '#e5e8e9'
      }
    },
    splitLine: {
      lineStyle: {
        color: ['#e5e8e9']
      }
    },
    axisLabel: {
      textStyle: {
        color: '#6e6f71'
      }
    },
    axisTick: {
      show: false
    }
  },

  valueAxis: {
    axisLine: {
      lineStyle: {
        color: '#e5e8e9'
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
      }
    },
    splitLine: {
      lineStyle: {
        color: ['#e5e8e9'],
        type: 'dash'
      }
    },
    axisLabel: {
      textStyle: {
        color: '#6e6f71'
      }
    },
    axisTick: {
      show: false
    }
  },

  timeline: {
    lineStyle: {
      color: '#008acd'
    },
    controlStyle: {
      normal: {
        color: '#008acd'
      },
      emphasis: {
        color: '#008acd'
      }
    },
    symbol: 'emptyCircle',
    symbolSize: 3
  },

  line: {
    smooth: true,
    symbol: 'emptyCircle',
    symbolSize: 3
  },

  candlestick: {
    itemStyle: {
      normal: {
        color: '#d87a80',
        color0: '#2ec7c9',
        lineStyle: {
          color: '#d87a80',
          color0: '#2ec7c9'
        }
      }
    }
  },

  scatter: {
    symbol: 'circle',
    symbolSize: 4
  },

  map: {
    label: {
      normal: {
        textStyle: {
          color: '#d87a80'
        }
      }
    },
    itemStyle: {
      normal: {
        borderColor: '#eee',
        areaColor: '#ddd'
      },
      emphasis: {
        areaColor: '#fe994e'
      }
    }
  },

  graph: {
    color: colorPalette
  },

  gauge: {
    axisLine: {
      lineStyle: {
        color: [
          [0.2, '#2ec7c9'],
          [0.8, '#5ab1ef'],
          [1, '#d87a80']
        ],
        width: 10
      }
    },
    axisTick: {
      splitNumber: 10,
      length: 15,
      lineStyle: {
        color: 'auto'
      }
    },
    splitLine: {
      length: 22,
      lineStyle: {
        color: 'auto'
      }
    },
    pointer: {
      width: 5
    }
  }
}

export default theme
