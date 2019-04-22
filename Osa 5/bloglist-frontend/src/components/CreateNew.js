import React from 'react'
import blogService from '../services/blogs'
import useField from '../hooks/index'

const CreateNew = ({ user, setNotificationWithTimeout, blogs, setBlogs, blogFormRef }) => {
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
          user: user._id
        }

        blogService.create(blog)
          .then(response => {
            const modifiedUser = { ...user, _id: user.id }
            const modifiedResponse = { ...response, user: modifiedUser }
            setBlogs(blogs.concat(modifiedResponse))
          })
        blogFormRef.current.toggleVisibility()
        setNotificationWithTimeout(`a new blog ${title.form.value} by ${author.form.value} added`)
        title.reset()
        author.reset()
        url.reset()
      }}>
        <div>
          title:
          <input {...title.form} />
        </div>
        <div>
          author:
          <input {...author.form} />
        </div>
        <div>
          url:
          <input {...url.form} />
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default CreateNew