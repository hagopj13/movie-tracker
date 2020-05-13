import uiSelectors from './ui.selectors';

describe('Ui selectors', () => {
  describe('selectUi', () => {
    it('should return ui state', () => {
      const uiState = {
        dialog: { dialogType: null, dialogProps: {} },
      };
      const currentState = { ui: uiState };
      const selectedUiState = uiSelectors.selectUi(currentState);
      expect(selectedUiState).toEqual(uiState);
    });
  });
});
