# Pseudocode

A simple extension for syntax highlighting of generic pseudocode.

Syntax highlighting exists for multiple variants of common pseudocode keywords, allowing you to use your own style and not confining you to a specific format.

## Features

### Syntax Highlighting

The following items have syntax highlighting. Synonyms are separated by spaces.

#### Keywords:
```
output print e.g. output "Hello World"
input
if
else
try
catch except
import
while loop
for
foreach
return
set e.g. set x = 1
switch
case
break
do
end
```
#### Operators:
```
and &&
or ||
not !
in
```
#### Functions:
```
function
procedure
e.g.
    function say(x) do
        print x
    end
    say("Hello World")
```
#### Classes:
```
class
extends
e.g.
    class A do
        constructor() do
            print "Hi"
        end
    end
e.g.
    class B extends A do
        constructor() do
            print "Hi"
        end
    end
```
If Else:

![If else](images/ifelse.png)

Loops:

![Loops](images/loops.png)

Switch:

![Switch](images/switch.png)

Try Catch:

![Try catch](images/trycatch.png)

Functions:

![Functions](images/function.png)

Classes:

![Classes](images/class.png)

### Snippets
![Snippets](images/snippets.gif)

## Release Notes

### 1.0.1

- Minor changes to extension information

### 1.0.0

Initial release with syntax highlighting and snippets for basic statements and definitions.
