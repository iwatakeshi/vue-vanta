import { mount } from '@vue/test-utils'
import Component from '@/components/Vanta/';

describe('Component', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Component)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})