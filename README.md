# NowPlayingOverlay

![Overlay screenshot](https://i.imgur.com/MHvVrVC.png)

A very simple, clean, & animated music overlay. (based on [Zyphen's Now Playing Overlay](https://obsproject.com/forum/resources/zyphens-now-playing-overlay.1026/))

While Zyphen's version supports Tuna, I have modified mine in such a way that it only supports Snip. I might update the overlay in the future, but for now, only Snip is supported.

The JavaScript that makes this work is pretty messy. Try not to look at it too closely.

## Snip Instructions
1. Download & install [Snip](https://github.com/dlrudie/Snip).
2. Run & authorize it with your Spotify account.
3. Right-click the Snip icon in your Notification Area (a.k.a. System Tray), and ensure your settings match this: 

![Snip settings](https://i.imgur.com/NuGh999.png)

Snip is **not perfect.** If your overlay is acting strange, the easiest fix is to stop Snip and run it again. Sometimes it also helps if you pause and play your music to force an update of the metadata.

## Overlay Instructions
1. Download my [latest release](https://github.com/kehlankrumme/NowPlayingOverlay/releases/latest).
2. Move `Song.html` into the same folder as `Snip.exe`.

## Open Broadcaster Software Instructions
1. Add a Browser source.
2. Your settings should look like this, just make sure that `Local File` matches the path to `Song.html` in your Snip folder: 

![Browser source settings](https://i.imgur.com/I5AEBFu.png)
