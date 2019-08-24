var Sheet = function(name) {
  this.name = name;
  this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
}

// getColumnName(0); => "A"
// getColumnName(1); =>  "B"
// getColumnName(25); => "Z"
// getColumnName(26); => "AA"
// getColumnName(27); => "AB"
// getColumnName(80085) => "DNLF"
Sheet.getColumnName = function(i) {
  const previousLetters = (i >= 26 ? getColumnName(Math.floor(i / 26) -1 ) : '');
  const lastLetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[i % 26]; 
  return previousLetters + lastLetter;
}

Sheet.prototype = {
  activate: function() {
    this.sheet.activate();
  },
  
  clear: function() {
    this.activate();
    this.sheet.clear({ formatOnly: false, contentsOnly: true });
  },
  
  // range = 'B2:C133'
  fetch: function(range) {
    this.sheet.getRange(range).activate();  
    return this.sheet.getSelection().getActiveRange().getValues();
  },
  
  // range = 'B2:C133'
  // fn = function(row, index) { ... }
  each: function(range, fn) {
    var self = this;
    var data = self.fetch(range);

    for (var r = 0; r < data.length; r++) {
      var row = data[r];
      fn(row, r);
    }
  },
  
  // partialRange tells us which row and column
  // to start with, and which column to end with;
  // the end row is computed programmatically to 
  // construct a full range.
  // partialRange = 'B2:C'
  // fn = function(row, index) { ... }
  eachToLastRow: function(partialRange, fn) {
    var self = this;
    var range = partialRange + self.getLastRowNumber();
    L.l("Sheet (" + self.name + ") -> eachToLastRow range " + range);
    self.each(range, fn);
  },
  
  // returns an Int
  getLastRowNumber: function() {
    return this.sheet.getLastRow();
  },
  
  setValues: function(values) {
    var height = values.length;
    var width = values[0].length - 1;
    var range = 'A1:' + Sheet.getColumnName(width) + height;
    this.sheet.getRange(range).clear();
    this.sheet.getRange(range).setValues(values);
  }
}