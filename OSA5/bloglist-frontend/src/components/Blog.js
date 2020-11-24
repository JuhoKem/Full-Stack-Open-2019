import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, user }) => {
  const [visible, setVisible] = useState(false)

  const blogId = blog.id

  const updateBlog = () => {
    //console.log('BUTTONBLOG ID:----->', blogId);
    const changedBlog = { ...blog, likes: blog.likes + 1}
    //console.log('CHNAGEDBLOG: ---->', changedBlog);

    blogService
      .update(blogId, changedBlog)
      .then(returnedBlog => {
        setBlogs(returnedBlog)
      })
  }

  // tapahtumakäsittelijä poistolle
  const removeBlog = () => {

    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)) { 
      blogService
      .remove(blogId)
  
      setBlogs(blogs.filter(b => b.id !== blogId))  // päivittää blog-tilan poiston jälkeen, eli poistaa tilasta poistettu blogi
    }

  }

  // inline tyyli css
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  // id:t ovat cypress-testejä varten
  return(
    <div style={blogStyle} >
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        < button id='showBlog' onClick={() => setVisible(true)}> Show </button>
      </div>
      <div id='blogDiv' style={showWhenVisible} className='blog' >
        <div className='blogsArray' >{blog.title} < button id='hideBlog' onClick={() => setVisible(false)}> Hide </button></div>  
        <div>{blog.url}</div>
        <div id='likes' className='blogsLikes'>likes {blog.likes} <button id='likeButton' onClick={updateBlog}> like </button></div>
        <div>{blog.author}</div>
        <button id='removeButton' onClick={removeBlog}> remove </button>
      </div>
    </div>
  )
}
export default Blog
