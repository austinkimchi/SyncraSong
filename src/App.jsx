import PlaylistSection from "./components/PlaylistSection.jsx";
import darkLogo from "./assets/logo/logo-dark.svg";
import "./App.css";
import Account from "./components/Account.jsx";

const playlistsData = [
  {
    image: "https://placehold.co/150@2x.png",
    name: "Chill Vibes",
    trackLength: 20,
    id: "1875821750128",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Rock Classics",
    trackLength: 15,
    id: "187582175340129",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Pop Hits",
    trackLength: 30,
    id: "18758213750130",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Jazz & Blues",
    trackLength: 10,
    id: "1875821750131",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Hip Hop",
    trackLength: 25,
    id: "18758217530132",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Metal Madness",
    trackLength: 18,
    id: "18758213750133",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Chill Vibes",
    trackLength: 20,
    id: "18758217530128",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Rock Classics",
    trackLength: 15,
    id: "18758213750129",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Pop Hits",
    trackLength: 30,
    id: "1875821750130",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Jazz & Blues",
    trackLength: 10,
    id: "1875821750131",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Hip Hop",
    trackLength: 25,
    id: "1875821750132",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Metal Madness",
    trackLength: 18,
    id: "1875821750133",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Chill Vibes",
    trackLength: 20,
    id: "18758217350128",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Rock Classics",
    trackLength: 15,
    id: "18753821750129",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Pop Hits",
    trackLength: 30,
    id: "18758231750130",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Jazz & Blues",
    trackLength: 10,
    id: "18758217530131",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Hip Hop",
    trackLength: 25,
    id: "18758321750132",
  },
  {
    image: "https://placehold.co/150@2x.png",
    name: "Metal Madness",
    trackLength: 18,
    id: "18758231750133",
  },
];

function App() {
  return (
    <>
      <script src="https://js-cdn.music.apple.com/musickit/v3/musickit.js"></script>

      <nav
        className={
          "bg-black top-0 flex pt-24 items-center padding-1 justifyc-space padding-lr-2"
        }
      >
        <div className="flex left-flex-comp"></div>

        <div className={"container flex flex-row"}>
          <div className={"flex flex-row items-center"} id="hamburger">
            <a href="#" className="h-full">
              <img
                src={darkLogo}
                alt={"logo"}
                id="logo"
                className={"w-32 h-i padding-0"}
              />
            </a>
            <a href={"#"}>Dashboard</a>
          </div>
        </div>

        <div className="flex right-flex-comp">
          <Account />
        </div>
      </nav>

      <div className={"w-full margin-top-2"}>
        {localStorage.getItem("user_data") &&
        JSON.parse(localStorage.getItem("user_data")).apple ? (
          <PlaylistSection providerToLoad="apple"></PlaylistSection>
        ) : localStorage.getItem("token") ? (
          // add click here to connect to apple music
          <div>
            <p>Connect to Apple Music</p>
          </div>
        ) : (
          ""
        )}
        {localStorage.getItem("user_data") &&
        JSON.parse(localStorage.getItem("user_data")).spotify ? (
          <PlaylistSection providerToLoad="spotify"></PlaylistSection>
        ) : localStorage.getItem("token") ? (
          // add click here to connect to spotify
          <div>
            <p>Connect to Spotify</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default App;
