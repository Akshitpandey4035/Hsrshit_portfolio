// All site content lives here. Media paths are relative to /public.
//
// Rich text (about bio, project descriptions) is an array of paragraphs; each paragraph is an
// array of segments. A segment is a plain string, or { t, b?, href? }:
//   b: true    -> bold
//   href       -> opens in a new tab, underlined

export const site = {
  name: "Haze Visuals",
  logo: "HAZE VISUALS",
  roles: ["Director", "CG Generalist", "Editor", "Cinematographer"],
  email: "work@haze.vision",
  instagram: "https://www.instagram.com/haze.vz/",
  twitter: "https://x.com/Hazevisualz",
  // Portrait on the About page. Set to an image path to replace the red placeholder panel.
  portrait: null,
  portraitCaption: "Didn’t had a photoshoot yet.",
  about: [
    [
      "Harshit aka Haze is a ",
      { t: "director", b: true },
      " and ",
      { t: "post-production", b: true },
      " artist making live-action films, music videos, and art.",
    ],
    [
      "With 7 years of experience in ",
      { t: "direction, CGI, motion design, and editing", b: true },
      ", he achieved his breakthrough project in 2026 with ",
      { t: "AWGE", b: true, href: "https://www.instagram.com/awgenization/" },
      " and ",
      { t: "A$AP Rocky", b: true, href: "https://www.instagram.com/asaprocky/" },
      " bringing a short film to life for the ",
      {
        t: "Don’t Be Dumb",
        b: true,
        href: "https://open.spotify.com/album/4itKk52E9ZCdWUQcFAkud9?si=H8kJOXwmRf-o8G-1oLDC4A",
      },
      { t: " tour (Leg 2)", b: true },
      ". The album debuted at ",
      { t: "No. 1", b: true },
      " on the ",
      { t: "Billboard 200 charts", b: true, href: "https://www.billboard.com/charts/billboard-200" },
      ".",
    ],
    [
      "He continues to push creative boundaries and set standards for film and animation, with major projects currently in progress (stay tuned).",
    ],
  ],
};

const hues = [168, 212, 262, 20, 42, 190];

// Per project:
//   media          — autoplaying preview on the home grid AND the player on the project page.
//   aspect         — tile / player shape (width / height). Match the video.
//   thumb          — optional still image shown on the PROJECT page instead of the video player.
//   externalHref   — with thumb: clicking that image opens this link (new tab). The home grid is unaffected.
//   caption        — optional label on the home grid when it differs from the page title.
//   noPage         — video + title on the home grid only: not clickable, no project page.
//   titleHref      — optional external link on the project page title.
//   videoWidth /
//   infoWidth      — desktop widths (px) of the player and info columns on the project page.
const entries = [
  {
    slug: "dont-be-dumb-tour",
    title: "ALTER EGOS GO TO EUROPE",
    category: "SHORT FILM",
    year: "2026",
    media: "/videos/dont-be-dumb-tour.mp4",
    thumb: "/thumbs/dont-be-dumb-tour.jpg",
    externalHref: "https://www.instagram.com/p/DcmIK2Vp9fm/",
    aspect: "4 / 3",
    videoWidth: 533,
    infoWidth: 427,
    description: [
      ["Short film for ", { t: "A$AP ROCKY'S DON'T BE DUMB TOUR (LEG 2)", b: true }],
      [
        "The characters were made by ",
        { t: "me", b: true },
        " from scratch including ",
        { t: "sculpting, modeling, texturing, and rigging", b: true },
        ".",
      ],
      [
        "My role in the project was doing the entire ",
        { t: "character design", b: true },
        " and ",
        { t: "animation", b: true },
        " including the ",
        { t: "look dev", b: true },
        ".",
      ],
    ],
    credits: [
      ["DIRECTOR", "Jaden Lee"],
      ["CG", "Haze and Jaden Lee"],
      ["ANIMATION", "Haze"],
      ["SOUND DESIGN", "Aron Taub"],
    ],
  },
  {
    slug: "credit-card-department",
    title: "WHAT WOULD THE CREDIT CARD DEPARTMENT DO",
    category: "Motion design",
    year: "2025",
    media: "/videos/credit-card-department.mp4",
    thumb: "/thumbs/credit-card-department.jpg",
    externalHref: "https://www.instagram.com/p/DP1Au9bkniC/",
    aspect: "3 / 4",
    videoWidth: 420,
    infoWidth: 540,
    description: [
      [
        "A attempt at showcasing ",
        { t: "Dhanji's", href: "https://www.instagram.com/skrrtt.skrrrt/" },
        " journey and the success from his debut LP, one of my favourite records ever, ",
        { t: "RUAB", href: "https://open.spotify.com/album/3kcLseJNFGfubBeDxpG66V?si=e7LqSaScSUOY-72GaF4tlw" },
        ", through ",
        { t: "2D parallax magazine style animation", b: true },
        ", for which I took the inspiration from the cover art of his recent mixtape ",
        {
          t: "DRIVE-IN CINEMA 2.1",
          href: "https://open.spotify.com/album/6cojhL5vnV2GCg3RaZz5bM?si=2zNUsPYVTm2IzoxFE-YLOg",
        },
        " .",
      ],
      [
        "I took references from a few of his music videos and tried to highlight elements from the city he represents Ahmedabad, and the culture he brings through his music.",
      ],
      ["All of the scenes are designed, animated and composited completely by me."],
    ],
    credits: [
      ["DIRECTOR", "Haze"],
      ["MOTION DESIGN", "Haze"],
      ["CG", "Haze"],
      ["EDIT", "Haze"],
    ],
  },
  {
    slug: "black-demarco",
    title: "BLACK DEMARCO",
    caption: "BLACK DEMARCO - DON’T BE DUMB",
    category: "CG",
    year: "2026",
    media: "/videos/black-demarco.mp4",
    thumb: "/thumbs/black-demarco.jpg",
    externalHref: "https://www.instagram.com/p/DbQSWzYTHBC/",
    aspect: "16 / 9",
    videoWidth: 640,
    infoWidth: 320,
    description: [
      [
        "Inspired by ",
        { t: "Tim Burton's", b: true },
        " depiction of ",
        { t: "A$AP Rocky's", b: true },
        " alter egos on ",
        { t: "DON’T BE DUMB", b: true },
        ".",
      ],
      [
        "Spent a significant amount of time studying the distinct behavior of each character before moving into animation. The album featured one of the most compelling visual concepts I've seen in recent years, which drove me to bring this to existence.",
      ],
      [{ t: "3D Modeling, Texturing & Animation done in Blender, composited & Edited in Adobe After Effects.", b: true }],
    ],
    credits: [
      ["DIRECTOR", "Haze"],
      ["CG", "Haze"],
      ["EDIT", "Haze"],
    ],
  },
  {
    slug: "character-showcase",
    title: "ALTER EGOS CHARACTER SHOWCASE",
    category: "CG",
    year: "2026",
    media: "/videos/character-showcase.mp4",
    aspect: "4 / 5",
    videoWidth: 416,
    infoWidth: 544,
    description: [
      [
        "A ",
        { t: "character design", b: true },
        " and ",
        { t: "visual direction", b: true },
        " portfolio piece exploring ",
        { t: "A$AP Rocky’s", b: true, href: "https://www.instagram.com/asaprocky/" },
        { t: " distinct alter egos", b: true },
        ". Driven by an extensive study of ",
        { t: "character behavioral nuance, posture, movement traits, and psychological quirks", b: true },
        ", the project serves as a showcase for stylized asset creation and cohesive world building.",
      ],
    ],
    credits: [
      ["DIRECTOR", "Haze"],
      ["CG", "Haze"],
      ["EDIT", "Haze"],
    ],
  },
  {
    slug: "apple-airpods-max",
    title: "APPLE - AIRPODS MAX",
    category: "Motion design/CG",
    year: "2024",
    media: "/videos/apple-airpods-max.mp4",
    aspect: "16 / 9",
    videoWidth: 640,
    infoWidth: 320,
    description: [
      [
        { t: "3D motion design", b: true },
        " project I made to ",
        { t: "showcase product visualization", b: true },
        ". While post-production source files were ",
        { t: "lost", b: true },
        " to corruption before final assembly for the reason of this being ",
        { t: "incomplete", b: true },
        ".",
      ],
    ],
    credits: [
      ["DIRECTOR", "Haze"],
      ["CG", "Haze"],
      ["MOTION DESIGN", "Haze"],
      ["EDIT", "Haze"],
    ],
  },
  {
    slug: "a16z-foundry",
    title: "A16Z - FOUNDRY",
    category: "Motion design",
    year: "2026",
    media: "/videos/a16z-foundry.mp4",
    thumb: "/thumbs/a16z-foundry.jpg",
    externalHref: "https://www.foundrymgt.com/",
    aspect: "1920 / 816",
    videoWidth: 640,
    infoWidth: 320,
    rounded: true,
    description: [
      [
        "A launch video for ",
        { t: "Foundry management", b: true, href: "https://foundrymgt.com/" },
        ". A platform created by ",
        { t: "a16z American Dynamism", b: true, href: "https://a16z.com/american-dynamism/" },
        " and ",
        { t: "Atlas Holdings", b: true, href: "https://www.atlasholdingsllc.com/" },
        { t: ".", b: true },
      ],
    ],
    credits: [
      ["DIRECTOR", "Jaden Lee"],
      ["CG", "Jaden Lee and Haze"],
      ["EDIT", "Jaden Lee"],
    ],
  },
  {
    slug: "statics-01",
    title: "STATICS_01",
    titleHref: "https://www.instagram.com/p/Dc55IN2xLMk/",
    category: "Cinematography",
    year: "2026",
    media: "/videos/statics-01.mp4",
    aspect: "4 / 3",
    videoWidth: 640,
    infoWidth: 320,
    description: [
      [
        "A series I started, where I capture statics to show the beauty of static shots. Entirely shot, graded and edited by me.",
      ],
    ],
    credits: [
      ["DIRECTOR", "Haze"],
      ["CINEMATOGRAPHY", "Haze"],
      ["EDIT", "Haze"],
    ],
  },
  {
    slug: "monark-markets",
    title: "MONARK MARKETS",
    noPage: true,
    media: "/videos/monark-markets.mp4",
    aspect: "16 / 9",
  },
];

export const projects = entries.map(({ media, thumb, ...e }, i) => ({
  ...e,
  // home grid preview: always an autoplaying video; local files use the small loop in /previews
  thumb: media.startsWith("/videos/") ? media.replace("/videos/", "/previews/") : media,
  poster: thumb, // project page still (optional)
  video: media,
  hue: hues[i % hues.length],
}));

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
