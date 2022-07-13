function loadJSON() {
    $.getJSON( "data.json", 
        function( dataReturned ) {
            barGraph( dataReturned );
        }
    );
}

// 2. render bar chart into canvas
function barGraph(data) {
    //console.log(data);
    
    // get ref to html canvas element
    var canvas1 = document.getElementById('chart1');
    // get ref to 2d drawing context inside the canvas
    var context1 = canvas1.getContext('2d');
    
    // now we can establish some useful values
    var startX = canvas1.width;
    //console.log("startX= " + startX);
    var bottomY = canvas1.height;
    //console.log("bottomY= " + bottomY);

    var maxVal = getMax(data);
    var scaleY = bottomY / maxVal;
    console.log("scaleY= " + scaleY);
    console.log("maxVal= " + maxVal);

    var scaleX = startX / (data.length);
    var i, height, lastX = 0;
    
    // axis + scale lines
    for (i=0; i <= maxVal; i = i + maxVal / 10) {
        context1.beginPath();
        context1.moveTo(0, i * scaleY);
        context1.lineTo(startX, i * scaleY);
        context1.strokeStyle="darkgray";
        context1.stroke();
        
        /*
        // draw text for each axis scale line
        context1.fillStyle = "darkgray";
        context1.font = "bold 24px Arial";
        context1.fillText( Math.round(maxVal - i), 0, (i*scaleY) - 10);*/
    }
    
    // Draw Scaled Rectangles/Bars
    for ( i=0; i < data.length; i++) {
        // set fill color
        context1.fillStyle = data[i].color;
        context1.globalAlpha = 0.7;
        // calc height of rect using scale
        height = data[i].val * scaleY;
        // draw rect
        context1.fillRect( lastX, bottomY - height, scaleX, height );
        //stroke
        context1.strokeStyle = "black";
        context1.strokeRect(lastX, bottomY - height, scaleX, height);
        

        // draw text for each bar
        context1.fillStyle = "black";
        context1.font = "12px Arial";
        context1.fillText( data[i].country, lastX, bottomY);

        lastX += scaleX;
    }

    //text for scale lines
    for (i=0; i <= maxVal; i = i + maxVal / 10) {
        context1.fillStyle = "indianred";
        context1.font = "bold 18px Courier New";
        context1.fillText( Math.round(maxVal - i), 0, (i*scaleY) - 10);
    }

}

// 3. loops thru json array and finds biggest val property value
function getMax(data) {
    var max = 0;
    for (var i=0; i < data.length; i++) {
        if ( data[i].val > max ) {
            max = data[i].val;
        }
    }
    return max;
}