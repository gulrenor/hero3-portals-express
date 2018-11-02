// // Animates elements when they scroll into view
// export {}
// let animateEl = () => {
//   let el: any;
//   let winHeight: number;
//   function init(): void {
//     el = document.querySelectorAll('.animate-hidden');
//     winHeight = window.innerHeight;
//     addEventHandlers();
//     checkPosition();
//   }
//   function addEventHandlers() {
//     window.addEventListener('scroll', checkPosition);
//     window.addEventListener('resize', init);
//   }
//   function checkPosition() {
//     for (var i = 0; i < el.length; i++) {
//       var positionFromTop = el[i].getBoundingClientRect().top;
//       if (positionFromTop - winHeight <= 0) {
//         el[i].className = el[i].className.replace(
//           'animate-hidden',
//           'animate-show'
//         );
//       }
//     }
//   }
//   return {
//     init: init
//   };
// };
// animateEl().init();

const license = document.getElementById('license');
const acceptButton = document.getElementById('acceptButton');
const rejectButton = document.getElementById('rejectButton');
const acceptCheck = document.getElementById('acceptCheck');
const registerSubmit = document.getElementById('submit');
let hasRead = false;
let hasAccepted = false;
const form = document.getElementById('registrationForm');
// Check to see if user has scrolled to the 
// bottom of the agreement
function scrolledToBottom(el) {
    return el.scrollHeight - el.scrollTop === el.clientHeight;
}
// Check form validity
function isValid(form) {
    return form.reportValidity();
}
// Enable submit button when form is valid and 
// license is accepted
function checkSubmit() {
    if (registerSubmit && hasAccepted && isValid(form)) {
        registerSubmit.disabled = false;
    }
    else {
        registerSubmit.disabled = true;
    }
}
// Check form validity on keyup
form && form.addEventListener('keyup', (event) => {
    checkSubmit();
});
// Enable accept button if user has read license
license && license.addEventListener('scroll', (event) => {
    if (acceptButton && scrolledToBottom(event.target)) {
        hasRead = true;
        acceptButton.disabled = false;
        rejectButton.disabled = false;
    }
});
// When user clicks accept button
acceptButton && acceptButton.addEventListener('click', (event) => {
    hasAccepted = true;
    // Check to see if the submit button on the form
    // can be enabled
    checkSubmit();
    // Close the dialog and re-enable html scroll
    event.path[3].classList.remove('is-active');
    document.querySelector('html').classList.remove('is-active');
    // Automatically check the acceptance checkbox
    if (acceptCheck) {
        acceptCheck.checked = true;
    }
});
// If a user doesn't agree
rejectButton && rejectButton.addEventListener('click', (event) => {
    hasAccepted = false;
    // Check to see if the submit button on the form
    // can be enabled
    checkSubmit();
    // Close the dialog and re-enable html scroll
    event.path[3].classList.remove('is-active');
    document.querySelector('html').classList.remove('is-active');
    // Automatically uncheck the acceptance checkbox
    if (acceptCheck) {
        acceptCheck.checked = false;
    }
});

// For Material style expansion panels on modal
document.addEventListener('DOMContentLoaded', () => {
    let expansionEls = document.getElementsByClassName('expansion');
    for (let i = 0; i < expansionEls.length; i++) {
        expansionEls[i].addEventListener('click', e => {
            (e.currentTarget.nextSibling.nextSibling.classList.toggle("is-hidden"));
        });
    }
});

// const forms = [...document.querySelectorAll('form')];
// forms.forEach((form) => {
//   form.addEventListener('keyup', function (event) {
//     // Assumes only one button per form!
//     if (form.checkValidity()) {
//       form.querySelector('button').disabled = false;
//     } else {
//       form.querySelector('button').disabled = true;
//     }
//   })
// })
// forms.forEach((form) => {
//   form.checkbox.addEventListener('change', function (event) {
//     // Assumes only one button per form!
//     if (form.checkValidity()) {
//       form.querySelector('button').disabled = false;
//     } else {
//       form.querySelector('button').disabled = true;
//     }
//   })
// })

function addClickEvent(className, target) {
    let list = [...document.getElementsByClassName(className)];
    list.forEach((i) => {
        i.addEventListener('click', (event) => {
            let modal = document.querySelector(target);
            let html = document.querySelector('html');
            // Spawn modal
            modal.classList.add('is-active');
            html.classList.add('is-clipped');
            // Remove on background click
            modal.querySelector('.modal .modal-background').addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.remove('is-active');
                html.classList.remove('is-clipped');
            });
        });
    });
}
addClickEvent('licenseTerms', '#academicEulaModal.modal');
addClickEvent('accounts', '#accountsModal.modal');

// Tab Switching
const TABS = [...document.querySelectorAll('#tabs li')];
const CONTENT = [...document.querySelectorAll('#tab-content div')];
const ACTIVE_CLASS = 'is-active';
function initTabs() {
    TABS.forEach((tab) => {
        tab.addEventListener('click', (e) => {
            let selected = tab.getAttribute('data-tab');
            updateActiveTab(tab);
            updateActiveContent(selected);
        });
    });
}
function updateActiveTab(selected) {
    TABS.forEach((tab) => {
        if (tab && tab.classList.contains(ACTIVE_CLASS)) {
            tab.classList.remove(ACTIVE_CLASS);
        }
    });
    selected.classList.add(ACTIVE_CLASS);
}
function updateActiveContent(selected) {
    CONTENT.forEach((item) => {
        if (item && item.classList.contains(ACTIVE_CLASS)) {
            item.classList.remove(ACTIVE_CLASS);
        }
        let data = item.getAttribute('data-content');
        if (data === selected) {
            item.classList.add(ACTIVE_CLASS);
        }
    });
}
initTabs();
