// Основной JavaScript файл для сайта

document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('show')) {
                navList.classList.remove('show');
            }
        });
    });
    
    // Обработка кнопок выбора тура
    const destinationButtons = document.querySelectorAll('.destination-btn');
    destinationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            alert(`Спасибо за интерес к направлению "${destination}"! Наш менеджер свяжется с вами для уточнения деталей.`);
        });
    });
    
    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получение данных формы
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Простая валидация
            if (!name || !email || !message) {
                alert('Пожалуйста, заполните все обязательные поля.');
                return;
            }
            
            // Имитация отправки формы
            alert(`Спасибо, ${name}! Ваше сообщение на тему "${subject}" отправлено. Мы свяжемся с вами по email ${email} в ближайшее время.`);
            
            // Сброс формы
            contactForm.reset();
        });
    }
    
    // FAQ аккордеон
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Переключение активного класса для кнопки
            this.classList.toggle('active');
            
            // Переключение отображения ответа
            const answer = this.nextElementSibling;
            if (answer.classList.contains('show')) {
                answer.classList.remove('show');
            } else {
                // Закрытие других открытых ответов
                document.querySelectorAll('.faq-answer.show').forEach(openAnswer => {
                    if (openAnswer !== answer) {
                        openAnswer.classList.remove('show');
                        openAnswer.previousElementSibling.classList.remove('active');
                    }
                });
                
                answer.classList.add('show');
            }
        });
    });
    
    // Обработка изображений в галерее (имитация лайтбокса)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgAlt = this.querySelector('img').alt;
            
            // Создание модального окна
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${imgSrc}" alt="${imgAlt}">
                    <div class="modal-caption">
                        <h3>${this.querySelector('h3').textContent}</h3>
                        <p>${this.querySelector('p').textContent}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Стили для модального окна
            const modalStyle = document.createElement('style');
            modalStyle.textContent = `
                .modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000;
                }
                
                .modal-content {
                    max-width: 90%;
                    max-height: 90%;
                    position: relative;
                }
                
                .modal-content img {
                    max-width: 100%;
                    max-height: 70vh;
                    object-fit: contain;
                }
                
                .close-modal {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    color: white;
                    font-size: 40px;
                    cursor: pointer;
                }
                
                .modal-caption {
                    background-color: white;
                    padding: 20px;
                    border-radius: 0 0 8px 8px;
                }
            `;
            
            document.head.appendChild(modalStyle);
            
            // Закрытие модального окна
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.head.removeChild(modalStyle);
            });
            
            // Закрытие по клику вне изображения
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.head.removeChild(modalStyle);
                }
            });
        });
    });
    
    // Анимация при прокрутке
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .destination-preview, .tip-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Установка начального состояния для анимации
    document.querySelectorAll('.feature-card, .destination-preview, .tip-card, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Запуск анимации при загрузке и прокрутке
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});