// ==UserScript==
// @name         PaceCrafter
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

function startObserve() {
    'use strict';
    console.log("startObserve");

    const videoPlayerElements = Array.from(document.getElementsByClassName("html5-video-player"));
    console.log(videoPlayerElements);
    videoPlayerElements.forEach(function (videoPlayerElement) {
        const observer = new MutationObserver(records => {
            checkAd(videoPlayerElement);
        })
        observer.observe(videoPlayerElement, {
            attributes: true,
            attributeFilter: ['class']
        })
        console.log("##### start observer", videoPlayerElement);
        checkAd(videoPlayerElement);
    });
}

function checkAd(videoPlayerElement) {
    let videos = document.querySelectorAll("video");
    if (videoPlayerElement.classList.contains("ad-showing")) {
        console.log("##### find ad");
        // 広告っぽい
        videos.forEach(function (elem) {
            elem.playbackRate = 16.0;
        });
        document.getElementsByClassName("ytp-ad-skip-button-modern")[0].click()
    }
    else {
        console.log("##### not find ad");
        // 広告じゃないっぽい
        videos.forEach(function (elem) {
            elem.playbackRate = 1.0;
        });
    }
}

setTimeout(startObserve, "1000");
