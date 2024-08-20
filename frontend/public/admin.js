document.addEventListener('DOMContentLoaded', function() {
    const saveDesignBtn = document.getElementById('save-design');
    const saveDomainBtn = document.getElementById('save-domain');
    const userTable = document.getElementById('user-table');
    
    // Save Design Settings
    saveDesignBtn.addEventListener('click', function() {
        const primaryColor = document.getElementById('primary-color').value;
        const secondaryColor = document.getElementById('secondary-color').value;

        // Send the design settings to the server
        fetch('/api/admin/design', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                primaryColor: primaryColor,
                secondaryColor: secondaryColor
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Design settings saved successfully!');
        })
        .catch(error => {
            console.error('Error saving design settings:', error);
        });
    });

    // Save Domain Settings
    saveDomainBtn.addEventListener('click', function() {
        const domain = document.getElementById('domain').value;

        // Send the domain settings to the server
        fetch('/api/admin/domain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                domain: domain
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Domain settings saved successfully!');
        })
        .catch(error => {
            console.error('Error saving domain settings:', error);
        });
    });

    // Manage Users
    userTable.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-user')) {
            const userId = event.target.dataset.userId;

            // Send delete request to the server
            fetch(`/api/admin/users/${userId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('User deleted successfully!');
                event.target.parentElement.parentElement.remove();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
        }
    });
});