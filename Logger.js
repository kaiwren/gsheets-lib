var L = {};

L.levels = {
  log: new Object(),
  debug: new Object(),
  error: new Object() 
};

L.level = L.levels.debug;

L.l = function(object) { 
  Logger.log(object) 
};

L.d = function(object) { 
  if(L.level === L.levels.debug) {
    Logger.log("D: " + object.toString());
  }
}

L.e = function(object) { 
  Logger.log("E: " + object.toString());
}
