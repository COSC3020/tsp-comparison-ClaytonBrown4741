timerFunction()

function randomMatrixGenerator(seedSize){
	var matrix=[]
	for (var i=0; i < seedSize; i++){
		matrix[i] = [];
                for (var j=0; j < seedSize; j++){
			if ( j == i){
				matrix[i][j]=0
			}
			else if (j+1==i)
				matrix[i][j]=1
			else{
                        	matrix[i][j]= Math.floor(Math.random() * seedSize);
				if (matrix[i][j] <= 0){
					matrix[i][j]=1
				}
			}
                }
        }
	return matrix
}


function timerFunction(){
	var difference1=0
	var difference2=0
	var seedCounter=1
	var result1=0
	var result2=0
	var graph = [] //randomMatrixGenerator(seedCounter)
	while (difference1 <= 3000 && difference2 <= 3000){
		graph = randomMatrixGenerator(seedCounter)
		var start1 = Date.now()
                result1=tsp_hk(graph)
                var end1 = Date.now()
		var start2 = Date.now()
		result2=tsp_ls(graph)
		var end2 = Date.now()
		difference1=(end1-start1)
		difference2=(end2-start2)
		seedCounter=seedCounter+1

		console.log("For a matrix with a size of " + JSON.stringify(seedCounter-1) + ":")
		console.log("Held Karp: " + difference1/1000 + " | Distance Length: " + result1)
		console.log("Local Search: " + difference2/1000 + " | Distance Length: " + result2)
		if (result2 < result1){
			console.log("WARNING: LOCAL SEARCH HAS BETTER ANSWER THAN HELD KARP. ERROR HAS OCCURED")
		}
		console.log("\n\n")
		//console.log(difference1)
		//console.log(difference2)
	}
}


function tsp_ls(distances){
	var previousFirstIndex=-1
	var previousSecondIndex=-1
	var firstIndex=0
	var secondIndex=0
	var repeatCounter=0
	var buffer=0;
	var bufferRoute=[]
	var length=distances.length;
	var shortestLength=Infinity
	var currentLength=-1
	var firstIteration=true
	if (length < 2){
		return 0
	}
	var route = Object.keys(distances)
	var numOfIterations=length*length

	for (var i = 0; i < numOfIterations; i++){
		if (firstIteration==false){
			previousFirstIndex=firstIndex
			previousSecondIndex=secondIndex
		}
		firstIndex = Math.floor(Math.random() * length);
		secondIndex = Math.floor(Math.random() * length);
		while ((firstIndex==secondIndex || (firstIndex==previousFirstIndex && secondIndex==previousSecondIndex)) && repeatCounter <= 10){
			secondIndex = Math.floor(Math.random() * length);
			//console.log("repeating value")
			repeatCounter=repeatCounter+1
		}
		
		if (firstIndex > secondIndex){
		        buffer=firstIndex
			firstIndex=secondIndex
			secondIndex=buffer
		}
		//console.log(route)
		//console.log(firstIndex)
		//console.log(secondIndex)
		bufferRoute=optSwap(route, firstIndex, secondIndex)
		currentLength=0
		for (var j = 0; j < bufferRoute.length-1; j++){
			currentLength = currentLength + distances[bufferRoute[j]][bufferRoute[j+1]]
		}
		//currentLength += distances[bufferRoute[bufferRoute.length - 1]][bufferRoute[0]];
		if (currentLength < shortestLength){
			//console.log("SHORTEST IS:")
			//console.log(currentLength)
			shortestLength=currentLength
		}
		route=bufferRoute
		firstIteration=false
	}
	return shortestLength
	
}

function optSwap(route, i, k){
	var newRoute=route

	var firstThird=newRoute.slice(0,i)
	var secondThird=newRoute.slice(i,k+1)
	var finalThird=newRoute.slice(k+1,newRoute.length)
	newRoute=firstThird.concat(secondThird.reverse())
	newRoute=newRoute.concat(finalThird)
	return newRoute

}


//var cache={}
function tsp_hk(distance_matrix) {
	var cache={}
	//cache.splice(0,cache.length)
	var nodesLeft = [];
	var minimumValue = Infinity
	var bufferVar=-1
 	if(distance_matrix.length < 2) {
        	return 0;
    	}
	cities=Object.keys(distance_matrix)
        for(var i = 0; i < distance_matrix.length; i++){
            	//bufferVar = tsp_HeldKarp(distance_matrix, i, cities)
		bufferVar=tsp_HeldKarp(distance_matrix, i, cities, cache)
		if (bufferVar < minimumValue)
                	minimumValue = bufferVar
    	}
    	return minimumValue
}


function tsp_HeldKarp(distances, start, cities, cache)
{
	var key = JSON.stringify(cities) + start
	if (cache[key] === undefined){
		cache[key] = {};
	}
        else{ 
		return cache[key];
	}

    	if (cities.length <= 1)
    	{
        	cache[key] = distances[start][cities[0]]
        	return distances[start][cities[0]];
    	}
    	else
    	{
        	var minimumDistance = Infinity;

        	for (var i = 0; i < cities.length; i++)
        	{
            		var newCities = cities.filter(city => city != start)
            		var sumDist = distances[start][cities[i]] + tsp_HeldKarp(distances, cities[i], newCities, cache);
			if (sumDist < minimumDistance){
				minimumDistance=sumDist
			}
        	}

        	cache[key] = minimumDistance;
        	return minimumDistance;
    	}
}
