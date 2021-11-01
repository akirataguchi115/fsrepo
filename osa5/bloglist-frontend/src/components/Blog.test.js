import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

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

  test('<BlogForm /> calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.submit(form)
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(2)
  })

  test('<BlogForm /> updates parent state', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const author = component.container.querySelector('#author')
    const form = component.container.querySelector('form')
    fireEvent.change(title, {
      target: { value: 'Nalle Bruh' }
    })
    fireEvent.change(url, {
      target: { value: 'https://fi.wikipedia.org/wiki/Nalle_Puh' }
    })
    fireEvent.change(author, {
      target: { value: 'A. A. Milne' }
    })
    fireEvent.submit(form)
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].title).toBe('Nalle Bruh')
    expect(createBlog.mock.calls[0][0].author).toBe('A. A. Milne')
    expect(createBlog.mock.calls[0][0].url).toBe('https://fi.wikipedia.org/wiki/Nalle_Puh')

    expect(createBlog.mock.calls[0][0].author).not.toBe('A. A. Akira')
  })
})