import dialogSelectors from './dialog.selectors';

describe('Dialog selectors', () => {
  describe('selectDialogType', () => {
    it('should return the type of currently opened dialog', () => {
      const dialogType = 'someDialogType';
      const currentState = {
        ui: {
          dialog: { dialogType },
        },
      };
      const selectedDialogType = dialogSelectors.selectDialogType(currentState);
      expect(selectedDialogType).toBe(dialogType);
    });
  });

  describe('selectDialogProps', () => {
    it('should return the props of currently opened dialog', () => {
      const dialogProps = { someProp: 'someValue' };
      const currentState = {
        ui: {
          dialog: { dialogProps },
        },
      };
      const selectedDialogProps = dialogSelectors.selectDialogProps(currentState);
      expect(selectedDialogProps).toEqual(dialogProps);
    });
  });
});
