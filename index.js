// Create slideshow children with background image

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
