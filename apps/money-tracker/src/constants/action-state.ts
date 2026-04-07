export interface ActionState {
  success: boolean;
  error: string | null;
}

export const INITIAL_ACTION_STATE: ActionState = {
  success: false,
  error: null,
};
