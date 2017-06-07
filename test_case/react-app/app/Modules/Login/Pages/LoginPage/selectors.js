/**
 * 全局state selectors
 *
 * Reselect 库可以创建可记忆的(Memoized)、可组合的 selector 函数。
 * Reselect selectors 可以用来高效地计算 Redux store 里的衍生数据。
 */

import { createSelector } from 'reselect';

const selectDefault = () => (state) => state.get('login');

const selectUserInfo = () => createSelector(
	selectDefault(),
	(globalState) => globalState.get('userInfo')
);

const selectUserName = () => createSelector(
	selectDefault(),
	(globalState) => globalState.get('username')
);

const selectPassword = () => createSelector(
	selectDefault(),
	(globalState) => globalState.get('password')
);

const selectLoading = () => createSelector(
	selectDefault(),
	(globalState) => globalState.get('loading')
);

const selectLoginState = () => createSelector(
	selectDefault(),
	(globalState) => globalState.get('islogin')
);

const selectOpenBasePage = () => createSelector(
	selectDefault(),
	(globalState) => globalState.get('gotobase')
);

export {
	selectDefault,
	selectUserInfo,
	selectUserName,
	selectPassword,
	selectLoading,
	selectLoginState,
	selectOpenBasePage,
};
