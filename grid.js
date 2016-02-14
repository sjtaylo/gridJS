function generateGrid() { //Test method to visualize generation of the grid.
    var maxWidth = document.getElementById('width').value;
    var maxHeight = document.getElementById('height').value;
    console.log(maxWidth + ' ' + maxHeight);
    var grid = randomCoordinatesss(maxWidth,maxHeight);
    document.getElementById('grid').innerHTML = '';
    
    for (var i = 0; i < grid.length; i ++) {
        var gridObject = document.createElement("DIV");
           
        gridObject.style.position = 'absolute';
        gridObject.style.height = (grid[i].h * 150 - 3) + 'px';
        gridObject.style.width = (grid[i].w * 150 - 3) + 'px'; 
        gridObject.style.left = (grid[i].x * 150 + 153) + 'px';
        gridObject.style.top = (grid[i].y * 150 + 153) + 'px';
        gridObject.style.backgroundColor = 'red';
        
        document.getElementById('grid').appendChild(gridObject);
    }
}

//Returns array of objects, so calling this.STYLE_8_1 = randomCoordinates()  should give the data
//in the same format that is hard coded. Same method without paragraphs of comments is farther down.
function randomCoordinates () {
        var coords = [];
        var secondRowFilled = [];
        var curCoord;
        var y = 0;
        var x = 0;
        var isValid;
        
        while(y < 2) { //Will loop through by row, filling each column and then moving to next row.
            x = 0;
            while(x < 6) { //Increment through each column.
                var width = Math.ceil(Math.random() * 2); //Generates either a 1 or a 2
                var height = Math.ceil(Math.random() * 2); //Generates either a 1 or a 2               
                
                if(height === 2 && width === 1) {
                    continue; 
                }
                
                //Next check to see if the generated object is too large for the current position
                //And will exceed the bounds of the grid. Only need to check at the edges of the graph
                //(5 for x and 1 for y);
                if(x === 5 && width === 2) {
                    continue;
                }
                else if (y === 1 && height === 2) {
                    continue;
                }
                
                //If we are on second row, then need to check if an object on the first row that is of 
                //height two will interesect with the current object.
                if(y === 1) {
                    var xIsFilled = (secondRowFilled.lastIndexOf((x)) !== -1);
                    var nextXFilled = (secondRowFilled.lastIndexOf((x + width) - 1) !== -1);

                    //The current X coordinate is already filled with an object. Will always want to increment to the next column
                    //in this situation.
                    if(xIsFilled) {
                        x ++;
                        continue;
                    }
                    //For widths of two, we need to check if the spot AFTER our current x coordinate is filled.
                    if(nextXFilled && width === 2) {
                        //If object is width of two, current spot is empty, but next spot is empty, we need to generate
                        //a new shape but NOT increment x which would leave a blank space.
                        continue;
                    }
                }
                
                //This code block will only be reached if none of the previous continue statements for an
                //invalid coordinate object are reached.
                
                //If height is two on the first row, then mark that x coordinate as full for the
                //second row. If the width is two, then the space after the x coordinate needs to
                //be marked full as well.
                if(height === 2 && y === 0) {
                    secondRowFilled.push(x);
                    if(width === 2) {
                        secondRowFilled.push(x+1);
                    }
                }
                    
                curCoord = {x: x, y: y, w: width, h: height};
                coords.push(curCoord);    
                x += width;
            }
            y ++;
        }
        
        return coords;
}

//This version of the method allows you to pass in a max width and max height for the grid
//instead of hardcoding it to 2 and 6. Max size for objects is still hard coded to 2 w and 2h.
function createGrid (maxGridWidth, maxGridHeight) {
        var grid = [];
        var nextRowFilled = [];
        var curCoord;
        var y = 0;
        var x = 0;
        var isValid;
        
        while(y < maxGridHeight) {
            x = 0;
            nextRowFilled[y] = [];
            while(x < maxGridWidth) {
                var width = Math.ceil(Math.random() * 2);
                var height = Math.ceil(Math.random() * 2);
                isValid = true;
                 
                if(height === 2 && width === 1) {
                    isValid = false;
                    continue; 
                }
                
                if(x === (maxGridWidth - 1) && width === 2) {
                    continue;
                }
                else if (y === (maxGridHeight - 1) && height === 2) {
                    continue;
                }
                
                if(y > 0) {
                    var xIsFilled = (nextRowFilled[y-1].lastIndexOf((x)) !== -1);
                    var nextXFilled = (nextRowFilled[y-1].lastIndexOf((x + width) - 1) !== -1);

                    if(xIsFilled) {
                        x ++;
                        continue;
                    }
                    if(nextXFilled && width === 2) {
                        continue;
                    }
                }
                
                if(height === 2) {
                    nextRowFilled[y].push(x);
                    if(width === 2) {
                        nextRowFilled[y].push(x+1);
                    }
                }
                    
                curCoord = {x: x, y: y, w: width, h: height};
                grid.push(curCoord);    
                x += width;
            }
            y ++;
        }
        
        return grid;
}