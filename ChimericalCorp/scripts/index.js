// make reference to the List of ENV (guides)
const guideList = document.querySelector('.guides');

// reference for which NavBar items are shown based on logged in / logged out
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

// seting up the UI to dictate which should be shown or not in Nav bar
const setupUI = (user) => {
  if (user) {
    // output user account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
          <div>Logged in as ${user.email}</div>
          <div>C32 Agent Id: ${doc.data().c32agentID}</div>
        `;
        accountDetails.innerHTML = html;
    })

    //toggle UI elements for logged in users
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    //hide account info if not logged in
    accountDetails.innerHTML =  '';

    //toggle UI elements for all others "not loggedin"
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// set up Guides (envs)
const setupGuides = (data) => {

if (data.length){
  let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
          <div class="collapsible-body white">${guide.environment}</div>
        </li>
      `;
      html += li
    });

    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align"> Please Login to Access Environments </h5>'
  }

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

  });
