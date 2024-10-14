document.addEventListener('DOMContentLoaded', function() {
    // Select all sections and the navigation bar
    const sections = document.querySelectorAll('section');
    const navBar = document.querySelector('nav ul');

    // Build the navigation bar dynamically based on the sections
    sections.forEach(section => {
        const sectionID = section.id;
        const sectionName = section.getAttribute('data-nav');
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = `#${sectionID}`;
        anchor.textContent = sectionName;
        listItem.appendChild(anchor);
        navBar.appendChild(listItem);
    });

    // Add the Comments section to the navigation bar
    const commentsSection = document.getElementById('comments');
    const commentsListItem = document.createElement('li');
    const commentsAnchor = document.createElement('a');
    commentsAnchor.href = `#${commentsSection.id}`;
    commentsAnchor.textContent = 'Comments';
    commentsListItem.appendChild(commentsAnchor);
    navBar.appendChild(commentsListItem);

    // Add smooth scrolling functionality to navigation items
    const navItems = document.querySelectorAll('nav ul li a');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            const sectionID = this.getAttribute('href').substring(1);
            const section = document.getElementById(sectionID);
            // Calculate offset to ensure heading is not hidden under the nav bar
            const offset = section.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;
            window.scrollTo({
                top: offset,
                behavior: 'smooth' // Smooth scroll to the section
            });
        });
    });

    // Function to get the vertical position of a section relative to the viewport
    function getSectionPosition(section) {
        return section.getBoundingClientRect().top;
    }

    // Function to check if a section is in the viewport
    function isSectionInViewport(section) {
        const position = getSectionPosition(section);
        return position >= 0 && position <= window.innerHeight / 2;
    }

    // Function to update the active state of sections based on their position in the viewport
    function updateActiveState() {
        sections.forEach(section => {
            if (isSectionInViewport(section)) {
                section.classList.add('active'); // Add active class to the section
            } else {
                section.classList.remove('active'); // Remove active class from the section
            }
        });
    }

    // Listen for scroll events to update the active state of sections
    window.addEventListener('scroll', updateActiveState);
    updateActiveState();

    // Select the comment form and the comments list
    const commentForm = document.querySelector('.comment-form');
    const commentsList = document.getElementById('comments-list');
    const nameInput = commentForm.querySelector('input[type="text"]');
    const emailInput = commentForm.querySelector('input[type="email"]');
    const commentInput = commentForm.querySelector('textarea');

    // Handle comment form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get and trim form input values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const comment = commentInput.value.trim();

        // Validate form input
        if (!name || !email || !comment || !email.includes('@')) {
            alert('Please fill out all fields and ensure a valid email address.');
            return;
        }

        // Create a new comment element and append it to the comments list
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<p><strong>${name}</strong> (${email})</p><p>${comment}</p>`;
        commentsList.appendChild(commentDiv);

        // Clear form fields after submission
        nameInput.value = '';
        emailInput.value = '';
        commentInput.value = '';
    });

    console.log('Navigation bar built, active state functionality added, and comments section initialized.');
});
