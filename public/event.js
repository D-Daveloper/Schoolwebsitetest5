
const navBar = document.querySelector("#nav-bar");
console.log(navBar.getBoundingClientRect().top)
const body = document.body;
let lastScroll = 0;
const sidebar = document.querySelector(".side-bar");
window.addEventListener("scroll",() => {
    let currentscroll = window.scrollY
    if (currentscroll <= 0){
        body.classList.remove("scroll-up")
    }
    if (sidebar.classList.contains("open-sidebar")){
        return;
    }
    if (window.scrollY >= 400 && currentscroll > lastScroll && !body.classList.contains("scroll-down")){
        body.classList.remove("scroll-up")
        body.classList.add("scroll-down")
    }
    // }
    if ( currentscroll < lastScroll && body.classList.contains("scroll-down")){
        body.classList.remove("scroll-down")
        body.classList.add("scroll-up")
    }

    lastScroll = currentscroll;
})

function sideBar(e) {
    e.preventDefault();
    const sidebar = document.querySelector(".side-bar");
    const firstBar = document.querySelector(".first-bar");

    // firstBar.style.display = "none";
    sidebar.classList.toggle("open-sidebar")
    // document.body.classList.add("fixed");
}

function closeBar(e) {
    e.preventDefault();
    const sidebar = document.querySelector(".side-bar");
    const firstBar = document.querySelector(".first-bar");

    // firstBar.style.display = "block"; // Show the first bar again
    sidebar.style.display = 'none';
    // document.body.classList.remove("fixed");
}

document.querySelector(".first-bar").addEventListener("click", sideBar);
const Contact = document.querySelector(".contactside")

function contact(){
    const sidebar = document.querySelector(".side-bar");
    if (sidebar.classList.contains("open-sidebar")){
        sidebar.classList.remove("open-sidebar")
    }
}

Contact.addEventListener("click",contact);


document.addEventListener("DOMContentLoaded", function () {
    // Get all elements with the class 'fade-in-up'
    var fadeElements = document.querySelectorAll('.fade-in-up');

    function fadeInElements() {
        var triggerHeight = window.innerHeight * 0.95; // Adjust the percentage as needed

        fadeElements.forEach(function (element, index) {
            // Calculate the distance of the element from the top of the viewport
            var elementTop = element.getBoundingClientRect().top;

            // Check if the element is in the viewport and below the trigger height
            if (elementTop - triggerHeight < 0) {
                // Calculate staggered delay based on index
                var delay = index * 30; // Adjust the delay as needed

                // Apply the delay using CSS style
                element.style.transitionDelay = delay + 'ms';

                // Add the 'fade-in' class after the delay
                element.classList.add('fade-in');
            }
        });
    }

    // Attach the fadeInElements function to the scroll event
    window.addEventListener('scroll', fadeInElements);

    // Trigger the fadeInElements function on page load
    fadeInElements();
});

const all_button = document.querySelectorAll(".event-button")
document.addEventListener('click', function(event) {
    // Check if the clicked element is a button with the specified class
    if (event.target.classList.contains('event-button')) {
        const container = event.target.closest(".event-card");
        const paragraph = container.querySelector(".event-content");

        // Check if this paragraph is already open
        const isOpen = paragraph.classList.contains("open");

        // Close all open paragraphs
        const openParagraphs = document.querySelectorAll(".event-content.open");
        openParagraphs.forEach(openPara => {
            openPara.classList.remove("open");
            openPara.classList.add("hide");
        });

        // If the clicked paragraph was not open, open it
        if (!isOpen) {
            paragraph.classList.remove("hide");
            paragraph.classList.add("open");
        }
    }
});
document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('emailInput').value;

    // Example of using fetch to send a POST request to the server
    const show_message = document.querySelector(".subscription")
    function show(){
        show_message.classList.add("show-successfull")
    };
    function hide(){
        show_message.classList.remove("show-successfull")
    };
    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (response.ok) {
            setTimeout(show,100);
            setTimeout(hide,1000);
            document.getElementById('emailInput').value = ''; // Clear input field
        } else {
            throw new Error('Failed to subscribe');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Invalid email or duplicate email.");
    });
});

