import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'UPDATE_BLOG':
    return state.map(b => b.id !== action.data.id ? b : action.data)
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data)
  case 'ADD_COMMENT':
    return state.map(b => b.id !== action.data.id ? b : { ...b, comments: [...b.comments, action.data.comment] })
  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = id => {
  return async dispatch => {
    const blogToLike = await blogService
      .getOne(id)
    const updatedBlog = await blogService
      .update(blogToLike.id, { ...blogToLike, likes: blogToLike.likes + 1 })
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.del(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const updateBlog = (id, comment) => {
  return async dispatch => {
    await blogService.createComment(id, comment)
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        id,
        comment
      }
    })
  }
}

export default blogReducer