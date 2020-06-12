function extract_diameter(){
  let srcMat=cv.imread('circle');
  cv.cvtColor(srcMat, srcMat, cv.COLOR_RGBA2GRAY, 0);
  cv.imshow('red',srcMat)
  let dst = cv.Mat.zeros(srcMat.rows, srcMat.cols, cv.CV_8U);
  let circles = new cv.Mat();
  cv.HoughCircles(srcMat, circles, cv.HOUGH_GRADIENT,
                1, 45, 100, 30, 20, 50);
  // draw circles
  let color = new cv.Scalar(255, 0, 0);
  for (let i = 0; i < circles.cols; ++i) {
      let x = circles.data32F[i * 3];
      let y = circles.data32F[i * 3 + 1];
      let radius = circles.data32F[i * 3 + 2];
      let center = new cv.Point(x, y);
      cv.circle(dst, center, radius, color);
      cv.circle(srcMat,center,radius,color);
  }
  cv.imshow('red2',dst)
  cv.imshow('red3',srcMat);

  var canvas=document.getElementById('red3');
  var ctx=canvas.getContext('2d');
  var radius = circles.data32F[0 * 3 + 2];
  var diameter=radius*2;
  ctx.strokeStyle = 'red';
  ctx.fillText(diameter.toString(), 30, 30);
  return diameter;
}
