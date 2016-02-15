function displayGrid() { //Test method to visualize generation of the grid.
    var maxWidth = document.getElementById('width').value;
    var maxHeight = document.getElementById('height').value;
    var grid = createGrid(maxWidth,maxHeight);
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

function createGrid (maxGridWidth, maxGridHeight) {
        var grid = [];
        var nextRowFilled = [];
        var curCoord;
        var y = 0;
        var x = 0;
        
        while(y < maxGridHeight) {
            x = 0;
            nextRowFilled[y] = [];
            while(x < maxGridWidth) {
                var width = Math.ceil(Math.random() * 2);
                var height = Math.ceil(Math.random() * 2);
                 
                if(height === 2 && width === 1) {
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