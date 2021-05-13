// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let count = 1; 
  const homeState = {name: 'home', id: -1};
  const settingsState = {name: 'settings', id: 0}; 
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        // add id to each journal entry to track 
        newPost.id = count; 
        count++; 
        
        // add listener to each journal entry to change state
        newPost.addEventListener('click', () => {
          let entryState = {name: 'entry', id: newPost.id};
          history.pushState(entryState, '', '#entry' + entryState.id); 
          setState(entryState); 

        }); 
        document.querySelector('main').appendChild(newPost);
      });

      // add listener to settings button to change state
      document.querySelector('header img').addEventListener('click', () => {
        history.pushState(settingsState, '', '#settings'); 
        setState(settingsState); 
      }); 
      
      // add listener to header title to change state
      document.querySelector('header h1').addEventListener('click', () => {
        // Only change if not on home page already
        if(history.state != null && history.state.name != 'home') {
          history.pushState(homeState, '', location.origin); 
          setState(homeState); 
        }
      });
    });
});

// Listener for back 
window.onpopstate = function(event) {
  setState(event.state); 
}; 
