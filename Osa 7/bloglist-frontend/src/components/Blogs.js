import React from 'react'
import { connect } from 'react-redux'
import Blog from '../components/Blog'
import { List } from 'semantic-ui-react'

const Blogs = (props) => {
  return (
    <List>
      {props.blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog
          key={blog.id}
          blog={blog}
          user={props.user} />)}
    </List>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps)(Blogs)