function add_event_window_capture(width_capture_window,height_capture_window){

          count=0
          count_M=0;
          count_L=0;
          count_R=0;
          temp_r_L=0.0;
          temp_r_R=0.0;

          //var c=document.getElementById("canvas-input");
        c.removeEventListener('mousemove', move_window);
        c.removeEventListener('click', capture);
        c.addEventListener('mousemove', move_window);
        c.addEventListener('click', capture);


}

function move_window(event) {

          x = event.layerX;
          y = event.layerY;
          ctx.putImageData(img_background,0,0);
          ctx.beginPath();
          ctx.rect(x-width_capture_window/2, y-height_capture_window/2, width_capture_window, height_capture_window);
          ctx.strokeStyle = "#77f022";
          ctx.stroke();


          var s=width_original_img/width_img_display;
          console.log(img_original.width,img_original.height,count);
          if(count==0){
            ctx_L.drawImage(img_original,x*s-s*width_capture_window/2,y*s-s*height_capture_window/2,s*width_capture_window,s*height_capture_window,0,0,300,200);
          }
          if(count==1){
            ctx_R.drawImage(img_original,x*s-s*width_capture_window/2,y*s-s*height_capture_window/2,s*width_capture_window,s*height_capture_window,0,0,300,200);
          }
          if(count==2){
            ctx_M.drawImage(img_original,x*s-s*width_capture_window/2,y*s-s*height_capture_window/2,s*width_capture_window,s*height_capture_window,0,0,300,200);

          }
}

function capture(event){
          console.log("adf",count)
          if(count==0){
            add_event_marker_measurement("left_eye")
            count=count+1;
          }else if(count==1){
            add_event_marker_measurement("right_eye")
            count=count+1;
          }else if(count==2){
            add_event_marker_measurement("marker")
            count=count+1;
          }else if(count==3){
            count=0;
          }

}
