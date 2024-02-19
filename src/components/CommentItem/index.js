// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'button-active' : 'button'

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLike} = props
    toggleIsLike(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="comment-list">
      <div className="comment-name-card">
        <div className={initialClassName}>
          <p className="first-letter">{initial}</p>
        </div>

        <p className="name-of-commented">{name}</p>
        <p className="comment-time">{postedTime} min comment</p>
      </div>
      <p className="comment-description">{comment}</p>
      <div className="comment-button">
        <div>
          <img src={likeImageUrl} className="like-image" alt="like" />
          <button
            type="button"
            className={likeTextClassName}
            onClick={onClickLike}
          >
            Like
          </button>
        </div>
        <div>
          <button
            className="delete-btn"
            type="button"
            onClick={onDeleteComment}
            data-testid="delete"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="delete-image"
            />
          </button>
        </div>
      </div>
      <hr className="comment-line" />
    </li>
  )
}
export default CommentItem
