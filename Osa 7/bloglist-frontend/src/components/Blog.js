import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'

const Blog = ({ blog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  return (
    <div style={blogStyle} className='blog'>
      <List.Item><Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link></List.Item>
    </div>

  )}

export default connect(null, { likeBlog, deleteBlog })(Blog)