// ==UserScript==
// @name        Toledomod
// @namespace   toledomod
// @description Enhance Toledo
// @include     *toledo.kuleuven.be/portal*
// @version     1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
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
	/*
		CUSTOM DIVS
	 */

		var customImage = [];
		customImage.push({title: "Stip",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Customer Insights [YP5554]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Ethiek [YP5548]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Data Distribution [YP5549]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Customer Insights [YP5554]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "TM - Internationalisering voor uitgaande studenten",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Professional Certification [YP5528]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
	customImage.push({title: "Database Administration [YP5213]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "BI roadmap [YP5551]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Performance Management [YP5367]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Customer",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Zelfstudiepakket informatievaardigheden",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Thomas More en KU Leuven komen samen op tegen Kanker",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Studentenparticipatie",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Stage [YP5550]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "*** Studentenvalven IM",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Eindproject [YP5511]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		customImage.push({title: "Professional Certification [YP5528]",imgSrc: "http://i.imgur.com/l3EvrGJ.jpg"});
		console.log("ArrayLenght: "+ customImage.length);

	// end of custom IMAGES


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
