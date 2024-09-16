const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler for the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default install prompt from showing
  event.preventDefault();
  
  // Store the event so it can be triggered later
  deferredPrompt = event;
  
  // Show the install button
  butInstall.style.display = 'block';
  
  console.log('beforeinstallprompt event triggered');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  const choiceResult = await deferredPrompt.userChoice;
  
  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the install prompt');
  } else {
    console.log('User dismissed the install prompt');
  }
  
  // Clear the deferredPrompt since it can only be used once
  deferredPrompt = null;
  
  // Hide the install button
  butInstall.style.display = 'none';
});

// TODO: Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed successfully', event);
  // Optionally, you can hide the install button after installation
  butInstall.style.display = 'none';
});
