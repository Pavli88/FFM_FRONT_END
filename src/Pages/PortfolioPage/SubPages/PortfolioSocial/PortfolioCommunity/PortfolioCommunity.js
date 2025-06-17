import React, { useState } from "react";
import { FaUser, FaCommentDots, FaShareAlt, FaUsers } from "react-icons/fa";
import "./PortfolioCommunity.css";

const activities = [
  {
    type: "fork",
    user: "Adam Miller",
    content: "forked this portfolio",
    time: "1h ago",
  },
  {
    type: "follow",
    user: "James Smith",
    content: "started following this portfolio",
    time: "2h ago",
  },
  {
    type: "comment",
    user: "Mary Williams",
    content: "Why did you increase your allocation to tech stocks?",
    time: "4h ago",
  },
  {
    type: "reaction",
    user: "Amanda Lane",
    content: "liked Growth Crypto Alpha",
    time: "1d ago",
  },
];

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export default function PortfolioCommunity() {
  const [activeTab, setActiveTab] = useState("Timeline");
  const tabs = ["Timeline", "Comments", "Followers", "Updates"];

  return (
    <div className="portfolio-community">
      <h2>Community Activity</h2>

      <div className="community-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`community-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className="activity-feed">
        {activities.map((activity, index) => (
          <li key={index} className="activity-item">
            <div className="avatar-circle">{getInitials(activity.user)}</div>
            <div className="activity-content">
              <span className="username">{activity.user}</span>: {activity.content}
              <div className="activity-time">{activity.time}</div>
              {activity.type === "comment" && <div className="reply-link">Reply</div>}
            </div>
          </li>
        ))}
      </ul>

      <div className="comment-input">
        <div className="avatar-circle">OR</div>
        <input type="text" placeholder="Write a comment..." />
        <button className="post-button">Post</button>
      </div>
    </div>
  );
}