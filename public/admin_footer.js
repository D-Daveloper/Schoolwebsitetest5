const body = document.body;
let lastScroll = 0;
window.addEventListener("scroll",() => {
    let currentscroll = window.scrollY
    if (currentscroll <= 0){
        body.classList.remove("scroll-up")
    }

    // if (window.scrollY <= 300){
    //     body.classList.remove("scroll-down")
    if (window.scrollY >= 100 && currentscroll > lastScroll && !body.classList.contains("scroll-down")){
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

function sideBar(){
    const sidebar = document.querySelector(".side-bar")
    document.querySelector(".first-bar").style.display = "none"
    sidebar.style.display = 'flex'

    return false;//to prevent the anchor tag from taking me to the top of the screen  
}

function closeBar(){
    const sidebar = document.querySelector(".side-bar")
    document.querySelector(".first-bar").style.display = "flex"
    sidebar.style.display = 'none'

    return false;
}

document.querySelector(".first-bar").addEventListener("click",sideBar)
document.querySelector(".second-bar").addEventListener("click",closeBar)
// document.addEventListener("DOMContentLoaded", () => {       
//     document.querySelectorAll("a").forEach(link => {
//       link.addEventListener("click", async event => {
//         event.preventDefault(); // Prevent default navigation
//         const token = localStorage.getItem("userToken");
//         const targetUrl = link.href;
//         console.log("Target URL:", targetUrl);
//         console.log("Token before fetch:", token);
        
//         try {
//           const response = await fetch(targetUrl, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`
//             }
//           });
//           if (response.ok) {
//               const html = await response.text();
//       document.body.innerHTML = html; 
//             // Redirect or handle response
//           //   window.location.href = targetUrl;
//           // return;  
//           } else {
//             const errorText = await response.text(); // Get the response body
//             console.error("Navigation failed:", response.statusText, errorText);
//             alert("You are not authorized or an error occurred.");
//           }
//         } catch (error) {
//           console.error("Fetch error:", error);
//         }
//       });
//     });
//   });

// document.getElementById('addEventForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     const form = document.getElementById('addEventForm');
//     console.log(form);
//     const formData = new FormData(form); // Create FormData object from the form
//     console.log(formData)
//     // Output the form data for debugging purposes
//     for (let pair of formData.entries()) {
//         console.log(pair[0] + ': ' + pair[1]);
//     }

//     // Example of using fetch to send a POST request to the server
//     const show_message = document.querySelector(".span");

//     function show() {
//         show_message.classList.add("show-successfull");
//     };

//     function hide() {
//         show_message.classList.remove("show-successfull");
//     };

//     fetch('/addEvent', {
//         method: 'POST',
//         body: formData // Send FormData directly without JSON.stringify
//     })
//     .then(response => {
//         if (response.ok) {
//             setTimeout(show, 100);
//             setTimeout(hide, 1000);
//             // Clear input fields after successful submission
//             form.reset();
//         } else {
//             throw new Error('Failed to subscribe');
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert('Failed to subscribe: ' + error.message);
//     });
// });


