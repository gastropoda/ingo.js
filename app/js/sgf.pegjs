Collection = (WS GameTree WS)+
GameTree = "(" WS Sequence WS GameTree* WS ")"
Sequence = (WS Node WS)+
Node = ";" (WS Property WS)*
Property = PropIdent (WS PropValue WS)+
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

Stone = Point
Move = Point
Point = LcLetter LcLetter

// text values
SimpleText = SimpleTextToken*
Text = TextToken*
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
WS = [ \t\r\n\f]*
