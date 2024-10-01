import axios from "axios";
import { useState, useEffect } from "react";
import PlaylistCollection from "./PlaylistCollection";
import appleLogo from "../assets/provider/applemusic.svg";
import spotifyLogo from "../assets/provider/spotify.png";
import { Divider } from "@mui/material";
import { domain_name, subdomain } from "../../config.json";

const PlaylistSection = ({ providerToLoad }) => {
  const [playlists, setPlaylists] = useState([]);
  const provider = providerToLoad;

  // Fetch playlists when the component mounts or when provider changes
  useEffect(() => {
    if (!provider) return;

    const fetchPlaylists = async () => {
      try {
        const pl = await fetchPlaylist(provider);

        if (pl && pl.items) {
          setPlaylists(pl.items);
        }
      } catch (error) {
        console.error("Failed to fetch playlists:", error);
      }
    };

    fetchPlaylists();
  }, [provider]);

  return (
    <div className="text-align-left margin-left-4 margin-right-4">
      <img
        style={{ width: 90, height: 90 }}
        src={provider === "apple" ? appleLogo : spotifyLogo}
        alt={`${provider} logo`}
      />
      <Divider />

      <PlaylistCollection playlists={playlists} />
    </div>
  );
};

async function fetchPlaylist(provider) {
  try {
    const res = await fetch(
      "https://syncrasongapi.austin.kim/api/getPlaylist/" + provider,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Failed to fetch playlists:", err);
    return null;
  }
}

export default PlaylistSection;
