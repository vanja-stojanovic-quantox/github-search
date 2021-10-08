window.onload = function() {
    getUser('octocat');
}

function changeTheme(darkTheme) {
    const bodyEl = document.getElementById('body-el');

    if (darkTheme) {
        bodyEl.classList.remove('light');
        bodyEl.classList.add('dark');
        document.getElementById('dark-button').style.display = 'none';
        document.getElementById('light-button').style.display = 'block';
    }
    else {
        bodyEl.classList.remove('dark');
        bodyEl.classList.add('light');
        document.getElementById('light-button').style.display = 'none';
        document.getElementById('dark-button').style.display = 'block';
    }
}

function searchUsers() {
    const username = document.getElementById('git-username').value;
    document.getElementById('error-message').innerHTML = '';

    if (username === '') {
        return;
    }
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://api.github.com/search/users?q=' + username);
    xhttp.send();

    xhttp.onload = function() {
        const response = this.responseText;
        const users = JSON.parse(response);
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        if (users.total_count === 0) {
            document.getElementById('error-message').innerHTML = 'No results';
            return;
        }

        for (let i = 0; i < users.items.length; i++) {
            userList.innerHTML += '<p class="list-element" onclick="getUser(\'' + users.items[i].login + '\')">' + users.items[i].login + '</p>';
        }

        document.getElementById('user-list').style.display = 'block';
    }
}

function getUser(username) {
    document.getElementById('user-list').style.display = 'none';
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'https://api.github.com/users/' + username);
    xhttp.send();

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    xhttp.onload = function() {
        const response = this.responseText;
        const userData = JSON.parse(response);
        
        document.getElementById('user-image').src = userData.avatar_url;

        if(userData.name !== '' && userData.name !== null) {
            document.getElementById('user-name').innerHTML = userData.name;
        }
        else {
            document.getElementById('user-name').innerHTML = userData.login;
        }

        const usernameEl = document.getElementById('user-username');
        usernameEl.innerHTML = '@' + userData.login;
        usernameEl.href = userData.html_url;

        const date = new Date(userData.created_at);
        document.getElementById('card-date-join').innerHTML = 'Joined ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();

        if (userData.bio !== '' && userData.bio !== null) {
            document.getElementById('card-bio').innerHTML = userData.bio;
        }
        else {
            document.getElementById('card-bio').innerHTML = 'This profile has no bio.';
        }
        
        document.getElementById('user-repos').innerHTML = userData.public_repos;

        document.getElementById('user-followers').innerHTML = userData.followers;

        document.getElementById('user-following').innerHTML = userData.following;

        if (userData.location !== '' && userData.location !== null) {
            document.getElementById('user-city').innerHTML = userData.location;
            document.getElementById('user-city').classList.remove('disabled');
            document.getElementById('user-city-icon').classList.remove('disabled');
        }
        else {
            document.getElementById('user-city').innerHTML = 'Not Available';
            document.getElementById('user-city').classList.add('disabled');
            document.getElementById('user-city-icon').classList.add('disabled');
        }

        if (userData.blog !== '' && userData.blog !== null) {
            document.getElementById('user-website').innerHTML = userData.blog;
            document.getElementById('user-website').classList.remove('disabled');
            document.getElementById('user-website-icon').classList.remove('disabled');
        }
        else {
            document.getElementById('user-website').innerHTML = 'Not Available';
            document.getElementById('user-website').classList.add('disabled');
            document.getElementById('user-website-icon').classList.add('disabled');
        }

        if (userData.twitter_username !== '' && userData.twitter_username !== null) {
            document.getElementById('user-twitter').innerHTML = userData.twitter_username;
            document.getElementById('user-twitter').classList.remove('disabled');
            document.getElementById('user-twitter-icon').classList.remove('disabled');
        }
        else {
            document.getElementById('user-twitter').innerHTML = 'Not Available';
            document.getElementById('user-twitter').classList.add('disabled');
            document.getElementById('user-twitter-icon').classList.add('disabled');
        }

        if (userData.company !== '' && userData.company !== null) {
            document.getElementById('user-company').innerHTML = userData.company;
            document.getElementById('user-company').classList.remove('disabled');
            document.getElementById('user-company-icon').classList.remove('disabled');
        }
        else {
            document.getElementById('user-company').innerHTML = 'Not Available';
            document.getElementById('user-company').classList.add('disabled');
            document.getElementById('user-company-icon').classList.add('disabled');
        }
    }
}

function hideSearchList() {
    document.getElementById('user-list').style.display = 'none';
}
