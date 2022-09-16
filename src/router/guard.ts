import { NavigationGuardWithThis } from "vue-router";

export const beforeEach: NavigationGuardWithThis<undefined> = (to, from, next) => {
	next();
};
