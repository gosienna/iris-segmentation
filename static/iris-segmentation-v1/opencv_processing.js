function opencv(){
  let srcMat = cv.imread('output');
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
  let input=cv.imread('original');
  let contoursColor = new cv.Scalar(0,255,0,255);
  let circleColor = new cv.Scalar(255, 0, 0,255);
  cv.circle(input, circle.center, circle.radius, circleColor);
  cv.drawContours(input, contours, 0, contoursColor, 1, 8, hierarchy, 100);
  cv.imshow('iris',input);
  srcMat.delete(); edgeMat.delete(); contours.delete(); hierarchy.delete(); cnt.delete(); input.delete();
}
