import {
	createSelector,
	createEntityAdapter,
	createSlice
} from '@reduxjs/toolkit';
import navigationConfig from 'app/vin-configs/navigationConfig';
import VinUtils from '@vincore/utils';
import i18next from 'i18next';
import _ from '@lodash';

const navigationAdapter = createEntityAdapter();
const emptyInitialState = navigationAdapter.getInitialState();
const initialState = navigationAdapter.upsertMany(
	emptyInitialState,
	navigationConfig
);

export const appendNavigationItem =
	(item, parentId) => (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		return dispatch(
			setNavigation(VinUtils.appendNavItem(navigation, item, parentId))
		);
	};

export const prependNavigationItem =
	(item, parentId) => (dispatch, getState) => {
		const navigation = selectNavigationAll(getState());

		return dispatch(
			setNavigation(VinUtils.prependNavItem(navigation, item, parentId))
		);
	};

export const updateNavigationItem = (id, item) => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(
		setNavigation(VinUtils.updateNavItem(navigation, id, item))
	);
};

export const removeNavigationItem = id => (dispatch, getState) => {
	const navigation = selectNavigationAll(getState());

	return dispatch(setNavigation(VinUtils.removeNavItem(navigation, id)));
};

export const {
	selectAll: selectNavigationAll,
	selectIds: selectNavigationIds,
	selectById: selectNavigationItemById
} = navigationAdapter.getSelectors(state => state.vin.navigation);

const navigationSlice = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setNavigation: navigationAdapter.setAll,
		resetNavigation: (state, action) => initialState
	}
});

export const { setNavigation, resetNavigation } = navigationSlice.actions;

const getUserRole = state => state.auth.user.role;

export const selectNavigation = createSelector(
	[selectNavigationAll, ({ i18n }) => i18n.language, getUserRole],
	(navigation, language, userRole) => {
		function setTranslationValues(data) {
			// loop through every object in the array
			return data.map(item => {
				if (item.translate && item.title) {
					item.title = i18next.t(`navigation:${item.translate}`);
				}

				// see if there is a children node
				if (item.children) {
					// run this function recursively on the children array
					item.children = setTranslationValues(item.children);
				}
				return item;
			});
		}

		return setTranslationValues(
			_.merge(
				[],
				VinUtils.filterRecursive(navigation, item =>
					VinUtils.hasPermission(item.auth, userRole)
				)
			)
		);
	}
);

export const selectFlatNavigation = createSelector(
	[selectNavigation],
	navigation => VinUtils.getFlatNavigation(navigation)
);

export default navigationSlice.reducer;
