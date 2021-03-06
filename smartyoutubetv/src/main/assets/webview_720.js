// hide ugly bg that appears on few seconds before the video
function hideShowPlayerBackground() {
    console.log("webview_720.js: hideShowPlayerBackground()");
    var callbackSet = 'data-callbackSet';

    var player = document.getElementsByTagName('video')[0];
    if (!player) {
        console.log("webview_720.js: player not exist... do nothing...");
        return;
    }

    if (player.getAttribute(callbackSet)) {
        console.log("webview_720.js: callback already set");
        return;
    }

    function startPlayer() {
        // not helpful, at this point player already visible
        // hide (!) player in *.css files instead
        player.play();
        console.log("webview_720.js: startPlayer()");
    }

    function showPlayer() {
        player.style['-webkit-filter'] = 'brightness(1)';
        console.log("webview_720.js: showPlayer()");
    }

    function hidePlayer() {
        player.style['-webkit-filter'] = 'brightness(0)';
        console.log("webview_720.js: hidePlayer()");
    }

    hidePlayer();
    startPlayer();

    player.addEventListener('loadstart', startPlayer, false); // start loading
    player.addEventListener('loadeddata', showPlayer, false); // finished loading
    //player.addEventListener('load', showPlayer, false); // finished loading
    player.addEventListener('abort', hidePlayer, false); // video closed

    player.setAttribute(callbackSet, true);
}

function init() {
    delayUntilPlayerBeInitialized(hideShowPlayerBackground);
}

function waitTillInit(modName, callback, depName) {
    if (window[modName] === 'ok') {
        console.log(modName + ': module already initialized');
        return;
    }

    window[modName] = 'ok';

    if (window[depName] || !depName) {
        console.log(modName + ': all deps initialized. perform callback');
        callback();
        return;
    }

    var interval = setInterval(function() {
        console.log(modName + ': check that all deps are initialized');
        if (window[depName]) {
            console.log(modName + ': all deps initialized. perform callback');
            callback();
            clearInterval(interval);
        }
    }, 100);
}

waitTillInit('webview_720.js', init, 'common.js');