// Create slideshow: children with background image
const createSlideshowDivs = () => {
	for (let i = 1; i <= 5; i++) {
		const div = document.createElement('div');

		i == 1 && div.classList.add('change');

		div.style.backgroundImage = `url(images/slideshow/section-1-bg-${i}.jpg)`;

		document.querySelector('.slideshow').appendChild(div);
	}
};

createSlideshowDivs();

//all divs
const slideShowDivs = document.querySelectorAll('.slideshow div');

let count = 1;

setInterval(() => {
	const slide = document.querySelector('.slideshow .change');
	count++;
	slide.classList.remove('change');

	if (count < slideShowDivs.length) {
		slide.nextElementSibling.classList.add('change');
	} else {
		count = 1;
		slideShowDivs[0].classList.add('change');
	}
}, 10000);

// Cube
const cube = document.querySelector('.cube');
const controls = document.querySelector('.controls');
let deg = 0;

// up  +20deg
// right +20deg
// diagonalRightUp +20

// down -20deg
// left -20deg
// diagonalLeftDown -20;

// coordinates for rotating
let x = 0;
let y = 20;
let z = 0;
let rotateState = true;
let intervalId;

// rotate through the Y axis
const playPause = () => {
	if (rotateState) {
		intervalId = setInterval(() => {
			cube.style.transform = `rotateX(${x}deg) rotateY(${y++}deg) rotateZ(${z}deg)`;
		}, 100);
	}
};

playPause();

// get all directions and spread them in the directions Array;
const [...directions] = document.querySelectorAll(
	'.rotate-x-up, .rotate-x-down, .rotate-y-left, .rotate-y-right, .rotate-z-down, .rotate-z-up'
);

// get all directions saved to their variable;
const [up, down, left, right, diagonalRightUp, diagonalLeftDown] = directions;

// rotate the cube, based on the received axis;
// axis should be greater or lesser than 0;
const rotateCube = (xAxis, yAxis, zAxis) => {
	if (xAxis > 0 || xAxis < 0) x += xAxis;
	if (yAxis > 0 || yAxis < 0) y += yAxis;
	if (zAxis > 0 || zAxis < 0) z += zAxis;
	cube.style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
};

// Receives a direction and call the rotateCube() to either increase or decrease;
const ctrl = direction => {
	if (direction === up) rotateCube(20, 0, 0);
	if (direction === down) rotateCube(-20, 0, 0);
	if (direction === left) rotateCube(0, -20, 0);
	if (direction === right) rotateCube(0, 20, 0);
	if (direction === diagonalRightUp) rotateCube(0, 0, 20);
	if (direction === diagonalLeftDown) rotateCube(0, 0, -20);
};

// if target is not included in the directions array, use the Guard clause and return;
controls.addEventListener('click', function (ev) {
	if (!directions.includes(ev.target)) return;
	ev.preventDefault();
	const exact = ev.target.closest('.fas');
	ctrl(exact);
});

// Expected events
const [mouseover, mouseleave] = ['mouseover', 'mouseleave'];

// Waiting for required events, then stop rotating cube or continue rotating the cube
const toggleCube = event => {
	controls.addEventListener(event, function () {
		if (event === mouseover) {
			rotateState = false;
			clearInterval(intervalId);
		}

		if (event === mouseleave) {
			rotateState = true;
			playPause();
		}
	});
};

// toggle cube and pass in required Expected events;
toggleCube(mouseover);
toggleCube(mouseleave);

// Section 3

const section3 = document.querySelector('.section-3');
// Check to see if page is scrolled up to half of the section
// pageYOffset is the space we've scrolled past
// innerHeight is the current visible "VH"
// offsetTop is the distance from the top of the page to the section
// offsetHeight is the height of the section
// offsetTop + offsetHeight / 2 is the half of the section
window.addEventListener('scroll', function () {
	if (
		window.pageYOffset + window.innerHeight >=
		section3.offsetTop + section3.offsetHeight / 2
	) {
		section3.classList.add('open');
	}
});

// Section 4 : watches
const [iphoneBtns, watchBands, watchCases] = document.querySelectorAll(
	'.iphone-btns, .watch__bands, .watch__cases'
);
// Prevent default on the Iphone buttons
iphoneBtns.addEventListener('click', ev => ev.preventDefault());

const watchCtrlBtns = document.querySelector('.watch-ctrl-btns');
const [...btnDirections] = document.querySelectorAll('.watch-control');
const [btnTopCtrl, btnRightCtrl, btnDownCtrl, btnLeftCtrl] = btnDirections;

// console.log(watchCtrlBtns);

let xBands = 0;
let yCases = 0;

const scroll = (direction, targetBtn) => {
	// const directions = ['top', 'right', 'down', 'left'];
	const margin = {
		Top: -70,
		Bottom: 70,
		Right: 70,
		Left: -70,
	};

	const xAxis = ['Left', 'Right'];

	// Xaxis for bands;
	if (xAxis.includes(direction)) {
		xBands += margin[direction];
		hideControlBtns(xBands, targetBtn);
		watchBands.style.marginLeft = `${xBands}rem`;
	} else {
		// Yaxis for cases;
		yCases += margin[direction];
		hideControlBtns(yCases, targetBtn);
		watchCases.style.marginTop = `${yCases}rem`;
	}
};

// Keep track of the previous clicked
let xAxisExceededBtn;
let yAxisExceededBtn;

const hideControlBtns = (axis, targetBtn) => {
	// check for limits on the x and y axis
	if (axis === 280 || axis === -280) {
		targetBtn.classList.add('hide');
		if (targetBtn.classList.contains('x-Axis')) {
			xAxisExceededBtn = targetBtn;
			return;
		}

		yAxisExceededBtn = targetBtn;
	}

	// check the previous clicked button and show it when lesser than the highest
	xAxisExceededBtn && showArrow(xAxisExceededBtn);
	yAxisExceededBtn && showArrow(yAxisExceededBtn);
};

const showArrow = button => {
	let direction;
	if (button.classList.contains('x-Axis')) direction = xBands;
	if (button.classList.contains('y-Axis')) direction = yCases;

	// if below limit, show btn
	if (direction > -280 && direction < 280) {
		button.classList.remove('hide');
	}
};

const getDirection = target => {
	// scroll
	target === btnTopCtrl && scroll('Top', target);
	target === btnRightCtrl && scroll('Right', target);
	target === btnDownCtrl && scroll('Bottom', target);
	target === btnLeftCtrl && scroll('Left', target);
};

watchCtrlBtns.addEventListener('click', function (ev) {
	ev.preventDefault();
	const btnTarget = ev.target.closest('.watch-control');
	if (!btnDirections.includes(btnTarget)) return;

	// get direction
	getDirection(btnTarget);
});
