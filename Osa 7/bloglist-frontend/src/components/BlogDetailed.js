import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { List, Icon } from 'semantic-ui-react'

const BlogDetailed = ({ id, ...props }) => {

  const addLike = (event) => {
    event.preventDefault()
    props.likeBlog(blog.id)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`remove blog ${blog.title} by ${blog.author}`)) {
      props.deleteBlog(blog.id)
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    props.updateBlog(blog.id, comment)
  }

  const blog = props.blogs.find(b => b.id === id)
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>
        <a href={blog.url}>{blog.url}</a><br />
        {blog.likes} likes <Icon name="thumbs up" onClick={addLike} /><br />
        {blog.user.name ? blog.user.name : blog.user.userName}<br />
        {blog.user._id.toString() === props.user._id.toString()
          ?
          <button onClick={removeBlog}>delete</button>
          : null}
      </p>
      <h2>comments</h2>
      <form onSubmit={addComment}>
        <div>
          <input name="comment"/>
        </div>
        <button type="submit">save</button>
      </form>
      <List items={blog.comments} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(mapStateToProps, { likeBlog, deleteBlog, updateBlog })(BlogDetailed)