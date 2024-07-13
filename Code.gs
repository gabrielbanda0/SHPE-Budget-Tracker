function onFormSubmit(e) {
  // get sheet with Google Form responses
  var formResponseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1');
  var questions = formResponseSheet.getRange(1,1, 1, formResponseSheet.getLastColumn()).getValues()[0];

  var committeeColumnIndex = questions.indexOf('Committee') + 1;
  var dateColumnIndex = questions.indexOf('Timestamp') + 1;
  var descriptionColumnIndex = questions.indexOf('Description of Purchase') + 1;
  var amountSpentColumnIndex = questions.indexOf('Total Amount') + 1;
  var requestColumnIndex = questions.indexOf('Request') + 1;

  var latestResponse = formResponseSheet.getLastRow();
  // read committee name and date/description/amount spent of purchase
  var committee = formResponseSheet.getRange(latestResponse, committeeColumnIndex).getValue();
  var date = formResponseSheet.getRange(latestResponse, dateColumnIndex).getValue();
  var description = formResponseSheet.getRange(latestResponse, descriptionColumnIndex).getValue();
  var amountSpent = formResponseSheet.getRange(latestResponse, amountSpentColumnIndex).getValue();
  var request = formResponseSheet.getRange(latestResponse, requestColumnIndex).getValue();

  // define a mapping of committee names to sheet names
  var committeeSheetMapping = {
    'President': 'President',
    'Executive Relations (VPE)': 'VPE',
    'Executive Administration (VPI)': 'VPI',
    'Fundraising': 'Treasurer',
    'Chapter Development': 'Chapter Director',
    'Professional Development': 'Professional Director',
    'Community Outreach': 'Community Director',
    'Academic Development': 'Academic Director',
    'Leadership Development': 'Leadership Director',
    'Technical Development': 'Technical Director',
    'General Budget': 'General Budget',
    'SHPEtinas': 'SHPEtinas'
  };

  var budgetSheetName = committeeSheetMapping[committee];
  updateBudget(budgetSheetName, date, description, amountSpent, request)
  Logger.log("Updated budget for " + committee);
}


function updateBudget(committee, date, description, amount, request){
  // get corresponding committee's budget sheet
  var budgetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(committee);
  var lastRow = budgetSheet.getLastRow();



  // FALL SEMESTER
  /*
  // when committee spends money
  if(request != 'SEC Funding'){
    //  add the new amount spent to the total amount spent
    var totalAmountSpent = budgetSheet.getRange('C2').getValue() + amount;
    // update budget sheet with new amount spent
    budgetSheet.getRange('C2').setValue(totalAmountSpent);

    // deduct from committee's total budget
    var totalBudget = budgetSheet.getRange('B2').getValue();
    var newBudget = totalBudget - totalAmountSpent;
    budgetSheet.getRange('D2').setValue(newBudget);

    // track amount spent
    budgetSheet.getRange(lastRow + 1, 3).setValue(amount); 
  } 
  // when committee receives money
  else {
    // add amount to remaining budget
    var totalAmountReceived = budgetSheet.getRange('D2').getValue() + amount;
    budgetSheet.getRange('D2').setValue(totalAmountReceived);

    // track amount received
    budgetSheet.getRange(lastRow + 1, 4).setValue(amount); 
  }
  */

  // SPRING SEMESTER
  // when committee spends money
  if(request != 'SEC Funding'){
    //  add the new amount spent to the total amount spent
    var totalAmountSpent = budgetSheet.getRange('C3').getValue() + amount;
    // update budget sheet with new amount spent
    budgetSheet.getRange('C3').setValue(totalAmountSpent);

    // deduct from committee's total budget
    var totalBudget = budgetSheet.getRange('B3').getValue();
    var newBudget = totalBudget - totalAmountSpent;
    budgetSheet.getRange('D3').setValue(newBudget);

    // track amount spent
    budgetSheet.getRange(lastRow + 1, 3).setValue(amount); 
  } 
  // when committee receives money
  else {
    // add amount to remaining budget
    var totalAmountReceived = budgetSheet.getRange('D3').getValue() + amount;
    budgetSheet.getRange('D3').setValue(totalAmountReceived);

    // track amount received
    budgetSheet.getRange(lastRow + 1, 4).setValue(amount); 
  }

  // track each date and description
  budgetSheet.getRange(lastRow + 1, 1).setValue(date);
  budgetSheet.getRange(lastRow + 1, 2).setValue(description);
}
