// All site content lives here. Replace placeholders with real text/media.
// Media paths are relative to /public (e.g. "/videos/project-one.mp4").

export const site = {
  name: "Haze Visuals",
  logo: "HAZE VISUALS",
  roles: ["Director", "CG Generalist", "Editor", "Cinematographer"],
  email: "hello@hazevisuals.com",
  instagram: "https://www.instagram.com/yourhandle",
  location: "Based in Your City",
  about: [
    "Haze Visuals is a placeholder bio. Describe who you are and the kind of films, commercials and visuals you make.",
    "Placeholder paragraph about how you started and the first projects that shaped your style.",
    "Placeholder paragraph about notable collaborations, releases or campaigns.",
    "Placeholder paragraph about what you are focused on now and the work you want to make next.",
  ],
  // Portrait on the About page. Set to an image path to replace the placeholder.
  portrait: null,
};

const hues = [168, 212, 262, 20, 42, 190];

// Per project:
//   thumb  — preview on the home grid (mp4/webm plays on hover; gif/jpg shows as image). null = placeholder.
//   video  — main video on the project page: local file ("/videos/x.mp4") or YouTube/Vimeo embed URL.
//   aspect — tile shape on the home grid (width / height). Match the video.
const entries = [
  { slug: "dont-be-dumb-tour", title: "DON'T BE DUMB TOUR", category: "Tour Visuals", media: "/videos/dont-be-dumb-tour.mp4", aspect: "4 / 3" },
  { slug: "credit-card-department", title: "WHAT WOULD THE CREDIT CARD DEPARTMENT DO", category: "Short Film", media: "/videos/credit-card-department.mp4", aspect: "3 / 4" },
  { slug: "black-demarco", title: "BLACK DEMARCO", category: "Music Video", media: "/videos/black-demarco.mp4", aspect: "16 / 9" },
  { slug: "character-showcase", title: "CHARACTER SHOWCASE", category: "CG", media: "/videos/character-showcase.mp4", aspect: "4 / 5" },
  { slug: "apple-airpods-max", title: "APPLE - AIRPODS MAX", category: "Commercial", media: "/videos/apple-airpods-max.mp4", aspect: "16 / 9" },
  { slug: "a16z-foundry", title: "A16Z - FOUNDRY", category: "Commercial", media: "/videos/a16z-foundry.mp4", aspect: "1920 / 816" },
];

export const projects = entries.map(({ media, ...e }, i) => ({
  ...e,
  year: "2026",
  thumb: media,
  video: media,
  hue: hues[i % hues.length],
  description:
    "Placeholder description of the project: what it was, who it was for, and what made it notable.",
  credits: [
    ["Director", "Haze Visuals"],
    ["CG", "Haze Visuals"],
    ["Edit", "Haze Visuals"],
    ["Production", "Production Company"],
  ],
}));

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
