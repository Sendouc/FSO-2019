const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((likes, blog) => likes += blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => (favorite.likes || 0) > blog.likes ? favorite : blog, {})
}

const mostBlogs = (blogs) => {
    authorsList = [] // list of author objects
    return blogs.reduce(function(author, blog) {
        let blogCount = authorsList[blog.author] || 0
        blogCount++
        authorsList[blog.author] = blogCount
        return (author.blogs || 0) > blogCount ? author : {author: blog.author, blogs: blogCount}
    }, {})
}

const mostLikes = (blogs) => {
    authorsList = []
    return blogs.reduce(function(author, blog) {
        let likeCount = authorsList[blog.author] || 0
        likeCount += blog.likes
        authorsList[blog.author] = likeCount
        return (author.likes || 0) > likeCount ? author : {author: blog.author, likes: likeCount}
    })
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}