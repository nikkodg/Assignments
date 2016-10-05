function rowHeights(rows) {
  return rows.map(function(row) {
    return row.reduce(function(max, cell) {
      return Math.max(max, cell.minHeight());
    }, 0);
  });
}

function colWidths(rows) {
  return rows[0].map(function(_, i) {
    return rows.reduce(function(max, row) {
      return Math.max(max, row[i].minWidth());
    }, 0);
  });
}

//creates rows & heights

function drawTable(rows) {
  var heights = rowHeights(rows);
  var widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(function(block) {
      return block[lineNo];
    }).join(" ");
  }

  function drawRow(row, rowNum) {
    var blocks = row.map(function(cell, colNum) {
      return cell.draw(widths[colNum], heights[rowNum]);
    });
    return blocks[0].map(function(_, lineNo) {
      return drawLine(blocks, lineNo);
    }).join("\n");
  }

  return rows.map(drawRow).join("\n");
}

// draws table

function repeat(string, times) {
  var result = "";
  for (var i = 0; i < times; i++)
    result += string;
  return result;
}

function TextCell(text) {
  this.text = text.split("\n");
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce(function(width, line) {
    return Math.max(width, line.length);
  }, 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(line + repeat(" ", width - line.length));
  }
  return result;
};


function BorderedCell(text) {
    TextCell.call(this, text);
}

BorderedCell.prototype = Object.create(TextCell.prototype);
BorderedCell.prototype.draw = function(width, height) {
  var result = [];
  var top = "-";
  var side = "|";
  result.push(repeat(top, width + 4));
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(side  + line + repeat(" ", width- line.length + 2) + side);
  }
    result.push(repeat(top, width + 4));
  return result;
};



function RTextCell(text) {
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  var result = [];
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(repeat(" ", width - line.length) + line);
  }
  return result;
};

//constructor that contains overwritten functions

function CenterTextCell(text) {
    TextCell.call(this, text);
}
CenterTextCell.prototype = Object.create(TextCell.prototype);
CenterTextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(repeat(" ", (width - line.length)/2) + line + repeat(" ", (width - line.length)/2));
    }
    return result;
};

//constructor that centers the text

function dataBorderedTable(data) {
  var keys = Object.keys(data[0]);
  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name];
        return new BorderedCell(String(value));
    });
  });
  return body;
}

//mapss keys to array

function dataCenteredTable(data) {
  var keys = Object.keys(data[0]);
  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name];
        return new CenterTextCell(String(value));
    });
  });
  return body;
}


var food = [
    {place: "Mastro's Ocean Club", price: "$$$$"},
    {place: "Denny's", price: "$"}
]

var people = [
    
]

console.log("Problem 1: ");
console.log(drawTable(dataCenteredTable(food)));
console.log("Problem 2: ");
console.log(drawTable(dataBorderedTable(food)));



//function rowToUppercase()
