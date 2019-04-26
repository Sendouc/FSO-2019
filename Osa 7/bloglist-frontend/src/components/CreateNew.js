import React from 'react'
import { connect } from 'react-redux'
import useField from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { Button, Input } from 'semantic-ui-react'

const CreateNew = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => {
        event.preventDefault()
        const blog = {
          title: title.form.value,
          author: author.form.value,
          url: url.form.value,
          user: props.user._id
        }
        props.addBlog(blog)
        props.blogFormRef.current.toggleVisibility()
        props.setNotification(`a new blog ${title.form.value} by ${author.form.value} added`)
        title.reset()
        author.reset()
        url.reset()
      }}>
        <div>
          title:
          <Input {...title.form} />
        </div>
        <div>
          author:
          <Input {...author.form} />
        </div>
        <div>
          url:
          <Input {...url.form} />
        </div>
        <Button type="submit">save</Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { setNotification, addBlog })(CreateNew)