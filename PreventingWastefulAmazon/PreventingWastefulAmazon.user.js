// ==UserScript==
// @name         Preventing Wasteful Spending in Amazon
// @namespace    http://tampermonkey.net/
// @version      2024.05a
// @description  try to take over the world!
// @author       Dora F.
// @match        https://www.amazon.co.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.co.jp
// @grant        none
// ==/UserScript==



(function() {
    'use strict';
    let alertMessage = '<div class="a-box a-alert a-alert-info a-spacing-small" aria-live="polite" aria-atomic="true"><div class="a-box-inner a-alert-container"><h4 class="a-alert-heading">購入確認</h4><i class="a-icon a-icon-alert"></i><div class="a-alert-content"><div data-messageid="unattendedDelivery"><span class="break-word">その買い物、本当に必要ですか？</span><input type="hidden" name="purchaseLevelMessageIds" value="unattendedDelivery"></div></div></div></div>'

    let buynow = document.getElementById("buyNow_feature_div");
    if(buynow) {
        buynow.remove();
    }

    let shipaddress = document.getElementById("shipaddress");
    if(shipaddress) {
        shipaddress.insertAdjacentHTML("beforebegin", alertMessage);
    }
    // Your code here...
})();
