import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { getMetricMetaInfo, timeToString } from '../utils/helpers'

import UdaciSlider from './UdaciSlider';
import UdaciSteppers from './UdaciSteppers';
import DateHeader from './DateHeader';

function SubmitBtn({ onPress }) {
  return(
    <TouchableOpacity onPress=(onPress)>
      <Text>Submit</Text>
    </TouchableOpacity>
  )
}

export default class AddEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.slide = this.slide.bind(this);
    this.submit = this.submit.bind(this);
  }

  increment(metric) {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step
      return {
        ...state,
        [metric]: count > max ? max : count
      }
    });
  }

  decrement(metric) {
    this.setState(() => {
      const count = state[metric] - getMetricMetaInfo(metric).step
      return {
        ...state,
        [metric]: count < 0 ? 0 : count
      }
    });
  }

  slide(metric, value) {
    this.setState(() => ({
      [metric]: value,
    }))
  }

  submit() {
    const key = timeToString()
    const entry = this.state

    this.setState(() => {
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })
    // Update Redux
    //
    // Navigate to Home
    //
    // Save to 'DB'
    //
    // Clear local notification
  }

  render() {
    const metaInfo = getMetricMetaInfo()
    return (
      <View>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]
          return (
            <View key={key}>
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />}
            </View>
          )
        })}
        <Submit onPress={this.submit}/>
      </View>
    );
  }
}
