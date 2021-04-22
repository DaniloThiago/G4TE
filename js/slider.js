/**
 *  Utility functions
 */
function utils() {
    /**
     * Returns max height value for a nodelist
     * @param {NodeList} nodeList The node list to calculate max height of
     */
    const calcMaxHeight = function (items) {
        let maxHeight = 0;

        items.forEach(item => {
            const h = item.clientHeight;
            maxHeight = h > maxHeight ? h : maxHeight;
        });
        return maxHeight;
    }

    /**
     * Removes Classes from NodeList
     * @param {NodeList} nodeList The node list to remove classes from
     * @param {Array} cssClasses Array of CSS classes to be removed
     */
    function removeClasses(nodeList, cssClasses) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.remove(...cssClasses);
        }
    }

    /**
     * Adds Classes from NodeList
     * @param {NodeList} nodeList The node list to add classes to
     * @param {Array} cssClasses Array of CSS classes to be added
     */
    function addClasses(nodeList, cssClasses) {
        for (let i = 0; i < nodeList.length; i++) {
            nodeList[i].classList.add(...cssClasses);
        }
    }

    /**
     * Behaves the same as setInterval except uses requestAnimationFrame() where possible for better performance
     * @param {function} fn The callback function
     * @param {int} delay The delay in milliseconds
     */
    const requestInterval = function (fn, delay) {
        const requestAnimFrame = (function () {
            return window.requestAnimationFrame || function (callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();

        let start = new Date().getTime(),
            handle = {};

        function loop() {
            const current = new Date().getTime(),
                delta = current - start;

            if (delta >= delay) {
                fn.call();
                start = new Date().getTime();
            }

            handle.value = requestAnimFrame(loop);
        }

        handle.value = requestAnimFrame(loop);
        return handle;
    };

    /**
     * Behaves the same as clearInterval except uses cancelRequestAnimationFrame() where possible for better performance
     * @param {int|object} handle The callback function
     */
    const clearRequestInterval = function (handle) {
        window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
            clearInterval(handle);
    };

    return {
        calcMaxHeight,
        removeClasses,
        addClasses,
        requestInterval,
        clearRequestInterval
    }
}


/**
 *  Main Slider function
 */
function heroSlider() {
    const slider = {
        hero: document.querySelector('#hero-slider'),
        main: document.querySelector('#slides-main'),
        aux: document.querySelector('#slides-aux'),
        logo: document.querySelector('#logo > span'),
        title: document.querySelector('.slider-title > span'),
        current: document.querySelector('#slider-nav .current'),
        total: document.querySelector('#slider-nav .total'),
        handle: null,
        idle: true,
        activeIndex: -1,
        interval: 1000 * 60 * 6,
        data: {
            logo: 'Projeto TE',
            title: 'Sistema Solar',
            info: [{
                    title: 'MOTIVAÇÃO',
                    img: 'scope.jpg',
                    style: {
                        fontSize: '8rem',
                        paddingTop: '12rem'
                    },
                    text: `Incentivando a Astronomia no Ensino Fundamental`,
                },
                {
                    title: 'SOLAR SYSTEM SCOPE',
                    img: 'lua.jpg',
                    linkTitle: 'https://www.solarsystemscope.com/',
                    style: {
                        fontSize: '3rem',
                        paddingTop: '12rem'
                    },
                    text: `O Solar System Scope é uma simulação 3D online do Sistema Solar e do céu noturno em tempo real, permitindo uma navegação e visualizações espaciais do Sol, planetas, planetas anões, cometas, estrelas, constelações e muito mais.`,
                },
                {
                    title: 'PÚBLICO E APLICAÇÃO',
                    img: 'observatorio.jpg',
                    text: `<h2 class="font-weight-bold">Público-Alvo:</h2>
                    <p>Estudantes do Ensino Fundamental</p>
                    <br/>
                    <h2 class="font-weight-bold">Pesquisa e Aplicação:</h2>
                    <p>
                        O projeto pretende desenvolver conhecimentos de forma interdisciplinar, agregando Ciências, Matemática, Geografia, História, Língua Inglesa e Artes. Porém com foco em Ciências. 
                    </p>
                    `,
                    style: {
                        fontSize: '3rem',
                        paddingTop: '10rem'
                    },

                },
                {
                    title: 'OBJETIVOS',
                    img: 'ceu.jpg',
                    style: {
                        fontSize: '3rem',
                        paddingTop: '12rem'
                    },
                    text: `O projeto visa à inclusão da astronomia como campo capaz de colaborar com o aprendizado de conceitos pertencentes às áreas de estudo da ciência trabalhados em sala de aula, gerando assim a curiosidade aos alunos a fim de levá-los  à pesquisa e ao interesse pelo assunto.`,
                    style: {
                        fontSize: '3rem',
                        paddingTop: '18rem'
                    }
                },
                {
                    title: 'METODOLOGIA',
                    img: 'jupter.jpg',
                    text: `Sugere-se que o Solar System possa ser apresentado às turmas do Ensino Fundamental. Após isso, o professor poderá apresentar e explicar vários tópicos que são apresentados no programa. Como:
                    <br/>
                        <ul>
                            <li>O sistema de rotação e translação; </li>
                            <li>Distância entre os planetas;</li>
                            <li>Estruturas internas e externas do planeta;</li>
                            <li>Informações do planeta, como massa, tamanho, etc;</li>
                            <li>Características visuais do sistema solar, constelações, órbitas, sistemas planetários, entre outros;</li>
                        </ul>
                    `,
                    style: {
                        fontSize: '2.5rem',
                        paddingTop: '100px'
                    }
                },
                {
                    title: 'RECURSOS',
                    img: 'observatorio.jpg',
                    text: `
                    <ul>
                        <li>Uso de notebook e datashow para apresentação do programa em sala de aula;<br/><br/></li>
                        <li>Uso de laboratório de informática para visualização do programa e pesquisas;<br/><br/></li>
                        <li>Uso de celulares para visualização;</li>
                    </ul>
                    `,
                    style: {
                        fontSize: '3rem',
                        paddingTop: '12rem'
                    }
                },
                {
                    title: 'CRONOGRAMA E AVALIAÇÃO',
                    img: 'arte.jpg',
                    text: `
                    <h2 class="font-weight-bold">Cronograma:</h2>
                    <p>As atividades do projeto são  pensadas para se acontecerem nos conteúdos de Ciências que contemplam o estudo da Astronomia.</p>
                    <br/>
                    <h2 class="font-weight-bold">Avaliação e Produtos:</h2>
                    <p>A avaliação deve ser  processual, destacando-se a produção de maquetes, desenhos, slides, cartazes e painéis a serem apresentados pelos alunos.</p>
                    `,
                    style: {
                        fontSize: '3rem',
                        paddingTop: '12rem'
                    }
                },
                {
                    title: 'REFERÊNCIAS',
                    img: 'lua.jpg',
                    text: `
                    <ul>
                        <li>Solar System Scope. Dísponivel em: https://www.solarsystemscope.com/ . Acesso em 12/04/2021<br/><br/></li>
                        <li>DELLORE, Cesar Brumini. (ed.) Araribá Mais - Geografia: manual do professor. 1. ed. São Paulo: Moderna, 2018.<br/><br/></li>
                        <li>PRADO, Maria Elisabette Brisola Brito. Tecnologia, Currículo e Projetos. Disponível em http://portal.mec.gov.br/seed/arquivos/pdf/1sf.pdf Acesso em 18/04/2021.</li>
                    `,
                    style: {
                        fontSize: '2rem',
                        paddingTop: '10rem'
                    }
                }
            ]
        }
    }

    const createElements = function () {

        slider.logo.innerHTML = slider.data.logo;
        slider.title.innerHTML = slider.data.title;
        slider.total.innerHTML = ('0' + slider.data.info.length).slice(-2);

        for (const [i, el] of slider.data.info.entries()) {
            // create elements to slides-aux
            let title = document.createElement('h2');
            title.classList.add('slide-title', 'slide');
            title.setAttribute('data-index', i);
            slider.aux.appendChild(title);

            let a;
            if (el.linkTitle) {
                a = document.createElement('a');
                a.setAttribute('target', '_blank');
                a.setAttribute('href', el.linkTitle);
            } else {
                a = document.createElement('p');
            }
            a.innerText = el.title;
            title.appendChild(a);

            // create elements to slides-main
            let slide = document.createElement('div');
            slide.classList.add('slide');
            slide.setAttribute('data-index', i);
            slider.main.appendChild(slide);

            let text = document.createElement('div');
            text.classList.add('text');
            console.log(el.style)
            Object.assign(text.style, el.style);
            text.innerHTML = `<div class="c-dark">${el.text}</div>`;
            slide.appendChild(text);

            let mask = document.createElement('div');
            mask.classList.add('abs-mask');
            slide.appendChild(mask);

            let img = document.createElement('div');
            img.classList.add('slide-image');
            img.setAttribute('style', `background-image: url(./assets/img/slider/${el.img})`)
            mask.appendChild(img);
        }
    }

    const setHeight = function (holder, items) {
        const h = utils().calcMaxHeight(items);
        holder.style.height = `${h}px`;
    }

    const leadingZero = function () {
        return arguments[1] < 10 ? '0' + arguments[1] : arguments[1];
    }

    const setCurrent = function () {
        slider.current.innerText = leadingZero `${slider.activeIndex + 1}`;
    }

    const changeSlide = function (direction) {
        slider.idle = false;
        slider.hero.classList.remove('prev', 'next');
        if (direction == 'next') {
            slider.activeIndex = (slider.activeIndex + 1) % slider.total;
            slider.hero.classList.add('next');
        } else {
            slider.activeIndex = (slider.activeIndex - 1 + slider.total) % slider.total;
            slider.hero.classList.add('prev');
        }

        //reset classes
        utils().removeClasses(slider.items, ['prev', 'active']);

        //set prev  
        const prevItems = [...slider.items]
            .filter(item => {
                let prevIndex;
                if (slider.hero.classList.contains('prev')) {
                    prevIndex = slider.activeIndex == slider.total - 1 ? 0 : slider.activeIndex + 1;
                } else {
                    prevIndex = slider.activeIndex == 0 ? slider.total - 1 : slider.activeIndex - 1;
                }

                return item.dataset.index == prevIndex;
            });

        //set active
        const activeItems = [...slider.items]
            .filter(item => {
                return item.dataset.index == slider.activeIndex;
            });

        utils().addClasses(prevItems, ['prev']);
        utils().addClasses(activeItems, ['active']);
        setCurrent();

        const activeImageItem = slider.main.querySelector('.active');
        activeImageItem.addEventListener('transitionend', waitForIdle, {
            once: true
        });
    }

    const stopAutoplay = function () {
        slider.autoplay = false;
        utils().clearRequestInterval(slider.handle);
    }

    const waitForIdle = function () {
        !slider.autoplay && autoplay(false); //restart
        slider.idle = true;
    }

    const wheelControl = function () {
        slider.hero.addEventListener('wheel', e => {
            if (slider.idle) {
                const direction = e.deltaY > 0 ? 'next' : 'prev';
                stopAutoplay();
                changeSlide(direction);
            }
        });
    }

    const autoplay = function (initial) {
        slider.autoplay = true;
        slider.items = slider.hero.querySelectorAll('[data-index]');
        slider.total = slider.items.length / 2;

        const loop = () => changeSlide('next');

        initial && requestAnimationFrame(loop);
        slider.handle = utils().requestInterval(loop, slider.interval);
    }

    const loaded = function () {
        slider.hero.classList.add('loaded');
    }

    const touchControl = function () {
        const touchStart = function (e) {
            slider.ts = parseInt(e.changedTouches[0].clientX);
            window.scrollTop = 0;
        }

        const touchMove = function (e) {
            slider.tm = parseInt(e.changedTouches[0].clientX);
            const delta = slider.tm - slider.ts;
            window.scrollTop = 0;

            if (slider.idle) {
                const direction = delta < 0 ? 'next' : 'prev';
                stopAutoplay();
                changeSlide(direction);
            }
        }

        slider.hero.addEventListener('touchstart', touchStart);
        slider.hero.addEventListener('touchmove', touchMove);
    }

    const start = function () {
        autoplay(true);
        wheelControl();
        window.innerWidth <= 1024 && touchControl();
        slider.aux.addEventListener('transitionend', loaded, {
            once: true
        });
    }

    const loadingAnimation = function () {
        slider.hero.classList.add('ready');
        slider.current.addEventListener('transitionend', start, {
            once: true
        });
    }

    const init = function () {
        createElements();
        setHeight(slider.aux, slider.aux.querySelectorAll('.slide-title'));
        loadingAnimation();
    }

    const resize = function () {
        setHeight(slider.aux, slider.aux.querySelectorAll('.slide-title'));
    }

    return {
        init,
        resize
    }
}

window.addEventListener('load', heroSlider().init);
window.addEventListener("resize", heroSlider().resize);