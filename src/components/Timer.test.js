import React from 'react'
import Timer from './Timer'
import { shallow } from 'enzyme'
import { fetchQuote } from '../actions'

describe('Timer', () => {
  let wrapper

  beforeEach(() => {
    jest.useFakeTimers()

    function Counter() {}
    function Notifier() {}

    wrapper = shallow(<Timer
      work={25}
      shortRest={5}
      longRest={15}
      iterations={4}
      running={false}
      counter={Counter}
      notifier={Notifier}
      fetchQuote={fetchQuote}
      />)
  })

  test("Starts when receive `running` props as `true`", () => {
    wrapper.setProps({
      running: true
    })

    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 25 * 60 * 1000)
  })

  test("Does not start when receives `running` props as `false`", () => {
    wrapper.setProps({
      running: false
    })

    expect(setTimeout).not.toHaveBeenCalled()
  })

  test("Resets counter when receiver `running` props as `false`", () => {
    wrapper.setProps({
      work: 12,
      running: false
    })

    expect(wrapper.state("counter")).toBe(12)
  })
})
