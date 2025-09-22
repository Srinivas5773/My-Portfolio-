// Initialize scrolling text animation with 3D flip effect
document.addEventListener('DOMContentLoaded', function() {
    const textItems = document.querySelectorAll('.text-item');
    if (textItems.length === 0) return;

    let currentIndex = 0;
    const DURATION = 3000; // 3 seconds per text
    const TRANSITION_DELAY = 10; // Small delay for smoother transitions
    
    // Initialize first item
    textItems[0].classList.add('active');
    
    function animateText() {
        const currentItem = textItems[currentIndex];
        const nextIndex = (currentIndex + 1) % textItems.length;
        const nextItem = textItems[nextIndex];
        
        // Start exit animation for current item
        currentItem.classList.remove('active');
        currentItem.classList.add('exiting');
        
        // Prepare next item (position it for entry)
        nextItem.classList.add('entering');
        
        // Force reflow to ensure the entering class is applied
        void nextItem.offsetWidth;
        
        // Start entry animation
        setTimeout(() => {
            nextItem.classList.remove('entering');
            nextItem.classList.add('active');
            
            // Clean up previous item
            setTimeout(() => {
                currentItem.classList.remove('exiting');
            }, 300); // Match this with CSS transition duration
            
            // Update current index
            currentIndex = nextIndex;
        }, TRANSITION_DELAY);
    }
    
    // Start the animation loop
    setInterval(animateText, DURATION);
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav item
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Handle contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
    // Typing Effect
    const typedTextSpan = document.querySelector(".typed-text");
    
    // Initialize scrolling text with smooth infinite rotation
    const initScrollingText = () => {
        const textItems = document.querySelectorAll('.text-item');
        const scrollingText = document.querySelector('.scrolling-text');
        
        if (textItems.length > 0) {
            let currentIndex = 0;
            const totalItems = textItems.length;
            const itemHeight = 40; // Match the height in CSS
            const animationDuration = 5000; // 5 seconds per item (increased from 3s)
            
            // Set initial active state
            textItems[0].style.opacity = '1';
            textItems[0].style.transform = 'translateY(0)';
            
            // Function to animate to next item
            function animateToNext() {
                const currentItem = textItems[currentIndex];
                const nextIndex = (currentIndex + 1) % totalItems;
                const nextItem = textItems[nextIndex];
                
                // Fade out current item
                currentItem.style.opacity = '0';
                currentItem.style.transform = 'translateY(-20px)';
                
                // Position and fade in next item
                nextItem.style.opacity = '1';
                nextItem.style.transform = 'translateY(0)';
                
                // Update current index
                currentIndex = nextIndex;
            }
            
            // Start the animation after initial delay
            setTimeout(() => {
                // First animation
                animateToNext();
                
                // Set interval for subsequent animations
                setInterval(animateToNext, animationDuration);
            }, 2000); // Initial delay before starting
        }
    };
    
    if (typedTextSpan) {
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'cursor';
        cursorSpan.textContent = '|';
        typedTextSpan.parentNode.insertBefore(cursorSpan, typedTextSpan.nextSibling);
        
        const textArray = ["Full Stack Developer"];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;
        let isTyping = false;
        
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if (!isTyping) {
                    isTyping = true;
                    typedTextSpan.textContent = '';
                }
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                isTyping = false;
                setTimeout(erase, newTextDelay);
            }
        }
        
        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingDelay + 500);
            }
        }
        
        // Start the typing effect
        if (textArray.length) setTimeout(type, 1000);
        
        // Initialize scrolling text after a delay
        setTimeout(initScrollingText, 1500);
        
        // Cursor blink effect
        setInterval(() => {
            cursorSpan.style.visibility = cursorSpan.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }, 500);
    }
    
    // Mobile navigation toggle
    const mobileNavToggle = document.createElement('div');
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileNavToggle);

    mobileNavToggle.addEventListener('click', function() {
        document.querySelector('body').classList.toggle('mobile-nav-active');
        this.classList.toggle('fa-bars');
        this.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a:not(.disabled)').forEach(navLink => {
        navLink.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('show');
            mobileNavToggle.classList.remove('active');
        });
    });

    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loading"></div>';
    document.body.appendChild(preloader);

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active class
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Highlight active navigation item on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-menu a');

    function highlightNav() {
        let scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    window.addEventListener('load', highlightNav);
});
