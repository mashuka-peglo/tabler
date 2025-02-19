// Setting items
const items = {
	'theme': { localStorage: 'tablerTheme', default: 'light' },
	'menu-position': { localStorage: 'tablerMenuPosition', default: 'bottom' },
	'menu-behavior': { localStorage: 'tablerMenuBehavior', default: 'sticky' },
	'container-layout': { localStorage: 'tablerContainerLayout', default: 'boxed' }
}

// Theme config
const config = {}
for (const [key, params] of Object.entries(items)) {
   const lsParams = localStorage.getItem(params.localStorage)
   config[key] = lsParams ? lsParams : params.default
}

// Parse url params
const parseUrl = () => {
	const search = window.location.search.substring(1)
	const params = search.split('&')

	for (let i = 0; i < params.length; i++) {
		const arr = params[i].split('=')
		const key = arr[0]
		const value = arr[1]

		if (!!items[key]) {
			// Save to localStorage
			localStorage.setItem(items[key].localStorage, value)

			// Update local variables
			config[key] = value
		}
	}
}

// Toggle form controls
const toggleFormControls = (form) => {
	for (const [key, params] of Object.entries(items)) {
		const elem = form.querySelector(`[name="settings-${key}"][value="${config[key]}"]`)

		if (elem) {
			elem.checked = true
		}
	}
}

// Update body classes
const updateBodyClasses = () => {
	document.body.classList.remove('theme-dark', 'theme-light');
	document.body.classList.add(`theme-${config.theme}`);

	// for (const [key, params] of Object.entries(items)) {
	// 	document.body.setAttribute(`data-${key}`, config[key]);
	// }
}

// Submit form
const submitForm = (form) => {
	// Save data to localStorage
	for (const [key, params] of Object.entries(items)) {
		// Save to localStorage
		const value = form.querySelector(`[name="settings-${key}"]:checked`).value
		localStorage.setItem(params.localStorage, value)

		// Update local variables
		config[key] = value
	}

	// Update body classes
	updateBodyClasses();

	window.dispatchEvent(new Event('resize'));

	(new bootstrap.Offcanvas(form)).hide()
}


// Parse url
parseUrl()

// Update body classes
updateBodyClasses();

// Elements
const form = document.querySelector('#offcanvasSettings')

// Toggle form controls
if (form) {

	form.addEventListener('submit', function (e) {
		e.preventDefault()

		submitForm(form)
	})

	toggleFormControls(form)
}