import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'Nalle Puh',
      url: 'https://fi.wikipedia.org/wiki/Nalle_Puh',
      likes: '15',
      author: 'A. A. Milne',
      user: {
        username: 'Test guy',
      }
    }
    const user = {
      username: 'Another guy'
    }

    component = render(
      <Blog blog={blog} user={user} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Nalle Puh'
    )
    expect(component.container).toHaveTextContent(
      'A. A. Milne'
    )
    // expect(component.container).not.toHaveTextContent(
    //   'https://fi.wikipedia.org/wiki/A._A._Milne'
    // )
  })

  test('at start url and likes are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')

    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

})