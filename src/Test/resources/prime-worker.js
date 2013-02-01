importScripts("prime.js");
addEventListener('message', function(e) {
	var msg;
	
	if(isPrime(e.data)) {
		msg = e.data + " is a prime number";
	} else {
		msg = e.data + " is NOT a prime number";
	}
	
	postMessage(msg);
}, false);