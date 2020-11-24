import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

// testit ajetaan komennolla "CI=true npm test"
// testavuuskattaus "CI=true npm test -- --coverage"

// testi 1 
test('renders blog, task 5.13', () => {
  const blog = {
    title: 'Testing',
    author: 'Jussi',
    url: 'www.moi.com',
    likes: 8
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing Jussi'
  )
})

// testi 2
test('renders blog, task 5.14', () => {
    const blog = {
      title: 'Testing',
      author: 'Donald Putin',
      url: 'www.moi.com',
      likes: 8
    }
  
    const component = render(
      <Blog blog={blog} />
    )
  
    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent(
      'Testing Hide www.moi.comlikes 8 like Donald Putin remove' // Blog.js renderöityy vähän eri tavalla ,joten on pakko laittaa väliin ylimääräistä kamaa tähän
    )
  }
)

// testi 3 
// toimiakseen pitää muokata hiukan Blog.js:ää. Muokkaus vaatii Blog.js propsina välitettävä mockin lisäys eli handleClick,
// ja onClick={handleClick}
test('clicking test, task 5.15', async () => {
    const blog = {
      title: 'Testing',
      author: 'Jussi',
      url: 'www.moi.com',
      likes: 8
    }
  
    const mockHandler = jest.fn()
  
    const component = render(
      <Blog blog={blog} handleClick={mockHandler}/>
    )

    // etsitään nappi nimellä, minkä jälkeen se painetaan kahdesti
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls).toHaveLength(2)
    //expect(mockHandler.mock.calls.length).toBe(2)
    
})

