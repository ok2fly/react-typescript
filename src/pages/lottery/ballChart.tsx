import * as React from 'react'
import {inject, observer} from 'mobx-react'
import { Row, Col, Form, Button } from 'antd';
import { IBall } from '@models/ball'
import * as Echart from 'echarts'
// const Echart = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

@inject('ballChartStore')
@observer
export default class BallChart extends React.Component<IProps> {

  chartRef: any = React.createRef()
  blueRef: any = React.createRef()
  ballCountChart: Echart.ECharts
  blueBallCountChart: Echart.ECharts
  
  state = {
    visible: false
  }
  
  redBalls: number[] = [
    1,2,3,4,5,6,7,8,9,10,
    11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,
    31,32,33
  ]
  blueBalls: number[] = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  setBall = (data: IBall, num: number, type: 'red'|'blue') => {
    const color =  type === 'red' ? '#f54646' : '#3399ff'
  }

  setColor = (num: number, type: string) => {
    return <div style={{textAlign: 'center', color: type}}>{num}</div>
  }

  showRule = () => {
    this.setState({visible: !this.state.visible})
  }
  
  componentDidMount() {
    this.ballCountChart = Echart.init(this.chartRef.current)
    this.blueBallCountChart = Echart.init(this.blueRef.current)
    const { fetchChartData } = this.props.ballChartStore
    
    fetchChartData((reds:[any], blues:[any]) => {
      this.ballCountChart.setOption({
        title: {
            text: '红球'
        },
        tooltip: {},
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            data: reds.map(v => v.name)
        },
        yAxis: {},
        series: [{
            name: '次数',
            type: 'bar',
            data: reds.map(v => v.value)
        }],
        color: ['#f54646']
      })

      this.blueBallCountChart.setOption({
        title: {
          text: '蓝球'
        },
        tooltip: {},
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
            data: blues.map(v => v.name)
        },
        yAxis: {},
        series: [{
            name: '次数',
            type: 'bar',
            data: blues.map(v => v.value)
        }],
        color: ['#3399ff']
      })
    })
  }

  render(){
    return <React.Fragment>
      <div>
        <h3>红蓝球历史出现次数</h3>
        <Row>
          <Col span={16}>
            <div className='chart-w' style={{borderRight: 'none'}} ref={this.chartRef}></div>
          </Col>
          <Col span={8}>
            <div className='chart-w' ref={this.blueRef}></div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
    
  }
}