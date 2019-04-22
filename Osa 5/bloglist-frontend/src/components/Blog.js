import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  const addLike = (event) => {
    event.preventDefault()
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(blog.id, changedBlog)
      .then(setBlogs(blogs.map(b => b.id === blog.id ? changedBlog : b)))
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      blogService.del(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const [expanded, setExpanded] = useState(false)

  if (expanded) {
    return (
      <div style={blogStyle} className='blog'>
        <li onClick={() => setExpanded(!expanded)}>{blog.title} - {blog.author}</li>
        <li><a href={blog.url}>{blog.url}</a></li>
        <li>{blog.likes} likes <button onClick={addLike}>like</button></li>
        <li>added by {blog.user.name}</li>
        {blog.user._id.toString() === user.id.toString() ? <li><button onClick={removeBlog}>delete</button></li> : null}
      </div>
    )
  }

  return (
    <div style={blogStyle} onClick={() => setExpanded(!expanded)} className='blog'>
      {blog.title} - {blog.author}
    </div>

  )}

export default Blog