# Pseudocode

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/willumz.generic-pseudocode)](https://marketplace.visualstudio.com/items?itemName=willumz.generic-pseudocode)

<!-- [![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/willumz.generic-pseudocode)](https://marketplace.visualstudio.com/items?itemName=willumz.generic-pseudocode) -->

A simple extension for syntax highlighting of generic pseudocode. (file extension: `.pseudo`)

Syntax highlighting exists for multiple variants of common pseudocode keywords, allowing you to use your own style and not confining you to a specific format.

## Table of Contents:

- [Features](#Features)
  - [Syntax Highlighting](#Syntax-Highlighting)
  - [Snippets](#Snippets)
  - [Customisable Keywords](#Customisable-Keywords)
- [Known Bugs](#Known-Bugs)
- [Release Notes](#Release-Notes)

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
continue
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

#### Structs:

```
struct
e.g.
    struct A do

    end
```

#### Template Strings:

```
${}
e.g.
    set user = "John"
    print "Hello, ${user}!"
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

Structs:

![Structs](images/struct.png)

### Snippets

![Snippets](images/snippets.gif)

Note: all snippets have uppercase variants beginning with 'u'

### Customisable Keywords

You can also define your own custom keywords in a config file.

If you aren't content with the predefined keywords included, you can now add your own to a `.pseudoconfig` file located in your user's home directory (`~/.pseudoconfig` or `C:\Users\{username}\.pseudoconfig`).

**To use this feature you must make sure** `editor.semanticHighlighting.enabled` **is set to** `true` **in VSCode.**

The config file should contain a JSON object, with a single key `"custom"` containing an object with a single key `"keyword"` (the only scope currently supported for custom highlighting) which has a value of an array of strings, which holds your custom keywords.

Example:

```json
{
  "custom": {
    "keyword": ["customKeyword", "exampleWord"]
  }
}
```

In the above example, both `customKeyword` and `exampleWord` will be highlighted as keywords.

NOTE: You must reload the extension after editing the config file.

NOTE: Local config files in the active directory are not currently supported. You can currently only use a global config file which is placed in the home directory.

## Known Bugs

- do end autocloses in variables

## Release Notes

### 1.4.0

- Added customisable keywords
- Added optional config file (used to define customisable keywords)

### 1.3.0

- Added `static`, `public`, and `private` modifiers for structs, classes, and functions
- Added the `continue` keyword

### 1.2.0

- Added template strings (e.g. `"Hi ${user.name}"`)

### 1.1.0

- Added structs
- Added `struct` and `structdo` snippets

### 1.0.3

- Fixed bug where do end would be autoclose in strings and comments

### 1.0.2

- Fixed bug which prevented comments in functions and procedures

### 1.0.1

- Minor changes to extension information

### 1.0.0

- Initial release with syntax highlighting and snippets for basic statements and definitions.
