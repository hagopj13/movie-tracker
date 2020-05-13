import dialogActions from './dialog.actions';
import DialogActionTypes from './dialog.types';

describe('Dialog action creators', () => {
  describe('showDialog action creator', () => {
    it('should create the showDialog action', () => {
      const dialogType = 'someDialogType';
      const dialogProps = { someProp: 'someValue' };
      const action = dialogActions.showDialog(dialogType, dialogProps);
      expect(action.type).toBe(DialogActionTypes.SHOW_DIALOG);
      expect(action.payload).toEqual({ dialogType, dialogProps });
    });
  });

  describe('hideDialog action creator', () => {
    it('should create the hideDialog action', () => {
      const dialogType = 'someDialogType';
      const action = dialogActions.hideDialog(dialogType);
      expect(action.type).toBe(DialogActionTypes.HIDE_DIALOG);
      expect(action.payload).toEqual({ dialogType });
    });
  });
});
