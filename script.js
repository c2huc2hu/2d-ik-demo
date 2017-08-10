// Setting things up
const OFFSET = 200;
$ = document.querySelector.bind(document);

function ik_2d(x, y, d1, d2) {
  let dist = Math.sqrt(x ** 2 + y ** 2);
  let theta1 = Math.atan2(y, x) - Math.acos((dist ** 2 + d1 ** 2 - d2 ** 2) / (2 * d1 * dist));
  let theta2 = Math.atan2(y - d1 * Math.sin(theta1), x - d1 * Math.cos(theta1));
  return {theta1, theta2};
}

// Drawing
function render(angles, d1, d2) {
  let seg1 = $('#segment1');
  let seg2 = $('#segment2');
  let end = $('#end-effector');

  if (isNaN(angles.theta1) || isNaN(angles.theta2))
    return

  let elbowX = Math.cos(angles.theta1) * d1 + OFFSET;
  let elbowY = Math.sin(angles.theta1) * d1 + OFFSET;
  let wristX = elbowX + Math.cos(angles.theta2) * d2
  let wristY = elbowY + Math.sin(angles.theta2) * d2;
  seg1.setAttribute('x1', OFFSET);
  seg1.setAttribute('y1', OFFSET);
  seg1.setAttribute('x2', elbowX);
  seg1.setAttribute('y2', elbowY);
  seg2.setAttribute('x1', elbowX);
  seg2.setAttribute('y1', elbowY);
  seg2.setAttribute('x2', wristX);
  seg2.setAttribute('y2', wristY);
  end.setAttribute('x', wristX - 5);
  end.setAttribute('y', wristY - 5);
}

// Click and drag stuff
function selectEndEffector(event) {
  let svg = $('svg');
  svg.addEventListener("mousemove", moveEndEffector);
  svg.addEventListener("mouseup", deselectEndEffector);
  svg.addEventListener("mouseleave", deselectEndEffector);

  dragStartX = event.clientX;
  dragStartY = event.clientY;
  console.log("box", dragStartX, dragStartY);
}

function deselectEndEffector(event) {
  let svg = $('svg');
  svg.removeEventListener("mousemove", moveEndEffector);
  svg.removeEventListener("mouseup", deselectEndEffector);
  svg.removeEventListener("mouseleave", deselectEndEffector);

  x += event.clientX - dragStartX;
  y += event.clientY - dragStartY;
}

function moveEndEffector(event) {
  x += event.clientX - dragStartX;
  y += event.clientY - dragStartY;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
}


///// MAIN STUFF
var x = 100, y = 200;
let d1 = 200, d2 = 300;

function update() {
  d1 = $('input#slider1').value;
  d2 = $('input#slider2').value;

  let angles = ik_2d(x, y, d1, d2);
  render(angles, d1, d2);
}

window.onload = () => {
  $('#end-effector').addEventListener("mousedown", selectEndEffector);
  setInterval(update, 1/10);
}