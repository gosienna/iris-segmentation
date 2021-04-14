
//load model
async function load_model(){
       model = await tf.loadLayersModel('../model/model.json');
       msg();

     }
 function msg(){
   var status=document.getElementById("status");
   status.style.webkitAnimationPlayState = 'paused'
   var status=document.getElementById("status");
   status.innerHTML="complete!"
 }
