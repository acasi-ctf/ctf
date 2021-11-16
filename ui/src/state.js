const initialState = {
  showFlagSubmission: false,
  environmentId: null,
}
const actionHideFlagSubmission = 'flag/hide-submission';
const actionShowFlagSubmission = 'flag/show-submission';
const actionSetEnvironmentId = 'env/set-id';

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionHideFlagSubmission:
      return {...state, showFlagSubmission: false};
    case actionShowFlagSubmission:
      return {...state, showFlagSubmission: true};
    case actionSetEnvironmentId:
      return {...state, environmentId: action.environmentId};
    default:
      return state;
  }
}

export const selectFlagSubmissionVisibility = state => state.showFlagSubmission;
export const selectEnvironmentId = state => state.environmentId;

export const hideFlagSubmission = () => ({
  type: actionHideFlagSubmission,
});

export const showFlagSubmission = () => ({
  type: actionShowFlagSubmission,
});

export const setEnvironmentId = (environmentId) => ({
  type: actionSetEnvironmentId,
  environmentId: environmentId,
})
