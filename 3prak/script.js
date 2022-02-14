var canvas = document.getElementById('canva');
var context = canvas.getContext('2d');
context.fillStyle = "white";
context.fillRect(0, 0, canvas.width, canvas.height);

var figures = [
  ["circle",50,50,10],
  ["square",150,50,25],
  ["ellipse",200,200,30,40]
];

//Круг
context.beginPath();
context.arc(figures[0][1], figures[0][2], figures[0][3], 0, 2 * Math.PI, false);
context.fill();

//Прямоугольник
context.beginPath();
context.strokeStyle = 'red';
context.lineWidth = 5;
context.strokeRect(figures[1][1], figures[1][2], figures[1][3], figures[1][3]);
context.lineWidth = 1;
context.strokeStyle = 'black';


//Эллипс
context.beginPath();
context.fillStyle = "cyan"
context.ellipse(figures[2][1], figures[2][2], figures[2][3], figures[2][4], 0, 0, 2 * Math.PI);
context.fill();

//Кривая Безье
context.beginPath();
context.moveTo(100, 200);
context.bezierCurveTo(20, 100, 200, 100, 100, 300);
context.stroke();

//Анимация canvas
var x = 500;
var y = 400;
var control = 3;
var stepCount = 0;
var direction;
function drawDot() {
	context.clearRect (300, 300, 300, 300);
	if (stepCount == 0) {
		stepCount = Math.floor(15 * Math.random());
		direction = Math.floor(8 * Math.random());
	}
	else {
		stepCount--;
	}
	switch (direction) {
		case 0:
		y = y - control;
		break;

		case 1:
		x = x + control;
		break;

		case 2:
		y = y + control;
		break;

		case 3:
		x = x - control;
		break;

		case 4:
		x = x + control;
		y = y - control;
		break;

		case 5:
		x = x + control;
		y = y + control;
		break;

		case 6:
		x = x - control;
		y = y + control;
		break;

		case 7:
		x = x - control;
		y = y - control;
		break;
	}
	if (x < 0 || y < 0 || x > 600 || y > 600)
  {
    x = 500; y = 400;
  }
	context.fillStyle = "blue";
	context.fillRect(x - 3, y - 3, 10, 10);
	timer = setTimeout(drawDot, 10);
}

drawDot();


//Отклик на события взаимодействия с пользователем
canvas.onmousemove = function(event) {
	var xx = event.offsetX;
	var yy = event.offsetY;
  context.fillStyle = "green";
  context.beginPath();
  context.arc(xx, yy, 4, 0, 2 * Math.PI, false);
  context.fill();
}
