(function() {
    var k = document.getElementsByClassName("kitty");
    var current = 0; // the index of current kitty.
    var dot = document.getElementsByClassName("dot");
    var currentlyTransitioning;
    var timer;

    timer = setTimeout(slider, 2000);

    function slider(arg) {
        currentlyTransitioning = true;
        // Remove onscreen class of current Kitty
        k[current].classList.remove("onscreen");
        dot[current].classList.remove("active");
        // Add exit class to it
        k[current].classList.add("exit");

        // reset the current variable to the NEW current Kitty
        if (typeof arg != "undefined") {
            current = arg;
        } else {
            current++;
            if (current >= k.length) {
                current = 0;
            }
        }

        // Know when a user clicks on a dot
        for (var i = 0; i < dot.length; i++) {
            // Figure out the index of the dot.
            dot[i].addEventListener("click", getClickHandler(i));
        }

        // We want to show the selected Kitty
        k[current].classList.add("onscreen");
        // Restart animation from current kitty.

        // add the onscreen class to the NEW current kitty.
        k[current].classList.add("onscreen");
        dot[current].classList.add("active");
    }

    function getClickHandler(n) {
        // When clicked, we want to cancel the animation
        return function() {
            if (currentlyTransitioning == true) {
                return;
            }
            if (n == current) {
                return;
            } else {
                clearTimeout(timer);
            }
            slider(n);
        };
    }

    // Remove from exit stack.
    for (var i = 0; i < k.length; i++) {
        k[i].addEventListener("transitionend", function(e) {
            currentlyTransitioning = false;
            if (e.target.classList.contains("exit")) {
                e.target.classList.remove("exit");
                timer = setTimeout(slider, 2000);
            }
        });
    }

    ////// TOUCH ///////
    var touchStart = 0;
    var touchEnd = 0;

    document.addEventListener("touchstart", getTouchStart, false);
    document.addEventListener("touchend", getTouchEnd, false);

    // k.addEventListener("touchmove", handleMove, false);

    function getTouchStart(evt) {
        console.log("Start: ", evt.touches[0].pageY);
        var touchStart = evt.touches[0].pageY;
        console.log("-touchStart: ", touchStart);
    }

    function getTouchEnd(evt) {
        console.log("End: ", evt.changedTouches[0].pageY);
        var touchEnd = evt.changedTouches[0].pageY;
        console.log("-touchEnd: ", touchEnd);
    }

    if (touchStart > touchEnd) {
        console.log("Greater");
    }
})();
