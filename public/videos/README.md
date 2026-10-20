# Videos

The compressed H.264 MP4s live in this folder and are committed to git (all well under
GitHub's 100 MB per-file limit). `data/site.js` references them by file name. Short preview
loops for the home page are in `public/previews/` with the same file names.

When adding a video: keep it H.264 MP4 (browsers can't play ProRes) and compress it first
(1080p, ~CRF 20-23). Then make a matching preview loop:

    ffmpeg -i public/videos/NAME.mp4 -t 8 -an -vf "scale=720:720:force_original_aspect_ratio=decrease:force_divisible_by=2" \
      -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p -movflags +faststart public/previews/NAME.mp4
