// Source : https://www.w3.org/TR/WCAG-TECHS/SCR24.html
// SCR24: Using progressive enhancement to open new windows on user request
window.onload = addHandlers;
/**
 *
 */
function addHandlers() {
  let links = document.getElementsByClassName('lk-nw');
  Array.prototype.filter.call(links, function(link){
    let nw_span = document.createElement('span');
    nw_span.setAttribute('class', 'sr-only');
    nw_span.textContent = '(ouverture dans une nouvelle fenêtre)';
    link.appendChild(nw_span);
    link.onclick = function(event){return launchWindow(this, event);}
    // UAAG requires that user agents handle events in a device-independent manner
    // but only some browsers do this, so add keyboard event to be sure
    link.onkeypress = function(event){return launchWindow(this, event);}
  });
}
/**
 *
 */
function launchWindow(objAnchor, objEvent) {
  var iKeyCode, bSuccess=false;
  // If the event is from a keyboard, we only want to open the
  // new window if the user requested the link (return or space)
  if (objEvent && objEvent.type == 'keypress') {
    if (objEvent.keyCode) {
      iKeyCode = objEvent.keyCode;
    }
    else if (objEvent.which) {
      iKeyCode = objEvent.which;
    }
    // If not carriage return or space, return true so that the user agent
    // continues to process the action
    if (iKeyCode != 13 && iKeyCode != 32) {
      return true;
    }
  }
  bSuccess = window.open(objAnchor.href);
  // If the window did not open, allow the browser to continue the default
  // action of opening in the same window
  if (!bSuccess) {
    return true;
  }
  // The window was opened, so stop the browser processing further
  return false;
}
