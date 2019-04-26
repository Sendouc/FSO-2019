const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user')
    res.json(blogs.map(blog => blog.toJSON()))
  } catch(exception) {
    next(exception)
  }
})

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('user')
    if (blog) {
      res.json(blog.toJSON())
    } else {
      res.status(404).end()
    }
  } catch(exception) {
    next(exception)
  }
})
  
blogRouter.post('/', async (req, res, next) => {
  const body = req.body
  const token = req.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
  
    if (!body.likes) {
      body.likes = 0
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    Blog.populate(blog, {path: "user"})
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    res.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogRouter.post('/:id/comments', async (req, res, next) => {
  const body = req.body
  const token = req.token

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    
    if (!body) {
      return res.status(401).json({ error: 'content missing' })
    }
    console.log('body', body)
    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(body.comment)
    const savedBlog = await blog.save()
    
    res.json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

blogRouter.delete('/:id', async (req, res, next) => {
  const blogId = req.params.id
  const token = req.token
  try {
    const blog = await Blog.findById(blogId)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    if (blog.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: 'token invalid' })
    }
    await Blog.findByIdAndRemove(blogId)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
      .populate('user')
    res.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter