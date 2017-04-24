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
	// stip: Harold
		// var Stip = setAttribute('style', "background: url('http://i.imgur.com/bmSxYMe.jpg') no-repeat center !important; background-size:cover !important;");
		var customImage = [];
		customImage.push({title: "Stip",imgSrc: "http://i.imgur.com/bmSxYMe.jpg"});
		customImage.push({title: "Customer Insights [YP5554]",imgSrc: "https://v.cdn.vine.co/r/avatars/39399A97BA1250030062645268480_487b23a67e4.0.0.jpg?versionId=YewNDyEEsSsRfGTxDLL8kIYDjpgHDaKn"});
		customImage.push({title: "Ethiek [YP5548]",imgSrc: "http://img3.rnkr-static.com/list_img_v2/18239/338239/full/the-very-best-of-the-good-guy-greg-meme.jpg"});
		customImage.push({title: "Data Distribution [YP5549]",imgSrc: "http://az616578.vo.msecnd.net/files/2016/07/25/636050669175340572-1348210504_first-world-problems-girl-cover.jpg"});
		// customImage.push({title: "Customer Insights [YP5554]",imgSrc: "http://wearenative.in/wp-content/uploads/2014/07/badluckbrian.jpg"});
		customImage.push({title: "Customer Insights [YP5554]",imgSrc: "http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg"});

http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg
		customImage.push({title: "TM - Internationalisering voor uitgaande studenten",imgSrc: "http://66.media.tumblr.com/tumblr_louyk924IY1ql8u6ro1_400.gif"});
		customImage.push({title: "Professional Certification [YP5528]",imgSrc: "http://static6.businessinsider.com/image/55918b77ecad04a3465a0a63/nbc-fires-donald-trump-after-he-calls-mexicans-rapists-and-drug-runners.jpg"});
	customImage.push({title: "Database Administration [YP5213]",imgSrc: "https://media.giphy.com/media/14ru6pqZPExCNO/giphy.gif"});
	// customImage.push({title: "Database Administration [YP5213]",imgSrc: "https://imgflip.com/s/meme/The-Most-Interesting-Man-In-The-World.jpg"});
		customImage.push({title: "BI roadmap [YP5551]",imgSrc: "https://imgflip.com/s/meme/One-Does-Not-Simply.jpg"});
		customImage.push({title: "Performance Management [YP5367]",imgSrc: "https://ohhoneyno1.files.wordpress.com/2011/05/sleeping_dude.jpg"});
		customImage.push({title: "Customer",imgSrc: "http://www.telikin.com/blog/images/shocked_senior_computer_user.jpg"});
		customImage.push({title: "Zelfstudiepakket informatievaardigheden",imgSrc: "http://www.telikin.com/blog/images/shocked_senior_computer_user.jpg"});
		customImage.push({title: "Thomas More en KU Leuven komen samen op tegen Kanker",imgSrc: "http://funnyworldonline.com/wp-content/uploads/2016/03/SEVERITY-OF-DEAFNESS.jpg"});
		customImage.push({title: "Studentenparticipatie",imgSrc: "https://media.tenor.co/images/929d51c854381bfc82a61628d7673c6e/tenor.gif"});
		customImage.push({title: "Stage [YP5550]",imgSrc: "http://66.media.tumblr.com/ee17802799382c0568dc3b48a98c40ba/tumblr_mkeqj7gKNe1qjemo2o1_500.gif"});
		customImage.push({title: "*** Studentenvalven IM",imgSrc: "http://reactiongifs.me/wp-content/uploads/2013/08/working-hard.gif"});
		customImage.push({title: "Eindproject [YP5511]",imgSrc: "http://img.allw.mn/content/fi/jo/sy4vs2e25624077420189466020855.gif"});
		customImage.push({title: "Professional Certification [YP5528]",imgSrc: "https://66.media.tumblr.com/e2cb46eaaa37b72a26ec27d632767aab/tumblr_mncxazxIu71sqw0fjo1_400.gif"});




		// customImage.push({title: "Customer",imgSrc: ""});


// Asian girlfriend friender
// Verspreiden en geld verdienen met dit script

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
		".wrapper { //background-image: url('http://i.imgur.com/25b2WZ3.jpg');}" +
		"// body {background-color: #5f5f5f;}");
};
