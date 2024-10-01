import PlaylistComponent from "./PlaylistComponent";
import "../css/PlaylistCollection.css";

const PlaylistCollection = ({ playlists }) => {
  // console.log(playlists);
  if (!playlists || playlists.length === 0)
    return (
      <div className="text-align-center">
        <p>No playlists, connect platform by going to Account</p>
      </div>
    );

  return (
    <div className="playlist-collection">
      {playlists.map((playlist, index) => (
        <PlaylistComponent
          key={index}
          image={playlist.image}
          title={playlist.name}
          trackLength={playlist.trackLength}
          description={playlist.description}
          isPublic={playlist.isPublic}
          href={playlist.href}
          id={playlist.id}
          source={playlist.source}
        />
      ))}
    </div>
  );
};

export default PlaylistCollection;
