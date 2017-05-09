// ==UserScript==
// @name        Toledomod
// @namespace   toledomod
// @description Enhance Toledo
// @include     *toledo.kuleuven.be/portal*
// @version     1.1.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		ToledomodSettings.js
// @require		StyleChanger.js
// @grant       GM_addStyle
// ==/UserScript==

var itemLength = 0;
var loopCount = 0;
var loop = [];


var checkExist = setInterval(function() {
	// Wachten tot al die div's zijn, pagina is niet volledig en wordt bijna voledig door Javascript opgebouwd.
	// De AngularJS van Toledo geeft vertraging bij het laden van de pagina.

	loopCount++;
	loop[loopCount] = $('.tol-tile-link').length;

	// TODO: Look for a beter algorithm to check if count is still increasing
	if ($('.tol-tile-link').length>0 && loop[loopCount] == loop[loopCount-1] && loop[loopCount] == loop[loopCount-2]) {
		clearInterval(checkExist);
		console.log("LOOPS: "+loop[loopCount]+ " " +
					loop[loopCount-1]+ " " +
					loop[loopCount-2]);
		main();
	}
	else {
	console.log("Does not yet exist");
	}
}, 200);


var main = function(){
	replaceImageDivs();
	console.log("Replimdiv done");
	ChangeStyle();
	console.log("Changestyle done");
};

var replaceImageDivs = function(){
	// Replace the covers of the courses with our own covers+
	console.log("replaceImageDivs() function");
	var imageContainers = document.getElementsByClassName('image-container');

	console.log(imageContainers.length);
	for (i=0; i<imageContainers.length; i++)
	{
		imageContainers[i].parentNode.removeChild(imageContainers[i]); // Remove every image container, to remove any preexisting content
		console.log("LOG: Remove Existing imageContainer");
	}

	// Build new image div and give it attributes
	var imageDiv = document.createElement('div');
	imageDiv.innerHTML = "Testosch";
	imageDiv.setAttribute('class', 'image-container ng-scope');
	imageDiv.setAttribute('style', "background: url('http://i.imgur.com/l3EvrGJ.jpg') no-repeat center !important; background-size:cover !important;");

	// List the tiles of the courses on the main page, so we can use futher query selectors on it in our loop.
	var imgs = document.getElementsByClassName('tol-tile-link');
	console.log(imgs.length);
	console.log(imgs);

	for (i=0; i<imgs.length; i++)
	{
		console.log("Looper imgs length");
		// Get the titles from inside our course tiles so we can link each name to a particular image we chose to use as the cover for that course.
		title = imgs[i].getElementsByClassName("ng-binding")[0].innerHTML;
		var originalChilds = imgs[i].innerHTML; // Save other stuff in the tile so we can put our new imagediv in front of it and them add the original content after that.

		imgs[i].innerHTML = ""; // Empty the course tile
		imgs[i].appendChild(imageDiv.cloneNode()); // Put the new cover in the tile

		// Look for images in the customImage object, see if it is the same title as in the tile; if so, put them in that place.
		for (var imgLoop = 0; imgLoop < customImage.length; imgLoop++) {
			if (customImage[imgLoop].title == title) {
				styleString = "background: url('" +
				customImage[imgLoop].imgSrc +
				"') no-repeat center !important; background-size:cover !important;";

				imgs[i].children[0].setAttribute('style', styleString); // Add attributes the the node we cloned above.
			}
		}
		imgs[i].innerHTML += originalChilds; // Add the original content again, after the new cover.
	}
};
