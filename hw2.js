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


//function UnderlinedCell(inner) {
//  this.inner = inner;
//}
//UnderlinedCell.prototype.minWidth = function() {
//  return this.inner.minWidth();
//};
//UnderlinedCell.prototype.minHeight = function() {
//  return this.inner.minHeight() + 1;
//};
//UnderlinedCell.prototype.draw = function(width, height) {
//  return this.inner.draw(width, height - 1)
//    .concat([repeat("-", width)]);
//};

// creates underlined cells for the column names

function BorderedCell(text) {
    TextCell.call(this, text);
}

BorderedCell.prototype = Object.create(TextCell.prototype);
BorderedCell.prototype.draw = function(width, height) {
  var result = [];
  var top = "-";
  var side = "|";
  result.push(repeat(top, width));
  for (var i = 0; i < height; i++) {
    var line = this.text[i] || "";
    result.push(side + repeat(" ", width - line.length) + line + side);
  }
    result.push(repeat(top, width));
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
        result.push(repeat(" ", (width - line.length)/2) + line + repeat(" ", (width - line.length/2)));
    }
    return result;
};

//constructor that centers the text

function dataTable(data) {
  var keys = Object.keys(data[0]);
//  var headers = keys.map(function(name) {
//    return new UnderlinedCell(new TextCell(name));
//  });
  var body = data.map(function(row) {
    return keys.map(function(name) {
      var value = row[name];
      // This was changed:
      if (typeof value == "number")
        return BorderedCell(String(value));
      else
        return BorderedCell(String(value));
    });
  });
  return body;
}

//mapss keys to array

//var MOUNTAINS = [
//  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
//  {name: "Everest", height: 8848, country: "Nepal"},
//  {name: "Mount Fuji", height: 3776, country: "Japan"},
//  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
//  {name: "Vaalserberg", height: 323, country: "Netherlands"},
//  {name: "Denali", height: 6168, country: "United States"},
//  {name: "Popocatepetl", height: 5465, country: "Mexico"}
//];

var food = [
    {place: "Mastro's Ocean Club", price: "$$$$"},
    {place: "Denny's", price: "$"}
]

console.log(drawTable(dataTable(food)));


function rowToUppercase()