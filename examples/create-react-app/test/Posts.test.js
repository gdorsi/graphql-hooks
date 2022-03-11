import { render, screen } from './test-utils'
import Posts, { allPostsQuery } from '../src/components/Posts'
import React from 'react'

const localQueries = {
  [allPostsQuery]: () => ({
    allPosts: [
      {
        id: 1,
        title: 'Test',
        url: 'https://example.com'
      }
    ]
  })
}

afterEach(() => {
  jest.restoreAllMocks()
})

describe('Posts', () => {
  it('shows "No posts" if 0 posts are returned', async () => {
    jest.spyOn(localQueries, allPostsQuery).mockImplementation(() => ({
      allPosts: []
    }))

    render(<Posts />, {
      localQueries
    })

    expect(await screen.findByText('No posts')).toBeTruthy()
  })

  it('renders the list of posts', async () => {
    render(<Posts />, {
      localQueries
    })

    expect(
      await screen.findByRole('link', {
        name: /Test/i
      })
    ).toBeTruthy()
  })
})
