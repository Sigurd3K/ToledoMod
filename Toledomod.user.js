// ==UserScript==
// @name        Toledomod
// @namespace   toledomod
// @description Enhance Toledo
// @include     *toledo.kuleuven.be/portal*
// @version     1.0.5
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		ToledomodSettings.js
// @grant       GM_addStyle
// ==/UserScript==

var itemLength = 0;
var loopCount = 0;
var loop = [];
var checkExist = setInterval(function() {
	// Wachten tot al die div's zijn, pagina is niet volledig en wordt bijna voledig door Javascript opgebouwd
	// AngularJS geeft vertraging

	loopCount++;
	loop[loopCount] = $('.tol-tile-link').length;

	// Look for a beter algorithm to check if count is still increasing
	if ($('.tol-tile-link').length>0 && loop[loopCount] == loop[loopCount-1] && loop[loopCount] == loop[loopCount-2]) {
		clearInterval(checkExist);
		console.log("LOOPS: "+loop[loopCount]+ " " +
					loop[loopCount-1]+ " " +
					loop[loopCount-2]);
		chill();
	}
	else {
	console.log("Does not yet exist");
	}
}, 200);

var chill = function(){
	var imageContainer = document.getElementsByClassName('image-container');

	console.log(imageContainer.length);
	for (i=0; i<imageContainer.length; i++)
	{
		imageContainer[i].parentNode.removeChild(imageContainer[i]);
		console.log("LOG: Remove Existing imageContainer");
	}

	var newDiv = [];
	newDivNumber = 0;

	var imageDiv = document.createElement('div');
	imageDiv.innerHTML = "Testosch";
	imageDiv.setAttribute('class', 'image-container ng-scope');
	imageDiv.setAttribute('style', "background: url('http://i.imgur.com/l3EvrGJ.jpg') no-repeat center !important; background-size:cover !important;");
	// imageDiv.setAttribute('style', "background-size:cover !important;");

	var imgs = document.getElementsByClassName('tol-tile-link');
	console.log(imgs.length);

	for (i=0; i<imgs.length; i++)
	{
		title = imgs[i].getElementsByClassName("ng-binding")[0].innerHTML;
		var originalChilds = imgs[i].innerHTML;
		// console.log("Length customImage in for loop: "+customImage.length);


		imgs[i].innerHTML = "";
		imgs[i].appendChild(imageDiv.cloneNode());
		for (var imgLoop = 0; imgLoop < customImage.length; imgLoop++) {
			// console.log(customImage[imgLoop]);
			if (customImage[imgLoop].title == title) {
				// console.log("FirstChild"+imgs[i].firstChild);
				styleString = "background: url('" +
				customImage[imgLoop].imgSrc +
				"') no-repeat center !important; background-size:cover !important;";

				imgs[i].children[0].setAttribute('style', styleString);
			}
		}
		imgs[i].innerHTML += originalChilds;
		// console.log("imgs["+i+"]");
		console.log(title);
		newDivNumber++;
	}

	console.log("Greasemonkey Toledomod is running");

	GM_addStyle(
		".wrapper { //background-image: url('http://i.imgur.com/l3EvrGJ.jpg');}" +
		"// body {background-color: #5f5f5f;}");
};
