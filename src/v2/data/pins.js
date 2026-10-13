/* ===========================================================================
   The pin board's content. One object per pin; the page only switches on `type`.

   Real content only. Captions and lists come from the linked pages; a
   `story` is only written when Josh has said why something is pinned.

   Shape:
     id        stable slug (also the React key, and the seed for its tilt)
     type      photo | playlist | quote | note | link | book | artifact | ticket | score
     title     short; also the accessible name of the pin
     date      "YYYY-MM" (optional for books)
     caption?  one line, shown in the story view
     story?    the reason it is pinned (the point of the whole page)
     place?, tags[]
   Per type:
     photo     image: { src, width, height, alt }   real photo (preferred)
               scene: "court" | "desk" | "sky" | "street"   drawn placeholder
               print: "cyan" | "sepia" | "mono" | "film"   opt-in treatment
     playlist  tracks: [[title, artist]], url, kind? ("Album"; default "Playlist"), by?, art?
     quote     quote, by
     link      url, author, art?: { src, shape: "round" | "square" }  (avatar / cover)
     book      author, cover?: { bg, fg, sub, motif? }   (no date needed)
     artifact  code?   (no code -> the title is shown large, e.g. "52 lbs")
     ticket    place?, number?, theme?: "dark"
     score     score: [[mine, theirs], ...]
   Real photos go in public/pin-images/ and are referenced as "/pin-images/x.jpg".
=========================================================================== */

const PINS = [
  {
    id: "tennis-clash-matches",
    type: "link",
    title: "Tennis Clash Matches",
    author: "My YouTube channel",
    url: "https://www.youtube.com/@tennisclash_matches",
    art: { src: "/pin-images/tennis-clash-matches.jpg", shape: "round" },
    date: "2026-10",
    caption: "Recordings of my Tennis Clash matches.",
    tags: ["tennis", "games"],
  },
  {
    id: "2bd2bth",
    type: "link",
    title: "2bd2bth",
    author: "Comedy sketches",
    url: "https://www.youtube.com/@2bd2bth",
    art: { src: "/pin-images/2bd2bth.jpg", shape: "round" },
    date: "2026-10",
    caption: "Comedy sketches by Jenny & Josh.",
    tags: ["comedy", "video"],
  },
  {
    id: "hannah-fry",
    type: "link",
    title: "Hannah Fry",
    author: "Mathematician and science writer",
    url: "https://www.youtube.com/@fryrsquared",
    art: { src: "/pin-images/hannah-fry.jpg", shape: "round" },
    date: "2026-10",
    caption: "Maths and science videos.",
    tags: ["maths", "video"],
  },
  {
    id: "jay-sharon",
    type: "link",
    title: "Jay & Sharon",
    author: "Comedy shorts",
    url: "https://www.youtube.com/@JaySharon",
    art: { src: "/pin-images/jay-sharon.jpg", shape: "round" },
    date: "2026-10",
    caption: "Short comedy sketches.",
    tags: ["comedy", "video"],
  },
  {
    id: "htx-studio",
    type: "link",
    title: "HTX Studio",
    author: "Hardware builds and tech reviews",
    url: "https://www.youtube.com/@HTXStudio",
    art: { src: "/pin-images/htx-studio.jpg", shape: "round" },
    date: "2026-10",
    caption: "Gadget builds and tech reviews.",
    tags: ["tech", "video"],
  },
  {
    id: "key-and-peele",
    type: "link",
    title: "Key & Peele",
    author: "Keegan-Michael Key and Jordan Peele",
    url: "https://www.youtube.com/@KeyAndPeele",
    art: { src: "/pin-images/key-and-peele.jpg", shape: "round" },
    date: "2026-10",
    caption: "Sketches from their Comedy Central show.",
    tags: ["comedy", "video"],
  },
  {
    id: "chewkz",
    type: "link",
    title: "Chewkz",
    author: "Comedy sketches and short films",
    url: "https://www.youtube.com/@Chewkz",
    art: { src: "/pin-images/chewkz.jpg", shape: "round" },
    date: "2026-10",
    caption: "Comedy sketches and short films.",
    tags: ["comedy", "video"],
  },
  {
    id: "kallmekris",
    type: "link",
    title: "Kallmekris",
    author: "True crime and horror stories",
    url: "https://www.youtube.com/@kallmekris",
    art: { src: "/pin-images/kallmekris.jpg", shape: "round" },
    date: "2026-10",
    caption: "True crime and scary stories.",
    tags: ["true crime", "video"],
  },

  // Podcasts
  {
    id: "strangers-on-a-bench",
    type: "link",
    title: "Strangers on a Bench",
    author: "Podcast",
    url: "https://open.spotify.com/show/5stjSreUX9Y9iUYv0KSxBH",
    art: { src: "/pin-images/strangers-on-a-bench.jpg", shape: "square" },
    date: "2026-10",
    caption: "Podcast on Spotify.",
    tags: ["podcast"],
  },

  // Albums
  {
    id: "dont-forget-about-me-demos",
    type: "playlist",
    kind: "Album",
    title: "Don't Forget About Me, Demos",
    by: "Dominic Fike",
    url: "https://open.spotify.com/album/05jbNkYoEQdjVDHEHtg1gY",
    art: { src: "/pin-images/dont-forget-about-me-demos.jpg", shape: "square" },
    date: "2026-10",
    caption: "EP by Dominic Fike.",
    tracks: [
      ["3 Nights", "Dominic Fike"],
      ["She Wants My Money", "Dominic Fike"],
      ["Babydoll", "Dominic Fike"],
      ["Westcoast Collective", "Dominic Fike"],
      ["Socks", "Dominic Fike"],
      ["King of Everything", "Dominic Fike"],
      ["Falling Asleep", "Dominic Fike"],
      ["Batshit", "Dominic Fike"],
    ],
    tags: ["music", "album"],
  },
  {
    id: "catharsis",
    type: "playlist",
    kind: "Album",
    title: "catharsis",
    by: "FOLA",
    url: "https://open.spotify.com/album/6gTLViwiDv6NKtTAG0nm7S",
    art: { src: "/pin-images/catharsis.jpg", shape: "square" },
    date: "2025-09",
    caption: "Album by FOLA.",
    tracks: [
      ["gokada", "FOLA"],
      ["eko", "FOLA"],
      ["golibe", "FOLA, Victony"],
      ["you", "FOLA"],
      ["lost", "FOLA, Kizz Daniel"],
      ["healer", "FOLA"],
      ["cruise control", "FOLA"],
      ["robbery", "FOLA, Gabzy"],
      ["caricature", "FOLA"],
      ["disco", "FOLA, Young Jonn"],
      ["it's going", "FOLA"],
    ],
    tags: ["music", "album"],
  },

  // My monthly playlists
  {
    id: "playlist-2026-02",
    type: "playlist",
    title: "February 26",
    url: "https://open.spotify.com/playlist/6jStIEW6BY4gw2GkbyTkvJ",
    art: { src: "/pin-images/playlist-2026-02.jpg", shape: "square" },
    date: "2026-02",
    caption: "My February playlist.",
    tracks: [
      ["No Regrets", "MAGIC!"],
      ["ALL MY LIFE", "Naïka"],
      ["Good Time", "Lady Donli, Tems"],
      ["Corner", "Lady Donli, VanJess, The Cavemen."],
      ["We're Going Home", "Vance Joy"],
      ["Sign of the Times", "Harry Styles"],
      ["Shovels & Dirt", "The Strumbellas"],
      ["Spirits", "The Strumbellas"],
      ["MEMORY ON ME", "Naïka"],
      ["We Don't Know", "The Strumbellas"],
    ],
    tags: ["music", "monthly"],
  },
  {
    id: "playlist-2026-03",
    type: "playlist",
    title: "March 26",
    url: "https://open.spotify.com/playlist/2J82e9Fmmo8myFEfOpFewp",
    art: { src: "/pin-images/playlist-2026-03.jpg", shape: "square" },
    date: "2026-03",
    caption: "My March playlist.",
    tracks: [
      ["Stay the Night", "Dwin, The Stoic"],
      ["Hide & Seek", "Stormzy"],
      ["Sapphire (feat. Arijit Singh) - Remix", "Ed Sheeran, Arijit Singh"],
      ["For Always", "Ed Sheeran"],
      ["Rapture", "Ed Sheeran"],
      ["who does that? (feat. Bella Shmurda)", "FOLA, Bella Shmurda"],
      ["I Just Might", "Bruno Mars"],
      ["Serenade", "Ogranya"],
      ["If You Say", "Obongjayar, Sarz"],
      ["Azizam", "Ed Sheeran"],
    ],
    tags: ["music", "monthly"],
  },
  {
    id: "playlist-2026-04",
    type: "playlist",
    title: "April 26",
    url: "https://open.spotify.com/playlist/3eg9GhpZRktYc9MW9QFfg8",
    art: { src: "/pin-images/playlist-2026-04.jpg", shape: "square" },
    date: "2026-04",
    caption: "My April playlist.",
    tracks: [
      ["So Easy (To Fall In Love)", "Olivia Dean"],
      ["From The Start", "Laufey"],
      ["Falling Behind", "Laufey"],
      ["Madwoman", "Laufey"],
      ["Hand Of God - Outro", "Jon Bellion"],
    ],
    tags: ["music", "monthly"],
  },
  {
    id: "playlist-2026-05",
    type: "playlist",
    title: "May 26",
    url: "https://open.spotify.com/playlist/1vvQHwq2wydFJNOGjZguxK",
    art: { src: "/pin-images/playlist-2026-05.jpg", shape: "square" },
    date: "2026-05",
    caption: "My May playlist.",
    tracks: [
      ["3 Nights", "Dominic Fike"],
      ["Babydoll", "Dominic Fike"],
      ["Wanna Be Startin' Somethin'", "Michael Jackson"],
      ["Human Nature", "Michael Jackson"],
      ["dirty laundry", "blackbear"],
      ["I Think They Call This Love", "Elliot James Reay"],
    ],
    tags: ["music", "monthly"],
  },
];

/* Offline life: photos, a book and a ticket. Places and dates are Josh's;
   photos are cropped to their print shape with all metadata stripped. */
const OFFLINE = [
  {
    id: "tennis-rackets",
    type: "photo",
    print: "mono",
    title: "Racket collection",
    image: { src: "/pin-images/tennis-rackets.jpg", width: 960, height: 1200, alt: "Four tennis rackets and a cap on a wall rack, with a potted plant on top" },
    place: "Lagos",
    date: "2026-02",
    tags: ["tennis"],
  },
  {
    id: "tennis-court",
    type: "photo",
    title: "On court",
    image: { src: "/pin-images/tennis-court.jpg", width: 960, height: 1200, alt: "A tennis ball resting on a racket's strings, on a green court by the net" },
    place: "Lagos",
    date: "2025-12",
    tags: ["tennis"],
  },
  {
    id: "abuja-hike-view",
    type: "photo",
    print: "cyan",
    title: "Hike, Abuja",
    image: { src: "/pin-images/abuja-hike-view.jpg", width: 1200, height: 900, alt: "Wide rocky hilltop with scattered trees and the city in the distance" },
    place: "Abuja",
    date: "2025-11",
    tags: ["hiking"],
  },
  {
    id: "abuja-hike",
    type: "photo",
    print: "mono",
    title: "On the hike",
    image: { src: "/pin-images/abuja-hike.jpg", width: 960, height: 1200, alt: "Josh in a cap on a hilltop, with the city spread out below" },
    place: "Abuja",
    date: "2025-11",
    tags: ["hiking"],
  },
  {
    id: "enugu-kedu",
    type: "photo",
    title: "042, Kedu?",
    image: { src: "/pin-images/enugu-kedu.jpg", width: 960, height: 1200, alt: "A café wall mural reading 042 Kedu? above white chairs and a table" },
    place: "Enugu",
    date: "2025-07",
    caption: "042 is Enugu's phone code, and kedu is Igbo for \u201chow are you?\u201d",
    tags: ["home"],
  },
  {
    id: "fort-jesus-anchor",
    type: "photo",
    print: "sepia",
    title: "Fort Jesus",
    image: { src: "/pin-images/fort-jesus-anchor.jpg", width: 960, height: 1200, alt: "A large old iron anchor standing against a weathered fort wall" },
    place: "Mombasa",
    date: "2023-01",
    tags: ["travel"],
  },
  {
    id: "nairobi-go-kart",
    type: "photo",
    print: "film",
    title: "Birthday, 2022",
    image: { src: "/pin-images/nairobi-go-kart.jpg", width: 1200, height: 502, alt: "A go-kart blurred with speed on a track lined with red and white barriers" },
    place: "Nairobi",
    date: "2022-12",
    tags: ["birthday"],
  },
  {
    id: "masai-mara-lion",
    type: "photo",
    title: "Masai Mara",
    image: { src: "/pin-images/masai-mara-lion.jpg", width: 1200, height: 900, alt: "A young lion standing in tall golden grass" },
    place: "Masai Mara",
    date: "2022-09",
    tags: ["travel"],
  },
  {
    id: "masai-mara-balloons",
    type: "photo",
    title: "Balloons over the Mara",
    image: { src: "/pin-images/masai-mara-balloons.jpg", width: 1200, height: 900, alt: "Three striped hot-air balloons drifting low over the savanna at sunrise" },
    place: "Masai Mara",
    date: "2022-09",
    tags: ["travel"],
  },
  {
    id: "rework",
    type: "book",
    title: "Rework",
    author: "Jason Fried & David Heinemeier Hansson",
    cover: { bg: "#f4f1ea", fg: "#c8202f", sub: "#2d3a8c", motif: "crumpled" },
    tags: ["books"],
  },
  {
    id: "nextjs-conf-2022",
    type: "ticket",
    title: "Next.js Conf",
    number: "#100491",
    place: "Online · hosted by Vercel",
    date: "2022-10",
    theme: "dark",
    tags: ["events"],
  },
];

/* Board order. Offline pins are spread through the board, not kept in a
   block, so it reads as one life rather than "online" and "offline". */
const ORDER = [
  "tennis-clash-matches", "tennis-rackets", "2bd2bth", "masai-mara-balloons",
  "hannah-fry", "rework", "jay-sharon", "tennis-court", "htx-studio",
  "nairobi-go-kart", "key-and-peele", "abuja-hike-view", "chewkz",
  "strangers-on-a-bench", "fort-jesus-anchor", "dont-forget-about-me-demos",
  "enugu-kedu", "kallmekris", "catharsis", "masai-mara-lion", "playlist-2026-02",
  "abuja-hike", "playlist-2026-03", "nextjs-conf-2022", "playlist-2026-04",
  "playlist-2026-05",
];

const byId = Object.fromEntries([...PINS, ...OFFLINE].map((pin) => [pin.id, pin]));
const BOARD = ORDER.map((id) => byId[id]);
if (BOARD.length !== PINS.length + OFFLINE.length || BOARD.some((pin) => !pin)) {
  throw new Error("pins.js: ORDER must list every pin exactly once");
}

export default BOARD;
