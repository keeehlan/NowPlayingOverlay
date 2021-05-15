const refreshRate = 500;

const animationDuration = 500;

let isPlaying = false;

let isNewTrackId = true;

let isNewAlbum = true;
let isNewTrack = true;
let isNewArtist = true;

let trackId = "";
let track = "";
let album = "";
let artist = "";

let $body = null;
let $artworkImg = null;

function checkIfTrackHasChanged() {
    return $.get("Snip_TrackId.txt", function (newTrackId) {
        newTrackId = newTrackId.replace(/&/g, "&amp;");

        isNewTrackId = trackId !== newTrackId;

        trackId = newTrackId;

        isPlaying = !!trackId;
    }.bind(this));
}

function getNowPlaying() {
    return $.get("Snip_Metadata.json", function (data) {
        try {
            data = JSON.parse(data);
        } catch {
        }

        data = data.item || data;

        let newTrack = data.name.replace(/&/g, "&amp;");
        let newAlbum = data.album.name.replace(/&/g, "&amp;");
        let newArtist = buildArtistDisplay(data.artists).replace(/&/g, "&amp;");

        isNewAlbum = newAlbum && album !== newAlbum;
        isNewTrack = newTrack && track !== newTrack;
        isNewArtist = newArtist && artist !== newArtist;

        album = newAlbum;
        track = newTrack;
        artist = newArtist;
    }.bind(this));
}

function buildArtistDisplay(artistArray) {
    let newArtist = "";

    for (let i = 0; i < artistArray.length; i++) {
        newArtist += artistArray[i].name;

        if (i < artistArray.length - 1)
            newArtist += ", ";
    }

    return newArtist;
}

function setMarquee() {
    let containerWidth = $("#info").width();

    const isTrackTooWide = $("#track").outerWidth() > containerWidth;

    if (isTrackTooWide) {
        hideTrack();

        setTimeout(function () {
            $("#track").addClass("marquee");

            showTrack();
        }, animationDuration);
    } else
        $("#track").removeClass("marquee");

    const isArtistTooWide = $("#artist").outerWidth() > containerWidth;

    if (isArtistTooWide) {
        hideArtist();

        setTimeout(function () {
            $("#artist").addClass("marquee");

            showArtist();
        }, animationDuration);
    } else
        $("#artist").removeClass("marquee");
}

function showArtist() {
    $("#artist").removeClass("hide");
}

function hideArtist() {
    $("#artist").addClass("hide");
}

function setArtist() {
    $("#artist").html(artist);
}

function showTrack() {
    $("#track").removeClass("hide");
}

function hideTrack() {
    $("#track").addClass("hide");
}

function setTrack() {
    $("#track").html(track);
}

function showArtwork() {
    $artworkImg.removeClass("hide");
}

function hideArtwork() {
    $artworkImg.addClass("hide");
}

function setArtwork() {
    const path = "Snip_Artwork.jpg?" + Date.now();

    $artworkImg.prop("src", path);
}

function showAll() {
    $body.removeClass("hide");

    setTimeout(function () {
        showArtwork();
        showTrack();
        showArtist();

        setMarquee();
    }.bind(this), animationDuration);
}

function hideAll() {
    if (!isPlaying || isNewAlbum)
        hideArtwork();

    if (!isPlaying || isNewTrack)
        hideTrack();

    if (!isPlaying || isNewArtist)
        hideArtist();

    if (!isPlaying)
        setTimeout(function () {
            $body.addClass("hide");
        }, animationDuration);
}

function checkNowPlaying() {
    checkIfTrackHasChanged().then(function () {
        if (isPlaying && isNewTrackId) {
            getNowPlaying().then(function () {
                hideAll();

                setTimeout(function () {
                    setArtwork();
                    setTrack();
                    setArtist();

                    showAll();

                    setTimeout(function () {
                        checkNowPlaying();
                    }.bind(this), animationDuration);
                }.bind(this), animationDuration);
            }.bind(this));
        } else if (!isPlaying) {
            hideAll();

            setTimeout(checkNowPlaying.bind(this), refreshRate);
        } else {
            setTimeout(checkNowPlaying.bind(this), refreshRate);
        }
    }.bind(this));
}

$(document).ready(function () {
    $body = $("body");
    $artworkImg = $("#artwork img");

    checkNowPlaying();

    $(window).resize(setMarquee);
});