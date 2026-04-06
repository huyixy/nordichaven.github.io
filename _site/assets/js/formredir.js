(function () {
	const form = document.getElementById('form');
	const result = document.getElementById('result');
	if (!form || !result) {
		return;
	}

	const msgs = window.formMessages || {
		wait: 'Please wait…',
		error: 'Something went wrong!',
	};

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);
		result.style.display = '';
		result.innerHTML = msgs.wait;

		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: json,
		})
			.then(async (response) => {
				const jsonBody = await response.json();
				if (response.status === 200) {
					result.innerHTML = jsonBody.message;
				} else {
					console.log(response);
					result.innerHTML = jsonBody.message;
				}
			})
			.catch((error) => {
				console.log(error);
				result.innerHTML = msgs.error;
			})
			.then(function () {
				form.reset();
				setTimeout(() => {
					result.style.display = 'none';
				}, 3000);
			});
	});
})();
