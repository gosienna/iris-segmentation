function eye_ruler_extract(){
          canvas.width=img.width/4;
          canvas.height=img.height/4;
          var size=canvas.getBoundingClientRect()
          console.log(size.width,size.height)
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0,img.width,img.height,0,0,img.width/4,img.height/4);

          s=img.width/size.width;
          window_s=0.9

          var zoom = function(event) {
                    x = event.layerX;
                    y = event.layerY;
                    //console.log(x,y)
                    ctx.drawImage(img, 0, 0,img.width,img.height,0,0,img.width/4,img.height/4);//restore the canvas to original state
                    ctx.drawImage(img,
                                      x*s-450*window_s, y*s-300*window_s,
                                      900*window_s, 600*window_s,
                                      x-150*window_s, y-100*window_s,
                                      300*window_s, 200*window_s);
                     }
          var capture=function(event){
                    console.log(count_s);
                    if(count_s==0){
                      var canvas_snap=document.getElementById('right');
                      var ctx_snap=canvas_snap.getContext('2d');
                      ctx_snap.drawImage(img,x*s-450*window_s, y*s-300*window_s,
                                         900*window_s, 600*window_s,
                                         0, 0,
                                         300, 200)
                      count_s++;

                    }else if(count_s==1){
                      var canvas_snap=document.getElementById('circle');
                      var ctx_snap=canvas_snap.getContext('2d');
                      ctx_snap.drawImage(img,x*s-450*window_s, y*s-300*window_s,
                                         900*window_s, 600*window_s,
                                         0, 0,
                                         300, 200)
                      count_s++;

                    }else if(count_s==2){
                      var canvas_snap=document.getElementById('left');
                      var ctx_snap=canvas_snap.getContext('2d');
                      ctx_snap.drawImage(img,x*s-450*window_s, y*s-300*window_s,
                                         900*window_s, 600*window_s,
                                         0, 0,
                                         300, 200)
                      count_s=0;
                    }

          }

          canvas.addEventListener('mousemove', zoom);
          canvas.addEventListener('click', capture);

}
