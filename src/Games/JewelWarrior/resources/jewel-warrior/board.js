jewel.board = (function() {
	var opts,
		jewels,
		cols,
		rows,
		baseScore,
		numJewelTypes;
		
	// initialize board game
	function initialize(callback) {
		opts = jewel.settings;
		numJewelTypes = opts.numJewelTypes;
		baseScore = opts.baseScore;
		cols = opts.cols;
		rows = opts.rows;
		fillBoard();
		if (callback && typeof(callback) === 'function') {		
			callback();
		}
	} 
	
	// prints the row info on console
	function print() {
		var str = "";
		for (var y = 0; y < rows; y++) {
			for (var x = 0; x < cols; x++) {
				str += getJewel(x, y) + " ";
			} 
			str += "\r\n";
		} 
		console.log(str);
	}
	
	// fills the game grid with jewels
	function fillBoard() {
		var x, y,
			jewelType;
		
		jewels = [];
		
		// looping thru all the cols
		for (x = 0; x < cols; x++) {
			jewels[x] = [];
			// looping thru all the rows
			for(y = 0; y < rows; y++) {
				// picks the random jewel for the [y,x] cell
				jewelType = randomJewel();
				
				// check that same jewels are not place together
				while (jewelType === getJewel(x-1, y) ||
					jewelType === getJewel(x-2, y) ||
					jewelType === getJewel(x, y-1) ||
					jewelType === getJewel(x, y-2)) {
						jewelType = randomJewel();
					}
					
				jewels[x][y] = jewelType
			}
		}
		
		// recursive fill if the new board has no moves
		if (!hasMoves()) {
			fillBoard();
		}
	}
	
	// get the jewel from the given cell
	function getJewel(x, y) {
		if (x < 0 || x > cols -1 || y < 0 || y > rows -1) {
			return -1;
		}
		
		return jewels[x][y]
	}
	
	// picks a random jewel
	function randomJewel() {
		return Math.floor(Math.random() * numJewelTypes);
	}
	
	// returns the number of jewels in the longest chain that includes (x, y)
	function checkChain(x, y) {
		var jewelType = getJewel(x, y),
			left = 0, 
			right = 0,
			up = 0,
			down = 0,
			leftUp = 0, 
			leftDown = 0,
			rightUp = 0,
			rightDown = 0;
			
			// look right
			while (jewelType === getJewel(x + right + 1, y)) {
				right++;
			}
			
			// look left
			while (jewelType === getJewel(x - left - 1, y)) {
				left++;
			}
			
			// look up
			while (jewelType === getJewel(x, y - up - 1)) {
				up++;
			}
			
			// look down
			while (jewelType === getJewel(x, y + down + 1)) {
				down++;
			}
			
			// look left up
			while (jewelType === getJewel(x - leftUp - 1, y - leftUp - 1)) {
				leftUp++;
			}
			
			// look left down
			while (jewelType === getJewel(x - leftDown - 1, y + leftDown + 1)) {
				leftDown++;
			}
			
			// look right up
			while (jewelType === getJewel(x + rightUp + 1, y - rightUp - 1)) {
				rightUp++;
			}
			
			// look right down
			while (jewelType === getJewel(x + rightDown + 1, y + rightDown + 1)) {
				rightDown++;
			}
						
			// returns the number of jewels in the chain
			return Math.max(left + 1 + right, up + 1 + down, leftUp + 1 + rightDown, leftDown + 1 + rightUp);
	}
	
	// returns true if (x1, y1) is adjacent to (x2, y2)
	function isAdjacent(x1, y1, x2, y2) {
		var dx = Math.abs(x1-x2),
			dy = Math.abs(y1-y2);
			
		return (dx + dy === 1);
	}
	
	// return true if (x1,y1) can be swapped with (x2,y2) to form a new match
	function canSwap(x1, y1, x2, y2) {
		var jewelType1 = getJewel(x1, y1),
			jewelType2 = getJewel(x2, y2),
			chain;
			
			if (!isAdjacent(x1, y1, x2, y2)) {
				return false;
			}
			
			// temp swap jewels
			jewels[x1][y1] = jewelType2;
			jewels[x2][y2] = jewelType1;
			
			chain = (checkChain(x2,y2) > 2 || checkChain(x1, y1) > 2);
			
			// swap back to original
			jewels[x1][y1] = jewelType1;
			jewels[x2][y2] = jewelType2;
			
			return chain;
	}
	
	// return the 2 dimension array with chain information
	function getChains() {
		var x, y,
			chains = [];
			
		for (x = 0; x < cols; x++) {
			chains[x] = [];
			
			for (y = 0; y < rows; y++) {
				chains[x][y] = checkChain(x, y);
			}
		}
		
		return chains
	}
	
	function check(e) {
		var chains = getChains(),
			hasChains = false, 
			score = 0,
			removed = [],
			moved = [],
			gaps = [];
			
		// looping thru cols
		for (var x = 0; x < cols; x++) {
			gaps[x] = 0;
			
			// looping thru rows, moving jewel down to the empty cells
			for (var y = rows-1; y >= 0; y--) {
				// check cell has valid chain
				// if count of chained jewels is more then 2
				if (chains[x][y] > 2) {
					hasChains = true;
					// increment the gap count to indicate how many row it going to move
					gaps[x]++;
					// store the current info
					removed.pushed({
						x: x, y: y, jewelType: getJewel(x, y)
					});
					// add points to score
					score += baseScore * Math.pow(2, (chains[x][y] - 3));
				} else if (gaps[x] > 0) {
					// moving jewels down in the row cells
					moved.push({
						toX: x, toY: y + gaps[x],
						fromX: x, fromY: y,
						jewelType: getJewel(x, y)
					});
					jewels[x][y + gaps[x]] = getJewel(x,y);
				}
			}
			
			// fill new jewels on the top
			for (y = 0; y < gaps[x]; y++) {
				// creating new random jewels
				jewels[x][y] = randomJewel();
				// inserting it into list of jewels moved.
				moved.push({
					toX: x, toY: y,
					fromX: x, fromY: y - gaps[x],
					jewelType: jewels[x][y]
				});
			}
		}
		
		// checks itself for chained jewels
		e = e || [];
		if (hadChains) {
			e.pushed({
					type: 'remove',
					data: removed
				}, {
					type: 'score',
					data: score
				}, {
					type: 'moved',
					data: moved
				});
				
			// refill if no more moves available	
			if (!hasMoves()) {
				fillBoard();
				e.pushed({
						type: 'refill',
						data: getBoard()
					});			
			}
			return check(e)
		} else {
			return e;
		}
	}
	
	//returns true if one match can be made
	function hasMoves() {
		for (var x = 0; x < cols; x++) {
			for (var y = 0; y < rows; y++) {
				if(canJewelMove(x, y)) {
					return true;
				} else  {
					return false;
				}
			}
		}
	}
	
	// return true id (x, y) is a valid postion and if the jewel at (x, y) can be swapped with a neighor
	function canJewelMove(x, y) {
		return ((x > 0 && canSwap(x, y, x-1, y)) || // checking left
			(x < cols -1 && canSwap(x, y, x+1, y)) || // checking right
			(y > 0 && canSwap(x, y, x , y-1)) || // checking up
			(y < rows -1 && canSwap(x, y, x, y+1)) || // checking down
			(x > 0 && y > 0 && canSwap(x, y, x-1, y-1)) || // checking left up
			(x > 0 && y < rows -1 && canSwap(x, y, x-1, y+1)) || // checking left down
			(x < cols -1 && y > 0 && canSwap(x, y, x+1 , y-1)) || // checking right up
			(x < cols -1 && y < rows -1 && canSwap(x, y, x+1, y+1)));
	}
	
	// creates a copy of jewel board
	function getBoard() {
		var copy = [],
			x;
			
		for (x = 0; x < cols; x++) {
			copy[x] = jewels[x].slice(0);
		}
		
		return copy;
	}
	
	// if possible, swaps (x1,y1) and (x2,y2) and calls the callback function with list of board events
	function swap(x1, y1, x2, y2, callback) {
		var tmp,
			events;
			
		if (canSwap(x1, y1, x2, y2)) {
			//swap the jewels
			tmp = getJewel(x1, y1);
			jewels[x1][y1] = getJewels(x2, y2);
			jewels[x2][y2] = tmp;
			
			// check the board and get list of events
			events = check();
			callback(events);
		} else {
			callback(false);
		}
	}
	
	// exposed public methods
	return {
		initialize: initialize,
		swap: swap,
		canSwap: canSwap,
		getBoard: getBoard,
		print: print
	};
})();