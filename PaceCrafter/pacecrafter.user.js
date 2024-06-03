// ==UserScript==
// @name         PaceCrafter
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  Crafting pace
// @author       Kazuki F.
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

var regularVolume = 0;

function startObserve() {
    'use strict';

    // console.log("startObserve");

    const videoPlayerElements = Array.from(document.getElementsByClassName("html5-video-player"));
    if (videoPlayerElements.length == 0) {
        setTimeout(startObserve, "100");
        return;
    }
    setTimeout(checkRendererError, 1000);
    console.log(videoPlayerElements);
    videoPlayerElements.forEach(function (videoPlayerElement) {
        let observer = new MutationObserver(records => {
            checkAd(videoPlayerElement);
        })
        observer.observe(videoPlayerElement, {
            attributes: true
        })
        console.log("##### start observer", videoPlayerElement);
        checkAd(videoPlayerElement);
    });
}

function checkRendererError() {
    // console.log("Check render-error");
    let renderers_error = document.querySelectorAll(".style-scope.yt-playability-error-supported-renderers");
    if(renderers_error.length != 0) {
        location.reload();
    }
    setTimeout(checkRendererError, 500);
}

function checkAd(videoPlayerElement) {
    let videos = document.querySelectorAll("video");
    if (videoPlayerElement.classList.contains("ad-showing")) {
        console.log("##### find ad");
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
        console.log("##### not find ad");
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

startObserve();
