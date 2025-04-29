// src/pages/PublicProfile/PublicProfile.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchAPI from "../../config files/api";
import { FaUserCircle } from "react-icons/fa";
import "./PublicProfile.css";

export default function PublicProfile() {
    const { username } = useParams();
    const [userData, setUserData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const response = await fetchAPI.get(`/public-user-profile/${username}/`);
            setUserData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const checkFollowingStatus = async () => {
        try {
            const response = await fetchAPI.get(`/check-following/${username}/`);
            setIsFollowing(response.data.is_following);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchProfile();
            await checkFollowingStatus();
            setLoading(false);
        };
        fetchData();
    }, [username]);

    const handleFollow = async () => {
        try {
            await fetchAPI.post(`/follow/${username}/`);
            setIsFollowing(true);
            await fetchProfile(); // 🔥 új adat lekérés követés után
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await fetchAPI.post(`/unfollow/${username}/`);
            setIsFollowing(false);
            await fetchProfile(); // 🔥 új adat lekérés kikövetés után
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!userData) return <div>User not found.</div>;

    return (
        <div className="public-profile-container">
            <div className="profile-header">
                {userData.image_url ? (
                    <img src={userData.image_url} alt="Profile" className="profile-avatar" />
                ) : (
                    <FaUserCircle className="profile-avatar" />
                )}
                <h2>{userData.username}</h2>
                <h3>{userData.first_name} {userData.last_name}</h3>
                <p>Joined: {new Date(userData.date_joined).toLocaleDateString()}</p>

                <div className="follow-buttons">
                    {isFollowing ? (
                        <button onClick={handleUnfollow}>Unfollow</button>
                    ) : (
                        <button onClick={handleFollow}>Follow</button>
                    )}
                </div>

                <div className="stats">
                    <p><strong>Followers:</strong> {userData.followers_count}</p>
                    <p><strong>Following:</strong> {userData.following_count}</p>
                </div>
            </div>
        </div>
    );
}
