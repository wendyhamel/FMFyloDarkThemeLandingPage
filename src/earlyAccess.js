window.getEarlyAccess = function () {
	return {
		email: '',
		requestEarlyAccess: {},
		validation: {
			email: {
				rule: {
					required: function(field) {
						if (field) {
							return { invalid: false, message: ''}
						} else {
							return { invalid:true, message: 'Email address is required' }
						}
					},
					email: function (field) {
						const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
						if (validEmailRegex.test(field)) {
							return { invalid: false, message: ''}
						} else {
							return { invalid:true, message: 'Please enter a valid email address' }
						}
					}
				}
			}
		},
		validate(field) {
			for (const key in this.validation[field].rule) {
				const validationResult = this.validation[field].rule[key](this[field])
				if (validationResult.invalid) {
					this.validation[field].invalid = true
					this.validation[field].message = validationResult.message
					break
				}
				this.validation[field].invalid = false
				this.validation[field].message = ''
			}
		},
		submit() {
			this.validate('email')
			if (this.validation['email'].invalid === false) {
				this.requestEarlyAccess = {
					email: this.email
				}
				this.email = ''
			}
		}
	}
}