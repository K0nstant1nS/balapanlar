const faqQuestionOpened = ()=>document.querySelectorAll('.faq-qst_opened');
const faqQuestions = document.querySelectorAll('.faq-qst');

function hideFaqTexts(faq){
	const answers = faq.querySelectorAll('.faq-qst__text');
	answers.forEach(element => {
		element.classList.remove('faq-qst__text_show');
	});
}

function setTabUrl(urls, status){
	urls.forEach(element => {
		if(status){
			element.setAttribute('tabindex', '0');
		}else{
			element.setAttribute('tabindex', '-1');
		}
	});
}

function closeFaqs() {
	faqQuestionOpened().forEach(faq => {
		faq.classList.toggle('faq-qst_opened');
		const question = faq.querySelector('.faq-qst__question');
		const urls = faq.querySelectorAll('.faq-qst__email');
		const button = faq.querySelector('.faq-qst__button');
		question.classList.remove('faq-qst__question_opened');
		button.classList.remove('faq-qst__button_active');
		setTabUrl(urls, false);
		hideFaqTexts(faq);
		faq.style.height = `${parseInt(faq.dataset.qh)}px`;
	});
}

function openFaq(faq) {
	if(!faq.classList.contains('faq-qst_opened')){
		closeFaqs();
		faq.classList.add('faq-qst_opened');
		const answers = faq.querySelectorAll('.faq-qst__text');
		const question = faq.querySelector('.faq-qst__question');
		const button = faq.querySelector('.faq-qst__button');
		const urls = faq.querySelectorAll('.faq-qst__email');
		setTabUrl(urls, true);
		button.classList.add('faq-qst__button_active');
		question.classList.add('faq-qst__question_opened');
		answers.forEach(element => {
			element.classList.add('faq-qst__text_show');
		});
		faq.style.height = `${parseInt(faq.dataset.qh) + parseInt(faq.dataset.ah)}px`;
	}else{
		closeFaqs();
	}
}

function getHeightsElem(element) {
	const question = element.querySelector('.faq-qst__question');
	const answers = element.querySelectorAll('.faq-qst__text');
	let answersHeight = 0;
	answers.forEach(answ => {
		answersHeight += answ.offsetHeight;
	});
	return {qh: question.offsetHeight, ah: answersHeight};
}

function resizeFaq() {
	faqQuestions().forEach(element => {
		const heights = getHeightsElem(element);
		element.dataset.qh = heights.qh;
		element.dataset.ah = heights.ah;
		button.style.height = `${heights.qh}px`;
		if(!faq.classList.contains('faq-qst_opened')){
			faq.style.height = `${parseInt(faq.dataset.qh) + parseInt(faq.dataset.ah)}px`;
		}else{
			faq.style.height = `${parseInt(faq.dataset.qh)}px`;
		}
	});
}

function initFaq() {
	faqQuestionOpened().forEach(element => {
		const button = element.querySelector('.faq-qst__button');
		const heights = getHeightsElem(element);
		element.dataset.qh = heights.qh;
		element.dataset.ah = heights.ah;
		button.style.height = `${heights.qh}px`;
		button.addEventListener('click', ()=>openFaq(element));
	});
	closeFaqs();
}

window.addEventListener('resize', () => resizeFaq);
window.addEventListener('load', ()=>initFaq());
