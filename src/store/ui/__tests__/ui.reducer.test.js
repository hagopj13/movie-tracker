import uiReducer from 'store/ui/ui.reducer';
import { initialState as dialogInitialState } from 'store/ui/dialog/dialog.reducer';

describe('Ui reducer', () => {
  it('should return the initial state', () => {
    const state = uiReducer(undefined, { type: '@@INIT' });
    expect(state).toBeDefined();
    expect(state.dialog).toEqual(dialogInitialState);
  });
});
