import React, { useState, useEffect } from "react";
import plImage from "../assets/placeholders/300x300.png";
import plImageNoImage from "../assets/placeholders/300x300-noimage.png";
import { PlaylistImage } from "./Placeholder.jsx";
import "../css/PlaylistComponent.css";

const PlaylistComponent = ({
  image,
  title,
  trackLength,
  description,
  isPublic,
  href,
  id,
  source,
}) => {
  const baseSize = 1; // Base size in rem
  const lengthFactor = 0.01; // Factor to decrease font size based on length
  const newSize = baseSize - lengthFactor * Math.max(0, title.length - 10); // Adjust size for titles longer than 10 characters

  return (
    <div
      className="playlist-component"
      onClick={handlePlaylistClick(source, id)}
    >
      {image ? (
        <img src={image} alt={title} className="playlist-image" />
      ) : (
        <img src={plImageNoImage} alt={title} className="playlist-image" />
      )}

      <div className="playlist-info">
        <h3
          className="playlist-title"
          style={{ fontSize: `${Math.max(newSize, 0.5)}rem` }}
        >
          {title}
        </h3>
        <p className="playlist-song-count">{trackLength} songs</p>
      </div>
    </div>
  );
};

export default PlaylistComponent;

function handlePlaylistClick() {
  // add selected class to playlist
  // add the id of the playlist to the selected playlist state [spotify-id]
}
