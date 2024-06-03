// ==UserScript==
// @name         PaceCrafter
// @namespace    http://tampermonkey.net/
// @version      0.3.1
// @description  Crafting pace
// @author       Kazuki F.
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

var regularVolume = 0;

function startObserve() {
    'use strict';

    debug("startObserve");

    const videoPlayerElements = Array.from(document.getElementsByClassName("html5-video-player"));
    if (videoPlayerElements.length == 0) {
        setTimeout(startObserve, "100");
        return;
    }
    setTimeout(checkRendererError, 1000);
    debug(videoPlayerElements);
    videoPlayerElements.forEach(function (videoPlayerElement) {
        let observer = new MutationObserver(records => {
            checkAd(videoPlayerElement);
        })
        observer.observe(videoPlayerElement, {
            attributes: true
        })
        debug("##### start observer", videoPlayerElement);
        checkAd(videoPlayerElement);
    });
}

function checkRendererError() {
    if(location.pathname == "/watch") {
        // Watch pageでのみ作動
        debug("Check render-error");
        let renderers_error = document.querySelectorAll(".style-scope.yt-playability-error-supported-renderers");
        if(renderers_error.length != 0) {
            location.reload();
        }
    } else {
        debug(location.pathname);
    }

    setTimeout(checkRendererError, 500);
}

function checkAd(videoPlayerElement) {
    let videos = document.querySelectorAll("video");
    if (videoPlayerElement.classList.contains("ad-showing")) {
        debug("##### find ad");
        // 広告っぽい
        videos.forEach(function (elem) {
            if(elem.volume > 0) {
                regularVolume = elem.volume;
                elem.volume = 0;
            }

            elem.playbackRate = 16.0;
        });
        document.getElementsByClassName("ytp-ad-skip-button-modern")[0].click()
    }
    else {
        debug("##### not find ad");
        // 広告じゃないっぽい
        videos.forEach(function (elem) {
            if(elem.volume == 0) {
                elem.volume = regularVolume;
                regularVolume = 0;
            }

            elem.playbackRate = 1.0;
        });
    }
}

function debug(message) {
    // console.log("[PaceCrafter:Log] "+message);
}


startObserve();
