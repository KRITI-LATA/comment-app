import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentList: [],
  }

  onChangeComment = event => {
    this.setState({commentInput: event.target.value})
  }

  onChangeName = event => {
    this.setState({nameInput: event.target.value})
  }

  deleteComment = commentId => {
    const {commentList} = this.state

    this.setState({
      commentList: commentList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentList} = this.state

    return commentList.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLike={this.toggleIsLike}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading-text">Comments</h1>
        <div className="comment-input">
          <div className="comment-card">
            <form
              className="comment-form-container"
              onSubmit={this.onAddComment}
            >
              <p className="para-text">Say something about 4.0 Technologies</p>
              <input
                type="text"
                className="name-text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeName}
              />
              <textarea
                placeholder="Your Comment"
                className="comment-input"
                value={commentInput}
                onChange={this.onChangeComment}
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            className="comment-image"
            alt="comments"
          />
        </div>
        <hr />
        <p className="comment-count">
          <span className="total-comment">{commentList.length}</span> comments
        </p>
        <ul className="comment-container">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}
export default Comments
