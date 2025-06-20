import {useContext, useEffect, useState} from "react";
import "./PortfolioOverview.css";
import { FaEdit, FaSave } from "react-icons/fa";
import PortfolioContext from "../../../../context/portfolio-context";

const mockComments = [
  {
    id: 1,
    user: "John Doe",
    initials: "JD",
    time: "2 hours ago",
    text: "Performance has improved significantly in the last quarter.",
    likes: 4,
    dislikes: 1,
    replies: 2,
  },
  {
    id: 2,
    user: "Mary Smith",
    initials: "MS",
    time: "1 day ago",
    text: "Looking good!",
    likes: 2,
    dislikes: 0,
    replies: 1,
  },
  {
    id: 3,
    user: "Jane Williams",
    initials: "JW",
    time: "2 days ago",
    text: "Added new holdings to strengthen portfolio diversification.",
    likes: 5,
    dislikes: 0,
    replies: 0,
  },
];


const PortfolioOverview = () => {
  const [activeTab, setActiveTab] = useState("activity");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(mockComments);

  const handlePost = () => {
    if (!newComment.trim()) return;
    const newItem = {
      id: Date.now(),
      user: "You",
      initials: "YY",
      time: "Just now",
      text: newComment,
    };
    setComments([newItem, ...comments]);
    setNewComment("");
  };

  return (
    <div className="portfolio-detail card">
      <h1 className="title">Growth</h1>

      <div className="meta-info">
        <span>Funded</span>
        <span>Momentum</span>
        <span>USD</span>
      </div>

      <div className="tabs-container">
        {["Holdings", "Transactions", "Performance", "Activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={activeTab === tab.toLowerCase() ? "active" : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "activity" && (
        <div className="activity-section">
          <div className="activity-layout">
            {/* Left: comment input and list */}
            <div className="comment-column">

              <div className="comment-input-wrapper">
  <textarea
      className="comment-input"
      placeholder="Add a comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      rows={1}
  />
                <button
                    className="comment-button"
                    onClick={handlePost}
                    disabled={!newComment.trim()}
                >
                  Post
                </button>
              </div>

              <div className="comment-feed">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-card">
                      <div className="comment-header">
                        <div className="avatar">{comment.initials}</div>
                        <div>
                          <div className="user">{comment.user}</div>
                          <div className="time">{comment.time}</div>
                        </div>
                      </div>

                      <p className="comment-text">{comment.text}</p>

                      <div className="comment-actions">
                        <button className="like-btn">👍 {comment.likes}</button>
                        <button className="dislike-btn">👎 {comment.dislikes}</button>
                        <div className="comment-count">💬 {comment.replies} replies</div>
                      </div>
                    </div>
                ))}
              </div>
            </div>

            {/* Right: activity summary */}
            <div className="activity-sidebar">
              <h3>Recent Activity</h3>
              <ul className="activity-list">
                {comments.slice(0, 3).map((comment) => (
                  <li key={comment.id}>
                    <div className="sidebar-item">
                      <div className="sidebar-avatar">{comment.initials}</div>
                      <div>
                        <strong>{comment.user}</strong>
                        <span className="time">{comment.time}</span>
                        <p>{comment.text}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="view-all">View all comments</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PortfolioOverview;