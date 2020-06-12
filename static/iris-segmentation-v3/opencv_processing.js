function get_edge(){
  compute('output-R','iris-R');
  compute('output-L','iris-L');
  //let button to fit circle visible
  document.getElementById('circle-fit').style.visibility='visible';

  function compute(output,iris){
    console.log(output,iris)
    let srcMat = cv.imread(output);
    cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(srcMat, srcMat, 177, 255, cv.THRESH_BINARY);
    let edgeMat = cv.Mat.zeros(srcMat.rows, srcMat.cols, cv.CV_8UC3);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(srcMat, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
    let cnt = contours.get(0);
    //find circle contours
    let circle = cv.minEnclosingCircle(cnt);

    //draw the contour
    let contoursColor = new cv.Scalar(255,255,255,255);
    cv.drawContours(edgeMat, contours, 0, contoursColor, 1, 8, hierarchy, 100);
    cv.imshow(iris,edgeMat);
    srcMat.delete(); edgeMat.delete(); contours.delete(); hierarchy.delete(); cnt.delete();
  }
}
