const targetDate = new Date("July 05, 2026 10:00:00");

function updateCountdown() {

    const now = new Date();

    const diff = targetDate - now;

    if(diff <= 0){

        document.getElementById("countdown").innerHTML =
        "<div class='time-value'>Event Started!</div>";

        return;
    }

    const days =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor((diff % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60));

    const minutes =
        Math.floor((diff % (1000 * 60 * 60))
        / (1000 * 60));

    const seconds =
        Math.floor((diff % (1000 * 60))
        / 1000);

    document.getElementById("countdown").innerHTML = `

        <div class="time-block">
            <div class="time-value">${days}</div>
            <div class="time-label">Days</div>
        </div>

        <div class="time-separator">:</div>

        <div class="time-block">
            <div class="time-value">${hours}</div>
            <div class="time-label">Hours</div>
        </div>

        <div class="time-separator">:</div>

        <div class="time-block">
            <div class="time-value">${minutes}</div>
            <div class="time-label">Min</div>
        </div>

        <div class="time-separator">:</div>

        <div class="time-block">
            <div class="time-value">${seconds}</div>
            <div class="time-label">Sec</div>
        </div>
    `;
}

updateCountdown();

setInterval(updateCountdown, 1000);

const galleryImages = [
    "images/og.jpg",
];

let currentGalleryImage = 0;

window.addEventListener("load", () => {

    const image = document.getElementById("galleryImage");

    setInterval(() => {

        image.style.opacity = 0;

        setTimeout(() => {

            // Fixed: always use index 0
            currentGalleryImage = 0;

            image.src = galleryImages[currentGalleryImage];

            image.style.opacity = 1;

        }, 800);

    }, 5000);
});

// Form validation function
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const attendance = document.getElementById("attendance").value;
    const peopleCount = document.getElementById("peopleCount").value;
    const accessibility = document.getElementById("accessibility").value;
    const message = document.getElementById("message").value.trim();

    // Validation errors
    const errors = [];

    if (!name) {
        errors.push("Name is required");
    }

    if (!email) {
        errors.push("Email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please enter a valid email");
    }

    if (!phone) {
        errors.push("Phone number is required");
    } else if (!/^[0-9+\s()-]{7,20}$/.test(phone)) {
        errors.push("Please enter a valid phone number");
    }

    if (!attendance) {
        errors.push("Please select your attendance status");
    }

    if (peopleCount && !/^[1-9][0-9]*$/.test(peopleCount)) {
        errors.push("People count must be a positive number");
    }

    if (errors.length > 0) {
        alert("Validation Errors:\n" + errors.join("\n"));
        return false;
    }

    return true;
}

// RSVP Form submission with error handling
document
    .getElementById("rsvpForm")
    .addEventListener("submit", function(e) {

        e.preventDefault();

        // Validate form first
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();

        formData.append(
            "entry.1191868580",
            document.getElementById("name").value.trim()
        );

        formData.append(
            "entry.1819345462",
            document.getElementById("email").value.trim()
        );

        formData.append(
            "entry.25566787",
            document.getElementById("phone").value.trim()
        );

        formData.append(
            "entry.1075416591",
            document.getElementById("attendance").value
        );

        formData.append(
            "entry.1301912319",
            document.getElementById("peopleCount").value
        );

        formData.append(
            "entry.124294925",
            document.getElementById("accessibility").value
        );

        formData.append(
            "entry.1257208760",
            document.getElementById("message").value.trim()
        );

        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLSd3oiAoQOrBLI9mBcajq2e8F3dRdnVVS95NeNWAXtoggg-lQQ/formResponse",
            {
                method: "POST",
                body: formData
            }
        )
        .then(response => {
            // Check if response is OK
            if (!response.ok) {
                throw new Error(`Submission failed: ${response.status}`);
            }
            return response;
        })
        .then(() => {

            // Hide form and show success message
            document
                .getElementById("rsvpForm")
                .style.display = "none";

            document
                .getElementById("successMessage")
                .style.display = "block";

            document
                .getElementById("successMessage")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

        })
        .catch(error => {

            console.error("Form submission error:", error);

            // Show error message to user
            alert("Sorry, there was an error submitting your form. Please try again or contact us directly.\n\nError: " + error.message);

            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit RSVP";
            }

        });
    });

// Report issues function
function reportIssue() {
    const issueMessage = prompt("Please describe the issue you're experiencing:");
    if (issueMessage) {
        // You can redirect to email, contact form, or error tracking service
        window.location.href = `mailto:your-email@example.com?subject=Website Issue Report&body=${encodeURIComponent(issueMessage)}`;
    }
}
