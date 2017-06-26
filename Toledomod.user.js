// ==UserScript==
// @name		Toledomod
// @namespace	toledomod
// @description	Enhance Toledo
// @author		Sigurd3K
// @include		*toledo.kuleuven.be/portal*
// @version		1.5.0
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		ToledomodSettings.js
// @require		StyleChanger.js
// @require		libs/jBox.js
// @resource	jBoxCSS libs/jBox.css
// @resource	form form.html
// @grant		GM_addStyle
// @grant		GM_getResourceText
// @grant		GM_setValue
// @grant		GM_getValue
// ==/UserScript==

var itemLength = 0;
var loopCount = 0;
var loop = [];

var jBoxCSS = GM_getResourceText("jBoxCSS");
GM_addStyle(jBoxCSS);

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
	AddControls();
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

		var titleFromStorage = GM_getValue(title);

		if (titleFromStorage !== undefined){
			styleString = "background: url('" +
			titleFromStorage +
			"') no-repeat center !important; background-size:cover !important;";

			imgs[i].children[0].setAttribute('style', styleString); // Add attributes the the node we cloned above.
		} else {
			// Look for images in the customImage object, see if it is the same title as in the tile; if so, put them in that place.
			for (var imgLoop = 0; imgLoop < customImage.length; imgLoop++) {
				if (customImage[imgLoop].title == title) {
					styleString = "background: url('" +
					customImage[imgLoop].imgSrc +
					"') no-repeat center !important; background-size:cover !important;";

					imgs[i].children[0].setAttribute('style', styleString); // Add attributes the the node we cloned above.
				}
			}
		}

		imgs[i].innerHTML += originalChilds; // Add the original content again, after the new cover.
	}
};

var AddControls = function(){
	console.log("AddControls started");
	var elementos = document.querySelectorAll('.btn-link[title="Information and settings"]');
	console.log(elementos.length);
	console.log("Before listeneder");
	for (var b = 0; b < elementos.length; b++) {
		elementos[b].addEventListener('click', i_And_S_clickHandler, false);
	}


	document.querySelector('#tol-toledo').addEventListener("click", i_And_S_clickHandler, false);
	console.log("AddControls Done");

};

var i_And_S_clickHandler = function(){
	// Clickhandler for the Info and settings button on the bottom right of each tile.
	console.log("Clicked");
	setTimeout(function(){ // Here, We need to wait for AngularJS Again.
		var currentCourseTileFullTitle = document.querySelectorAll('dt'); // Select al dt elements

		for (var xc = 0; xc < currentCourseTileFullTitle.length; xc++) { // Go through all dt elements in order to search for the "Full title" dt.
		if (currentCourseTileFullTitle[xc].innerHTML === "Full title") { // When we have this element, we know de course title is next
			currentCourseTileFullTitle = currentCourseTileFullTitle[xc].nextElementSibling.innerHTML; // Get the course title
			break;
		}
	}
	console.log(currentCourseTileFullTitle);

	imageChanger = function(){
		var imageChangerModal = new jBox('Modal', {
			delayOpen: 500,
			delayClose: 1000,
			width:500,
			height:100,
			title: "Change cover image",
			content: GM_getResourceText("form"),
			closeButton: true
		});

		console.log("Modal Manager");
		imageChangerModal.open();
		var ImageLocSaveBtnPtr = document.getElementById("ImageLocSaveBtn");
		ImageLocSaveBtnPtr.addEventListener('click', imageSaver, false);
		console.log("Modal Manager end");

		function imageSaver(){
			console.log("ImageSaver");
			imageLocation = document.getElementById("imageLocationUrl").value;
			console.log(currentCourseTileFullTitle);
			console.log(imageLocation);
			GM_setValue(currentCourseTileFullTitle, imageLocation); // Save course and image location in local storage
			imageChangerModal.close();
			imageChangerModal.destroy();
			replaceImageDivs();
		}
	};

	// Make a new element: The edit cover image link.
	var li = document.createElement("li");
	var ahref = document.createElement("a");
	ahref.addEventListener('click', imageChanger, false);
	ahref.appendChild(document.createTextNode("Edit cover image"));
	li.appendChild(ahref);

	// Select the li, put it in enrollmentContainer var, append our new element (Edit cover image link)
	var enrollmentContainer = document.querySelector('#tol-enrollment-information').querySelector('li').parentNode;
	enrollmentContainer.appendChild(li);
}, 200);
};
