const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)
describe('blog tests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  describe('get blog', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('correct amount of blogs are returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body.length).toBe(helper.initialBlogs.length)
    })
    
    test('there is parameter called "id"', async() => {
      const response = await api.get('/api/blogs')
    
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('post blog', () => {
    test('adding a new blog', async () => {
      const newBlog = {
        title: "Newest of the blogs",
        author: "Seppo Seppola",
        url: "https://fullstackopen.com/osa4/backendin_testaaminen",
        likes: 123,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.initialBlogs.length + 1)

      const titles = response.body.map(b => b.title)
      expect(titles).toContain(
        'Newest of the blogs'
      )
    })

    test('adding a new blog with no likes defaults to 0 likes', async () => {
      const newBlog = {
        title: "Newest of the blogs",
        author: "Seppo Seppola",
        url: "https://fullstackopen.com/osa4/backendin_testaaminen"
      }

      await api
        .post('/api/blogs')
        .send(newBlog)

      const response = await api.get('/api/blogs')
      expect(response.body[response.body.length - 1].likes).toBe(0)
    })

    test('adding a new blog with no title returns 400 Bad request', async () => {
      const newBlog = {
        author: "Seppo Seppola",
        url: "https://fullstackopen.com/osa4/backendin_testaaminen",
        likes: 123,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })

    test('adding a new blog with no url returns 400 Bad request', async () => {
      const newBlog = {
        title: "Newest of the blogs",
        author: "Seppo Seppola",
        likes: 123,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
  })

  describe('modify/delete blog', () => {
    test('deleting a blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
      
      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(
        blogsAtStart.length - 1
      )

      const urls = blogsAtEnd.map(b => b.url)

      expect(urls).not.toContain(blogToDelete.url)
    })

    test('adding a like to a blog', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToLike = blogsAtStart[0]
      blogToLike.likes = blogToLike.likes + 1

      const updatedBlog = await api
        .put(`/api/blogs/${blogToLike.id}`)
        .send(blogToLike)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtStart.length).toBe(blogsAtEnd.length)

      expect(updatedBlog.body.likes).toBe(blogToLike.likes)
    })
  })
})

describe('user tests', () => {

  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ userName: 'root', password: 'sekret' })
    await user.save()
  })

  test('getting users succeeds', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(1)

    const usernames = response.body.map(u => u.userName)
    expect(usernames).toContain('root')
  })

  test('creating new user succeeds', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      userName: 'seppo123',
      name: 'Seppo Seppola',
      password: 'seppoonkuningas',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('adding user without username fails with 400', async () => {
    const newUser = {
      name: 'Seppo Seppola',
      password: 'seppoonkuningas',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('adding user without password fails with 400', async () => {
    const newUser = {
      userName: 'seppo123',
      name: 'Seppo Seppola',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('adding user with too short password fails with 400', async () => {
    const newUser = {
      userName: 'seppo123',
      password: 'se',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})