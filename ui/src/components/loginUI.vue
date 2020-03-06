<template>
	<center>
		<ASpin :spinning="authInProgress"  tip="Verifying..." :delay="250" size="large">
			<div class="error">{{errorMsg}}</div>
			<AForm id="loginForm" :form="form" @submit="handleSubmit">
				<AFormItem>
					<AInput 
						v-decorator="[
							'userName',
							{ rules: [{ required: true, message: 'Please input your username!' }] },
						]"
						placeholder="Username"
					>
						<AIcon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
					</AInput>
				</AFormItem>
				<AFormItem>
					<AInputPassword
						v-decorator="[
							'password',
							{ rules: [{ required: true, message: 'Please input your Password!' }] },
						]"
						type="password"
						placeholder="Password"
					>
						<AIcon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
					</AInputPassword>
				</AFormItem>
				<AFormItem>
					<AButton type="primary" html-type="submit" class="login-form-button">
						Log in
					</AButton>			
				</AFormItem>
			</AForm>
			<a class="login-social-item google" :href="`http://localhost:32321/oauth/google?redirect=${currentPath}`"><i class="fa fa-arrow-circle-right arrow" aria-hidden="true"></i><i class="fa fa-google" aria-hidden="true"></i> Login with Google </a>
			<br/>
			<a class="login-social-item github" href="http://localhost:32321/oauth/github"><i class="fa fa-arrow-circle-right arrow" aria-hidden="true"></i><i class="fa fa-github" aria-hidden="true"></i> Login with Github</a>					
			<br/>
			<a class="login-social-item facebook" href="http://localhost:32321/oauth/facebook"><i class="fa fa-arrow-circle-right arrow" aria-hidden="true"></i><i class="fa fa-facebook" aria-hidden="true"></i> Login with Facebook</a>		
		</ASpin>
	</center>
</template>
<script>
import AButton from 'ant-design-vue/lib/button';
import AForm from 'ant-design-vue/lib/form';
import AFormItem from 'ant-design-vue/lib/form/FormItem';
import AIcon from 'ant-design-vue/lib/icon';
import AInput from 'ant-design-vue/lib/input';
import AInputPassword from 'ant-design-vue/lib/input/Password';
import ASpin from 'ant-design-vue/lib/spin';

import 'ant-design-vue/lib/button/style';
import 'ant-design-vue/lib/form/style';
import 'ant-design-vue/lib/icon/style';
import 'ant-design-vue/lib/input/style';
import 'ant-design-vue/lib/spin/style';

import Store from '@/store';
import authClient from '@/auth';

export default {
	name: 'LoginUI',
	props: ["currentPath"],
	components: {
		AButton, AForm, AFormItem, AIcon, AInput, AInputPassword, ASpin
	},
	data: function() {
		return {
			authInProgress: false,
			errorMsg: ""
		}
	},
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
				if(err) return; // some form input validation error, nothing to do
				this.errorMsg = "";
				this.authInProgress = true;
				authClient.authenticate({
					strategy: 'local',
					email: values.userName,
					password: values.password
				}).then(res => Store.setUser(res) /* watched by secure.vue to hide the Login ui */)
				.catch(err => {
					this.errorMsg = err.message + " !!";
					Store.clearUser(); // no active user - continue to show the Login ui
				}).finally(() => this.authInProgress = false);
      });
    },
  },	
}
</script>
<style scoped>
#loginForm {
  max-width: 300px;
}
#loginForm .login-form-forgot {
  float: right;
}
#loginForm .login-form-button {
  width: 100%;
}
.error {
	min-height: 2rem;
	line-height: 2rem;
	color: darkred;
}
</style>