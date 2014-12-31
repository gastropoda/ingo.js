{"a"
  function property(id, value) {
    var property = {};
    property[id] = value;
    return property;
  }

  function nextChar(charString) {
    return String.fromCharCode(charString.charCodeAt(0) + 1);
  }

  function sgfCoordToLettter(coord) {
    return ((coord < "i") ? coord : nextChar(coord)).toUpperCase();
  }
  function sgfCoordToNumber(coord) {
    return coord.charCodeAt(0) - "a".charCodeAt(0) + 1;
  }
  function sgfColor(colorLetter) {
    return { B: "black", W: "white" }[colorLetter];
  }
  function merge(properties) {
    properties = [{}].concat(properties);
    return angular.extend.apply(angular, properties);
  }
}


Collection = v:GameTree+ { return {collection: v}; }
GameTree = WS "(" WS seq:Sequence WS children:GameTree* WS ")" WS {
  return { tree: {
    sequence: seq,
    children: children
    }};
}
Sequence = Node+
Node = WS ";" properties:Property* WS { return merge(properties); }
Property = KnownProperty / UnknownProperty
KnownProperty
  = MoveProperty
  / ForceMoveProperty
  / MoveNumberProperty

MoveProperty =
  WS color:("B"/"W") WS "[" move:Move "]" {
    return {
      move: property(move, sgfColor(color))
    };
  }
ForceMoveProperty = WS "KO" WS { return property("forceMove", true); }
MoveNumberProperty = WS "MN" WS "[" moveNumber:Number "]" { return property("moveNumber", moveNumber); }

UnknownProperty = WS id:PropIdent values:PropValue+ {
  if (values.length === 1) values = values[0];
  return property(id, values);
}
PropIdent = UcLetter+ { return text(); }
PropValue = WS "[" value:CValueType "]" WS { return value; }
CValueType = ValueType / Compose
ValueType
  = Text
  / SimpleText
  / Real
  / Number
  / Double
  / Color
  / Point
  / Move
  / Stone
  / None
Compose = ValueType ":" ValueType
None = ""
Number = [+-]? Digit+
Real = Number ("." Digit+)?
Double = [12]
Color = [BW]

Stone = Point
Move = Point
Point = i:LcLetter j:LcLetter { return sgfCoordToLettter(i) + sgfCoordToNumber(j); }

// text values
SimpleText = chars:SimpleTextToken* { return chars.join(""); }
Text = chars:TextToken* { return chars.join(""); }
SimpleTextToken = TextSoftBreak / TextWhiteSpace / TextEscape / TextChar
TextToken = TextSoftBreak / TextHardBreak / TextWhiteSpace / TextEscape / TextChar
TextSoftBreak = "\\" NewLine { return ""; }
TextHardBreak = NewLine { return "\n"; }
// NB "An application should be able to deal with following linebreaks: LF, CR, LFCR, CRLF"
NewLine = "\n" / "\r" / "\r\n" / "\n\r"
// NB "Escaping: ... exception: whitespaces still have to be converted to space!"
TextWhiteSpace = ("\\"? [ \t\r\n\w])+ { return " "; }
TextEscape = "\\" char:. { return char; }
// FIXME: colon only needs to be escaped in 'Compose' data type
TextChar = [^\]\\:]

Digit = [0-9]
UcLetter = [A-Z]
LcLetter = [a-z]
WS = [ \t\r\n\f]* { return }
