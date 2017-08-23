/* object prototype for a binary tree with the following property,
*    root: the highest node of the tree that possess all other nodes as children.
*     - can be initialized by passing a reference value as an argument when calling constructor
*/
function MorseBinaryTree(node) {
      var MorseBinaryTree = this;
      MorseBinaryTree.root = node;
}

/* object prototype for a node with the following properties,
*     value: String data type that is a represents an alphanumeric or symbolic characters
         - can be initialized with value passed in as an argument when calling constructor
*     left: reference to a child node going "left", which is associated with Morse Code "dot"
*     right: reference to a child node going "right", which is associated with Morse Code "dash"
*/
function MorseNode(input) {
      var MorseNode = this;
      MorseNode.value = input;
      MorseNode.left = null;
      MorseNode.right = null;
}

/* function to return binary tree used to encode and decode Morse
*  wrapper function for function buildTree()
*  var tree is to be the Morse Code binary tree, and var root is its root node
*/
function buildMorseTree() {

      // string used to create Morse Tree. series of characters each followed by its respective Morse Code
      /* codes for the following characters,
      *     alphabet:   abcdefghijklmnopqrstuvwxyz
      *     numeric:    0123456789
      *     symbol:     , : ? ' " / @ = - .
      */
      var sourceString = "e.t-i..a.-n-.m--s...u..-r.-.w.--d-..k-.-g--.o---h....v...-f..-.l.-..p.--.j.---b-...x-..-c-.-.y-.--z--..q--.-5.....4....-3...--2..---1.----6-....7--...8---..9----.0-----,--..--;-.-.-.:---...&.-...+.-.-.?..--..!-.-.--\(-.--.\)-.--.-'.----.\".-..-./-..-.@.--.-.=-...-$...-..-_..--.-\\--....-\\..-.-.-";

      // construct node to be root of tree
      var root = new MorseNode("");

      // generate tree object to receive morse tree, initialized with root node
      var tree = new MorseBinaryTree(root);

      // call function buildTree()
      return buildTree(tree, root, sourceString, "");
}

// function to build a binary tree used to encode and decode Morse
/* parameters
      tree : the tree to be built, returned to function call at function termiantion
      currentNode : node that is the active site of function commands
      string : current state of string to be processed by function
      char : char to be added to tree
*/
function buildTree(tree, currentNode, string, char) {

   // base case: finished processing string. final character added to tree, then return tree
   if (string.length == 0) {
      currentNode.value = char;
      return tree;
   }

   else {

      // var that is datum for conditionals.
      var currentChar = string.charAt(0);

      // currentChar is a Morse dot
      if (currentChar == '.') {
         if (currentNode.left == null) {
            var newNode = new MorseNode("");
            currentNode.left = newNode;
            return buildTree(tree, newNode, string.slice(1, string.length), char);
         }
         else {
            return buildTree(tree, currentNode.left, string.slice(1, string.length), char);
         }
      }

      // currentChar is a Morse dash
      else if (currentChar == '-') {
         if (currentNode.right == null) {
            var newNode = new MorseNode("");
            currentNode.right = newNode;
            return buildTree(tree, newNode, string.slice(1, string.length), char);
         }
         else {
            return buildTree(tree, currentNode.right, string.slice(1, string.length), char);
         }
      }

      // currentChar is an escaped character, or is a dot '.' or dash '-'
      else if (currentChar == '\\') {
         currentNode.value = char;
         return buildTree(tree, tree.root, string.slice(2, string.length), string.charAt(1));
      }

      // currentChar is a character value we want to place into the tree
      else {

         // this step to handle issue with absolute start of function
         if (currentNode == tree.root) {
            return buildTree(tree, currentNode, string.slice(1, string.length), currentChar);
         }
         else {
            currentNode.value = char;
            return buildTree(tree, tree.root, string.slice(1, string.length), currentChar);
         }
      }
   }
}

// generate morse tree object that we use to encode and decode user input
var morseTree = buildMorseTree();

// function to encode user input to Morse Code and return output to textarea .encodeOutput
function morseEncode() {

   var inputMessage = $(".encodeInput").val();
   inputMessage = inputMessage.toLowerCase();
   messageEncoded = encodeInput(inputMessage);
   $(".encodeOutput").html(messageEncoded);
}

// function to encode input string
/* parameters
*     node: current node
*     string:
*/
function encodeInput(string) {

   // base case: string is fully processed
   if (string.length == 0) {
      return "";
   }

   // add slash output code to separate words, encode next word
   else if (string.charAt(0) == ' ') {
      return "/ " + encodeInput(string.slice(1, string.length));
   }

   // continue search for coding character
   else {

      // generate object to pass to function encodeChar
      var objCharCode = {string: " ", toString: function(){return objCharCode.string;}};

      // encode first character of current input string
      encodeChar(morseTree.root, string.charAt(0), objCharCode);

      // create variable to hold character encoding value
      var charCode;
      // assign value of objCharCode.string to charCode
      // if character non-codable, set charCode value as "#"
      if (objCharCode.toString() == " ") {
         charCode = "# "
      }
      else {
         charCode = objCharCode.toString();
      }

      // add character encoding to output string and continue processing remainder of input string
      return  charCode + encodeInput(string.slice(1, string.length));
   }
}

// function to encode a character
function encodeChar (node, target, obj) {

   if (node.value == target) {
		return true;
   }

	else {
		var ifLeft, ifRight;
		if (node.left == null && node.right == null) {
         return false;
      }
      else if (node.left == null && node.right !== null) {
         ifRight = encodeChar(node.right, target, obj);
      }
      else if (node.left !== null && node.right == null) {
         ifLeft = encodeChar(node.left, target, obj);
      }
      else {
         ifLeft = encodeChar(node.left, target, obj);
         if (!ifLeft) {
            ifRight = encodeChar(node.right, target, obj);
         }
      }

		if (ifLeft) {
         obj.string = '.' + obj.toString();
      }
		else if (ifRight) {
         obj.string = '-' + obj.toString();
      }
		return ifLeft || ifRight;
   }
}

// function to decode morse code input by user
// takes user input morse code from textarea.decodeInput and passes into function decodeInput()
// prints result to textarea.decodeOutput
function morseDecode() {
   var morseCode = $(".decodeInput").val();
   var morseDecoded = decodeInput(morseTree.root, morseCode);
   $(".decodeOutput").html(morseDecoded);
}

// function to decode morse
// returns underscore "_" for non-interpretable characters (characters not in the tree, ref source string)
/* parameters
      tree: the tree to be built, returned to function call at function termiantion
      node: node that is the active site of function commands
      input: current state of user input left to be decoded
*/
function decodeInput(node, input) {

   if (input.length == 0) {
      return node.value;
   }
   else {
      var char = input.charAt(0);

      if (char == '#') {
         return decodeInput(morseTree.root, input.slice(1, input.length));
      }

      else if (char == '.') {
         if (node.left !== null) {
            return decodeInput(node.left, input.slice(1, input.length));
         }
         else {
            input = trimInput(input);
            return "#" + decodeInput(morseTree.root, input);
         }
      }

      else if (char == '-') {
         if (node.right !== null) {
            return decodeInput(node.right, input.slice(1, input.length));
         }
         else {
            input = trimInput(input);
            return "#" + decodeInput(morseTree.root, input);
         }
      }

      else if (char == '/') {

         // if user puts a space after slash, skip space so as not to return root.value = undefined
         if (input.charAt(1) == ' ') {
            return node.value + " " + decodeInput(morseTree.root, input.slice(2, input.length));
         }

         else {
            return node.value + " " + decodeInput(morseTree.root, input.slice(1, input.length));
         }
      }

      else if (char == ' ') {

         // skip space and move function along to next character in string
         if (input.charAt(1) == '/') {
            return decodeInput(node, input.slice(1, input.length));
         }
         else {
            return node.value + decodeInput(morseTree.root, input.slice(1, input.length));
         }
      }
   }
}

// function to shorten input string so next processing character(input.charAt(0)) is non-dot or non-dash
function trimInput (input) {
   // if string input is empty, return it
   if (input.length == 0) {
      return input;
   }

   // increment by character to remove all dots and dashes from front of string
   else {
      while (input.charAt(0) == '.' || input.charAt(0) == '-') {
         input = input.slice(1, input.length);
      }
      return input;
   }
}

$(".encodeButton").click(morseEncode);
$(".decodeButton").click(morseDecode);
