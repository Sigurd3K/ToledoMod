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
	console.log("Patattenstoemp suckt");
	for (i=0; i<imageContainer.length; i++)
	{
		imageContainer[i].parentNode.removeChild(imageContainer[i]);
		console.log("Lalalalallalala");
	}

	var newDiv = [];
	newDivNumber = 0;
	/*
		CUSTOM DIVS
	 */
	// stip: Harold
		// var Stip = setAttribute('style', "background: url('http://i.imgur.com/bmSxYMe.jpg') no-repeat center !important; background-size:cover !important;");
		var customImage = [];
		customImage.push({title: "Stip",imgSrc: "http://www.haroldburson.com/images/gallery/slide5.jpg"});
		customImage.push({title: "Customer Insights [YP5554]",imgSrc: "https://v.cdn.vine.co/r/avatars/39399A97BA1250030062645268480_487b23a67e4.0.0.jpg?versionId=YewNDyEEsSsRfGTxDLL8kIYDjpgHDaKn"});
		console.log("ArrayLenght: "+ customImage.length);
			// {title: "Stip",imgSrc: "http://i.imgur.com/bmSxYMe.jpg"},
			// {title: "Customer Insights",imgSrc: "http://i.imgur.com/bmSxYMe.jpg"}
	// end of custom IMAGES


	var imageDiv = document.createElement('div');
	imageDiv.innerHTML = "Testosch";
	imageDiv.setAttribute('class', 'image-container ng-scope');
	imageDiv.setAttribute('style', "background: url('http://i.imgur.com/bmSxYMe.jpg') no-repeat center !important; background-size:cover !important;");
	// imageDiv.setAttribute('style', "background-size:cover !important;");

	var imgs = document.getElementsByClassName('tol-tile-link');
	console.log(imgs.length);
	console.log("Patattenstoemp suckt");

	for (i=0; i<imgs.length; i++)
	{
		title = imgs[i].getElementsByClassName("ng-binding")[0].innerHTML;
		var originalChilds = imgs[i].innerHTML;
		console.log("Length customImage in for loop: "+customImage.length);


		imgs[i].innerHTML = "";
		imgs[i].appendChild(imageDiv.cloneNode());
		for (var imgLoop = 0; imgLoop < customImage.length; imgLoop++) {
			console.log(customImage[imgLoop]);
			if (customImage[imgLoop].title == title) {
				console.log("FirstChild"+imgs[i].firstChild);
				styleString = "background: url('" +
				customImage[imgLoop].imgSrc +
				"') no-repeat center !important; background-size:cover !important;";

				imgs[i].children[0].setAttribute('style', styleString);
			}
		}
		imgs[i].innerHTML += originalChilds;
		console.log("imgs["+i+"]");
		console.log(title);
		newDivNumber++;
	}

	console.log("Greasemonkey Toledomod is running");

	GM_addStyle(
		".wrapper { //background-image: url('http://i.imgur.com/25b2WZ3.jpg');}" +
		"body {background-color: #5f5f5f;}");
};
