function save_options() {
  var colourBlindMode = document.getElementById('colourBlindMode').checked;
  var hideAOM = document.getElementById('hideAOM').checked;
  var enableRetroCalculator = document.getElementById('enableRetroCalculator').checked;
  var budgetRowsHeightSelect = document.getElementById('budgetRowsHeight');
  budgetRowsHeight = budgetRowsHeightSelect.options[budgetRowsHeightSelect.selectedIndex].value;
  var moveMoneyDialog = document.getElementById('moveMoneyDialog').checked;

  chrome.storage.sync.set({
    colourBlindMode: colourBlindMode,
    hideAOM: hideAOM,
    enableRetroCalculator: enableRetroCalculator,
    budgetRowsHeight: budgetRowsHeight,
    moveMoneyDialog: moveMoneyDialog
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  chrome.storage.sync.get({
    colourBlindMode: false,
    hideAOM: false,
    enableRetroCalculator: true,
    budgetRowsHeight: 0,
    moveMoneyDialog: false
  }, function(items) {
    document.getElementById('colourBlindMode').checked = items.colourBlindMode;
    document.getElementById('hideAOM').checked = items.hideAOM;
    document.getElementById('enableRetroCalculator').checked = items.enableRetroCalculator;
    var budgetRowsHeightSelect = document.getElementById('budgetRowsHeight');
    budgetRowsHeightSelect.value = items.budgetRowsHeight;
    document.getElementById('moveMoneyDialog').checked = items.moveMoneyDialog;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
