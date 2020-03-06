/**
 * Copyright © 2020 Cenacle Research India Private Limited.
 * All Rights Reserved.
 */

const Store = {
	appState: null,
	user: null,
	Login: { authInProgress: false },	

	setUser: function (user) {
		if (this.user) this.clearUser(); // clear existing user
		if (!user) return; // if new user is empty, nothing to do, just return
		this.user = user;
	},

	clearUser: function () {
		this.appState = null;
		this.user = null; // App.vue watches this and forces redirection to Login page;
		this.Login.authInProgress = false;
	}
};

export default Store;
