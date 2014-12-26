Collection = GameTree+
GameTree = "(" Sequence GameTree* ")"
Sequence = Node+
Node = ";" Property*
Property = PropIdent PropValue+
PropIdent = UcLetter+
PropValue = "[" CValueType "]"
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
SimpleText = SimpleTextToken*
Text = TextToken*
SimpleTextToken = SoftBreak / WhiteSpace / Escape / TextChar
TextToken = SoftBreak / HardBreak / WhiteSpace / Escape / TextChar
SoftBreak = "\\" NewLine { return ""; }
HardBreak = NewLine { return "\n"; }
// NB "An application should be able to deal with following linebreaks: LF, CR, LFCR, CRLF"
NewLine = "\n" / "\r" / "\r\n" / "\n\r"
// NB "Escaping: ... exception: whitespaces still have to be converted to space!"
WhiteSpace = ("\\"? [ \t\r\n])+ { return " "; }
Escape = "\\" char:. { return char; }
// FIXME: colon only needs to be escaped in 'Compose' data type
TextChar = [^\]\\:]
Stone = Point
Move = Point
Point = LcLetter LcLetter
Digit = [0-9]
UcLetter = [A-Z]
LcLetter = [a-z]
