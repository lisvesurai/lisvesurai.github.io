function selectNav(el) {
    document.getElementById("nav-toggle").checked = false;
    document.getElementById("main").classList.remove("home");
    var temp = el.parentNode;
    var i;
    for (i = 0; i < temp.children.length; i++) {
        temp.children[i].classList.remove("active");
    }
    el.classList.add("active");
    getDogPhotos("https://dog.ceo/api/breeds/image/random/3", true);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDogPhotos(apiURL, captions) {
    const app = document.getElementById("main");
    if (app.contains(document.getElementById("img-container"))) {
        document.getElementById("img-container").remove();
    }
    if (app.contains(document.getElementById("error-message"))) {
        document.getElementById("error-message").remove();
    }
    const container = document.createElement("div");
    container.setAttribute("id", "img-container");
    app.appendChild(container);
    var request = new XMLHttpRequest();
    request.open("GET", apiURL, true);
    request.onload = function() {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.message.forEach((image) => {
                const figure = document.createElement("figure");
                const img = document.createElement("div");
                img.setAttribute("class", "img");
                img.style.backgroundImage = "url('" + image + "')";
                container.appendChild(figure);
                figure.appendChild(img);
                if (captions) {
                    const figcaption = document.createElement("figcaption");
                    var path = image.split("/");
                    var path2 = path[4].split("-");
                    var breedname = "";
                    if (path2.length > 1) {
                        breedname = path2[1] + " " + path2[0];
                    } else {
                        breedname = path2[0]
                    }
                    figcaption.innerHTML = "I'm a <strong>" + breedname + "</strong>";
                    figure.appendChild(figcaption);
                } else {

                  figure.style.transform = "rotate(" + randomIntFromInterval(-30, 30) + "deg)";
                }
            })
        } else {
            const errorMessage = document.createElement("marquee");
            errorMessage.setAttribute("id", "error-message");
            errorMessage.textContent = "Gah, it's not working!";
            app.appendChild(errorMessage);
        }
    }
    request.send();
}

function ready(callback) {
    // in case the document is already rendered
    if (document.readyState != "loading") callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener("DOMContentLoaded", callback);
    // IE <= 8
    else document.attachEvent("onreadystatechange", function() {
        if (document.readyState == "complete") callback();
    });
}

ready(function() {
    getDogPhotos("https://dog.ceo/api/breeds/image/random/20", false);
});