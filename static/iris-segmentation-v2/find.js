function find(){
  // get points' coodinates
  var points=[]
  var canvas = document.getElementById('iris');
  var context = canvas.getContext('2d');
  for(x=0;x<300;x++){
    for(y=0;y<200;y++){
      var v=context.getImageData(x, y, 1, 1).data[1]
      if(v==255){
        p=[x,y]
        points.push(p);
      }
    }
  }
  // screen through all the points to find the left most point and right most point
  var len=points.length;
  var x_list=[];
  var p_left=[]
  var p_right=[]
  for(var i=0;i<len;i++){
     x_list.push(points[i][0]);
  }
  var x_max=Math.max(...x_list)
  var x_min=Math.min(...x_list)
  var max_index=x_list.indexOf(x_max)
  var min_index=x_list.indexOf(x_min)
  console.log(max_index,min_index);
  p_left.push(points[min_index][0]);
  p_left.push(points[min_index][1]);
  // show the right most point
  p_right.push(points[max_index][0]);
  p_right.push(points[max_index][1]);
  context.fillStyle = "red";
  context.fillRect(p_right[0],p_right[1],3,3)
  //show the left most point
  p_left.push(points[min_index][0]);
  p_left.push(points[min_index][1]);
  context.fillStyle = "red";
  context.fillRect(p_left[0],p_left[1],3,3)

  CIRCLEFIT.resetPoints(); //clear all the points in the CIRCLEFIT
  var points_left=[];
  //screen through all points and get the points that is within 8 pixels right to the left most points
  for(var i=0;i<len;i++){
    if(points[i][0]-p_left[0]<8 && points[i][1]-p_left[1]>0){
      points_left.push(points[i]);
      CIRCLEFIT.addPoint(points[i][0],points[i][1]) //feed the points to the CIRCLEFIT function
    }
  }
  //show the points of left over the canvas
  var len_l=points_left.length;
  for(i=0;i<len_l;i++){
    x=points_left[i][0];
    y=points_left[i][1];
    context.fillRect(x,y,1,1)

  }

  var points_right=[];
  //screen through all points and get the points that is within 8 pixels left to the right most points
  for(var i=0;i<len;i++){
    if(p_right[0]-points[i][0]<8 && points[i][1]-p_left[1]>0){
      points_right.push(points[i]);
      CIRCLEFIT.addPoint(points[i][0],points[i][1]) //feed the points to the CIRCLEFIT function
    }
  }

  //show the points of right over the canvas
  var len_2=points_right.length;
  for(i=0;i<len_2;i++){
    x=points_right[i][0];
    y=points_right[i][1];
    context.fillRect(x,y,1,1)
  }
  //compute the iris circle
  var result=CIRCLEFIT.compute();

  console.log("Center = {" + result.center.x + "," + result.center.y + "}, Radius = " + result.radius);
  context.strokeStyle = "green";
  context.arc(result.center.x, result.center.y, result.radius, 0, 2 * Math.PI);
  context.stroke();


  //show result over the original image with predicted center
  canvas = document.getElementById('final');
  context = canvas.getContext('2d');
  //draw original eye image as background
  var img = document.getElementById("original");
  context.drawImage(img,0,0,300,200);
  console.log(img)
  //draw iris edage
  context.beginPath();
  context.strokeStyle = "green";
  context.arc(result.center.x, result.center.y, result.radius, 0, 2 * Math.PI);
  context.stroke();

  //draw predicted centered
  context.beginPath();
  context.arc(result.center.x, result.center.y, 2, 0, 2 * Math.PI);
  context.fillStyle='red';
  context.fill();
  context.strokeStyle = 'red';
  context.stroke();

  //calculate MRD
  var x=Math.trunc(result.center.x);
  var y=Math.trunc(result.center.y);
  var r=Math.trunc(result.radius);
  var top=[]
  for(i<0;i<len;i++){
    if(points[i][0]==x){
      top.push(points[i][0]);
      top.push(points[i][1]);
    }
  }
  var MRD=(y-top[1])/r
  MRD=MRD.toFixed(2);
  //show MRD value on picture
  context.font = "15px Arial";
  context.fillText(MRD.toString(), 30, 30);
  //draw MRD line
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(top[0], top[1]);
  context.strokeStyle = "#34ebe8";
  context.stroke();
}
