# Videos (not in git)

Video files are kept out of the repository because they are too large for GitHub
(two are over the 100 MB file limit). Get them from the site owner and place them
in this folder with **exactly** these names — `data/site.js` references them:

| File name | Project | Shape |
|---|---|---|
| `dont-be-dumb-tour.mp4` | Don't Be Dumb Tour | 1440×1080 (4:3) |
| `credit-card-department.mp4` | What Would the Credit Card Department Do | 1440×1920 (3:4) |
| `black-demarco.mp4` | Black Demarco | 1920×1080 (16:9) |
| `character-showcase.mp4` | Character Showcase | 1536×1920 (4:5) |
| `apple-airpods-max.mp4` | Apple - AirPods Max | 1920×1080 (16:9) |
| `a16z-foundry.mp4` | A16Z - Foundry | 1920×816 (~2.35:1) |

All must be H.264 MP4 (browsers can't play ProRes). If a file is missing, its tile
shows a black box — set that project's `media` to `null` in `data/site.js` to show
a placeholder instead.
