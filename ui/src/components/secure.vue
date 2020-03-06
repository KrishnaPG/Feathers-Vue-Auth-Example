<template>
	<div>
	<div v-if="currentUser == null">
		<slot name="loginUI"><LoginUI :currentPath="currentPath"></LoginUI></slot>
	</div>
	<div v-else>
		<slot></slot>
	</div>
	</div>
</template>
<script>
import Store from '@/store';
import LoginUI from './loginUI';

export default {
	name: 'secure-mixin',
	components: {
		LoginUI
	},
	data: function() {
		return {
			globalState: Store
		}
	},
	watch: {
		currentUser: function(newUser) {
			this.onUserChanged(newUser);
		}
	},
	methods: {
		onUserChanged: function(newUser) {
			// console.error("onUserChanged not implemented: ", this.$options.name);
		},
		isUserTokenValid: function(user) {
			return user && user.token && user.token["expires_at"] > Date.now();
		}
	},
	computed: {
		currentUser: function() {
			return this.globalState.user;
		},
		currentPath: function() {
			return this.$route.path;
		}
	}
}
</script>