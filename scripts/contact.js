document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS User ID

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let subject = document.getElementById("subject").value.trim();
        let message = document.getElementById("message").value.trim();

        if (!name || !email || !subject || !message) {
            document.getElementById("form-status").textContent = "⚠ Please fill all fields before sending.";
            return;
        }

        // Prepare email data
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };

        // Send email via EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
            .then(response => {
                document.getElementById("form-status").textContent = "✅ Your message has been sent successfully!";
                document.getElementById("contact-form").reset();
            })
            .catch(error => {
                document.getElementById("form-status").textContent = "❌ Failed to send message. Try again later.";
            });
    });
});
