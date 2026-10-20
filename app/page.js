import Link from "next/link";
import Media from "@/components/Media";
import Tilt3D from "@/components/Tilt3D";
import { site, projects } from "@/data/site";

// Home layout, taken from the owner's reference image ("video cards layout"): a fixed 1296 x 625 canvas
// (components/Tilt3D.js scales it to fit the window). Per project, in order:
//   [x, y, width, z]  — position + width in canvas px (height follows the video's shape),
//   z: fixed depth in the 3D tilt scene (px, + = nearer). Caption fonts are the same size on every tile.
// The four big tiles are the "near" ones; the four small ones sit further back.
const scatter = [
  [283, 0, 356, 25],    // ALTER EGOS GO TO EUROPE
  [14, 69, 196, 20],   // WHAT WOULD THE CREDIT CARD DEPARTMENT DO
  [698, 111, 354, 25], // BLACK DEMARCO - DON'T BE DUMB
  [1084, 7, 196, 20],   // ALTER EGOS CHARACTER SHOWCASE
  [1057, 433, 239, -20],  // APPLE - AIRPODS MAX
  [58, 474, 275, -20],    // A16Z - FOUNDRY
  [463, 426, 207, -20],   // STATICS_01
  [743, 380, 239, -20],   // MONARK MARKETS
];

export default function Home() {
  return (
    <div className="container home-stage">
      <h1 className="sr-only">{site.name}</h1>

      <Tilt3D as="section" className="grid" aria-label="Work">
        {projects.map((p, i) => {
          const [x, y, w, z] = scatter[i];
          const Wrapper = p.noPage ? "div" : Link;
          return (
          <Wrapper
            key={p.slug}
            {...(p.noPage ? {} : { href: `/work/${p.slug}` })}
            className="card"
            style={{ "--x": `${x}px`, "--y": `${y}px`, "--w": `${w}px`, "--z": z }}
          >
            <div className="card-media" style={{ aspectRatio: p.aspect }}>
              <Media src={p.thumb} hue={p.hue} title={p.title} />
            </div>
            <div className="card-meta">
              <h2 className="card-title">{p.caption ?? p.title}</h2>
            </div>
          </Wrapper>
          );
        })}
      </Tilt3D>
    </div>
  );
}
