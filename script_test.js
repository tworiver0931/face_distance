const image1 = document.getElementById('face-image1')
const image2 = document.getElementById('face-image2')
const container1 = document.createElement('div')
const container2 = document.createElement('div')

  
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

async function start() {
  
  container1.style.position = 'relative'
  container2.style.position = 'relative'
  document.body.append(container1)
  document.body.append(container2)
	
  
  
  document.body.append('Loaded1')
}
	
async function go(){
  let image1
  let image2
  let canvas1
  let canvas2
	document.body.append('Loaded2')
    if (image1) image1.remove()
	if(image2) image2.remove()
    if (canvas1) canvas1.remove()
	if (canvas2) canvas2.remove()
	
	document.getElementsByClassName('file-upload-content1')[0].appendChild(container1)
	document.getElementsByClassName('file-upload-content2')[0].appendChild(container2)	
	
    container1.append(image1)
	container2.append(image2)
    canvas1 = await faceapi.createCanvasFromMedia(image1)
	canvas2 = await faceapi.createCanvasFromMedia(image2)
    container1.append(canvas1)
	container2.append(canvas2)
    const displaySize1 = { width: image1.width, height: image1.height }
	const displaySize2 = { width: image2.width, height: image2.height }
    faceapi.matchDimensions(canvas1, displaySize1)
	faceapi.matchDimensions(canvas2, displaySize2)
    const detection1 = await faceapi.detectSingleFace(image1).withFaceLandmarks().withFaceDescriptor()
	const detection2 = await faceapi.detectSingleFace(image2).withFaceLandmarks().withFaceDescriptor()
    const resizedDetection1 = faceapi.resizeResults(detection1, displaySize1)
	const resizedDetection2 = faceapi.resizeResults(detection2, displaySize2)
    const dist = faceapi.euclideanDistance(resizedDetection1.descriptor, resizedDetection2.descriptor)
	
	const box1 = resizedDetection1.detection.box
    const drawBox1 = new faceapi.draw.DrawBox(box1)
    drawBox1.draw(canvas1)
	const box2 = resizedDetection2.detection.box
    const drawBox2 = new faceapi.draw.DrawBox(box2)
    drawBox2.draw(canvas2)
	
	document.body.append(dist)
}

