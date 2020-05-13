import dialogReducer, { initialState } from './dialog.reducer';
import DialogActionTypes from './dialog.types';

describe('Dialog reducer', () => {
  it('should return the initial state', () => {
    const state = dialogReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should set the dialogType and dialogProps on showDialog action', () => {
    const dialogType = 'someDialogType';
    const dialogProps = { someProp: 'someValue' };
    const action = {
      type: DialogActionTypes.SHOW_DIALOG,
      payload: { dialogType, dialogProps },
    };
    const state = dialogReducer(initialState, action);
    expect(state).toEqual({ dialogType, dialogProps });
  });

  it('should reset the dialogType and dialogProps on hideDialog action, if the dialogType matches the currently opened dialog', () => {
    const dialogType = 'someDialogType';
    const currentState = {
      dialogType,
      dialogProps: { someProp: 'someValue' },
    };
    const action = {
      type: DialogActionTypes.HIDE_DIALOG,
      payload: { dialogType },
    };
    const state = dialogReducer(currentState, action);
    expect(state).toEqual(initialState);
  });

  it('should not reset the dialogType and dialogProps on hideDialog action, if the dialogType does not the currently opened dialog', () => {
    const dialogType = 'someDialogType';
    const currentState = {
      dialogType: 'someOtherDialogType',
      dialogProps: { someProp: 'someValue' },
    };
    const action = {
      type: DialogActionTypes.HIDE_DIALOG,
      payload: { dialogType },
    };
    const state = dialogReducer(currentState, action);
    expect(state).toEqual(currentState);
  });
});
