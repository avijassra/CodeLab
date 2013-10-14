/*!
* jquery.imagePlusify-2.0.js
* jQuery image plusify plugin
* Version 2.0 (25-Feb-2012)
* @requires jQuery v1.6.2 or later
*
* Examples at: http://jassra.com/jquery/imageplusify
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*
*/

Update from jquery.imagePlusify-1.1
In the newer version i have included css animation. Browsers which support css animation will by default use css animation insteat of javascript animation.

New option(s) added in this version is:
1.rotateBy: It accepts int value as angle you want image to rotate by. By default value is 7.

All the available options present in the image plusify plugin

-------------------------------------------------------------------------------------------------------------------------------------------
Options					|			Values						|		Additional Info					
------------------------|---------------------------------------|--------------------------------------------------------------------------
border					| valid css border style				| '1px solid gray' is default value
borderOnMouseOver		| valid css border style 				| '1px solid black' is default value
padding 				| valid css padding size				| '5px' is default value
backgroundColor 		| valid css color 						| '#fff' is default value
displayLabel       		| true / false							| by default its false
labelColor				| valid css color for the text color	| '#000' is default value
randomize				| true / false							| by default its true
margin					| margin between the image albums		| '30px' is the default value
width					| album width							| '200px' is the default width
height					| album height							| '200px' is the default height
slideBy					| int distance by which images should 	| 30 is the default value
						| slide									|
rotateBy				| int angle by which images should 		| 7 is the default value
						| rotate								|
cssAnimationTurnedOn	| true / false							| if you want to use sliding out of images without css animation then it 
						|										| should be turned off. by default its true.
source					| images, name and id as source to 		| source can be sent in 3 ways 
						| display image albums					| 1. Array of string where string is url of images 
						|										| 2. Object with id, name and array of string as members 
						|										| 3. Array of object where object has id, name and array of string as members
onClick					| Callback event raised on click of 	| album id, album name and all images url as array are returned 
						| album									| in the callback function.
					
*******************************************************************************************************************************************