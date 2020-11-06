function add_event_marker_measurement(target){

  img_marker_background=ctx_M.getImageData(0,0,c_M.width,c_M.height);
  img_left_background=ctx_L.getImageData(0,0,c_L.width,c_L.height);
  img_right_background=ctx_R.getImageData(0,0,c_R.width,c_R.height);

    if(target=="left_eye"){
      count_L=0;
      temp_r_L=0.0;
      c_L.removeEventListener('mousemove',draw_circle_L);
      c_L.removeEventListener('click',capture_circle_L);
      c_L.addEventListener('mousemove',draw_circle_L);
      c_L.addEventListener('click',capture_circle_L);
    }else if(target=="right_eye"){
      count_R=0;
      temp_r_R=0.0;
      c_R.removeEventListener('mousemove',draw_circle_R);
      c_R.removeEventListener('click',capture_circle_R);
      c_R.addEventListener('mousemove',draw_circle_R);
      c_R.addEventListener('click',capture_circle_R);
    }else if(target=="marker"){
      count_M=0;
      c_M.removeEventListener('click', capture_M);
      c_M.addEventListener('click', capture_M);
    }


}
function capture_M(event){

  x = event.layerX;
  y = event.layerY;
  console.log(count);
  if(count_M==0){
    count_M=count_M+1;
    ctx_M.putImageData(img_marker_background,0,0)
    ctx_M.beginPath();
    ctx_M.moveTo(x, y-20);
    ctx_M.lineTo(x, y+20);
    ctx_M.strokeStyle = "#77f022";
    ctx_M.stroke();
    margin_L=x;

  }else if(count_M==1){
    count_M=0;
    ctx_M.beginPath();
    ctx_M.moveTo(x, y-20);
    ctx_M.lineTo(x, y+20);
    ctx_M.strokeStyle = "#77f022";
    ctx_M.stroke();
    margin_R=x;
    pixel_to_mm=10/(margin_R-margin_L);

    //Trigger point: reveal  the button for image processing
    var button_measure=document.getElementById("button_measure");
    button_measure.style.visibility="visible"
  }

}




function capture_circle_L(event){
  if(count_L==0){
    x_p_L=x;
    y_p_L=y;
    count_L=count_L+1;
  }else if(count_L==1){
    x_p_L=(x+x_p_L)/2;
    y_p_L=(y+y_p_L)/2;
    count_L=count_L+1;
    mannual_r_L=temp_r_L;
    console.log(x_p_L,y_p_L,count_L)
  }else if(count_L==2){
    mannual_MRD_L=y_p_L-y;
    count_L=0
  }

}


function draw_circle_L(event){
  x = event.layerX;
  y = event.layerY;
  if(count_L==1){
  ctx_L.putImageData(img_left_background,0,0)
  temp_r_L=0.5*Math.sqrt(Math.pow(x-x_p_L,2)+Math.pow(y-y_p_L,2));
  //draw circumfrence
  ctx_L.beginPath();
  ctx_L.arc(x_p_L+(x-x_p_L)/2,y_p_L+(y-y_p_L)/2, temp_r_L, 0, 2 * Math.PI);
  ctx_L.strokeStyle = "#77f022";
  ctx_L.stroke();

  //draw circle heart
  ctx_L.beginPath();
  ctx_L.arc(x_p_L+(x-x_p_L)/2,y_p_L+(y-y_p_L)/2, 4, 0, 2 * Math.PI);
  ctx_L.fillStyle =  "#77f022";
  ctx_L.fill();
}else if(count_L==2){
  //redraw circumfrence and circle heart
  //backgrounad
  ctx_L.putImageData(img_left_background,0,0)
  //circumfrence
  ctx_L.beginPath();

  ctx_L.arc(x_p_L,y_p_L,mannual_r_L, 0, 2 * Math.PI);
  ctx_L.strokeStyle = "#77f022";
  ctx_L.stroke();
  //heart
  ctx_L.beginPath();
  ctx_L.arc(x_p_L,y_p_L, 4, 0, 2 * Math.PI);
  ctx_L.fillStyle =  "#77f022";
  ctx_L.fill();

  //draw MRD line
  ctx_L.beginPath();
  ctx_L.moveTo(x_p_L, y_p_L);
  ctx_L.lineTo(x_p_L, y);
  ctx_L.strokeStyle = "#77f022";
  ctx_L.stroke();
  }
}

function capture_circle_R(event){
  x = event.layerX;
  y = event.layerY;

  if(count_R==0){
    x_p_R=x;
    y_p_R=y;
    count_R=count_R+1;
  }else if(count_R==1){
    x_p_R=(x+x_p_R)/2;
    y_p_R=(y+y_p_R)/2;
    count_R=count_R+1;
    mannual_r_R=temp_r_R;
  }else if(count_R==2){
    mannual_MRD_R=y_p_R-y;
    count_R=0
  }

}

function draw_circle_R(event){
  console.log(count_L,count_R);
  x = event.layerX;
  y = event.layerY;

  if(count_R==1){
  ctx_R.putImageData(img_right_background,0,0)
  temp_r_R=0.5*Math.sqrt(Math.pow(x-x_p_R,2)+Math.pow(y-y_p_R,2));
  //draw circumfrence
  ctx_R.beginPath();
  ctx_R.arc(x_p_R+(x-x_p_R)/2,y_p_R+(y-y_p_R)/2, temp_r_R, 0, 2 * Math.PI);
  ctx_R.strokeStyle = "#77f022";
  ctx_R.stroke();

  //draw circle heart
  ctx_R.beginPath();
  ctx_R.arc(x_p_R+(x-x_p_R)/2,y_p_R+(y-y_p_R)/2, 4, 0, 2 * Math.PI);
  ctx_R.fillStyle =  "#77f022";
  ctx_R.fill();
}else if(count_R==2){
  //redraw circumfrence and circle heart
  //backgrounad
  ctx_R.putImageData(img_right_background,0,0)
  //circumfrence
  ctx_R.beginPath();
  ctx_R.arc(x_p_R,y_p_R,mannual_r_R, 0, 2 * Math.PI);
  ctx_R.strokeStyle = "#77f022";
  ctx_R.stroke();
  //heart
  ctx_R.beginPath();
  ctx_R.arc(x_p_R,y_p_R, 4, 0, 2 * Math.PI);
  ctx_R.fillStyle =  "#77f022";
  ctx_R.fill();

  //draw MRD line
  ctx_R.beginPath();
  ctx_R.moveTo(x_p_R, y_p_R);
  ctx_R.lineTo(x_p_R, y);
  ctx_R.strokeStyle = "#77f022";
  ctx_R.stroke();
  }
}
