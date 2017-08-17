// string used to create Morse Tree. series of characters each followed by its respective Morse Code
var sourceString = "e.t-i..a.-n-.m--s...u..-r.-.w.--d-..k-.-g--.o---h....v...-f..-.l.-..p.--.j.---b-...x-..-c-.-.y-.--z--..q--.-"; //5.....4....-3...--2..---1.----6-....7--...8---..9----.0-----,--..--:---...?..--..'.----.\".-..-./-..-.@.--.-.=-...-\\--....-\\..-.-.-",

function MorseBinaryTree(node) {
      var MorseBinaryTree = this;
      MorseBinaryTree.root = node;
}

function MorseNode(input) {
      var MorseNode = this;
      MorseNode.value = input;
      MorseNode.right = null;
      MorseNode.left = null;
}

/* function to return binary tree used to encode and decode Morse
*  wrapper function for function buildTree()
*  var tree is to be the Morse Code binary tree, and var root is its root node
*/

function buildMorseTree() {
      var root = new MorseNode();
      var tree = new MorseBinaryTree(root);
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

   // base case: final character added to tree, return tree via root
   if (string.length == 0) {
      currentNode.value = char;
      return tree;
   }

   else {

      var currentChar = string.charAt(0);

      // currentChar is a Morse dot
      if (currentChar == '.') {
         if (currentNode.left == null) {
            var newNode = new MorseNode();
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
            var newNode = new MorseNode();
            currentNode.right = newNode;
            return buildTree(tree, newNode, string.slice(1, string.length), char);
         }
         else {
            return buildTree(tree, currentNode.right, string.slice(1, string.length), char);
         }
      }

      // currentChar is an escaped character, or is a '.' or '-'
      else if (currentChar == '\\') {
         return buildTree(tree, currentNode, string.slice(2, string.length), string.charAt(1));
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

var morseTree = buildMorseTree();

function morseEncode() {}

function encodeInput() {}

// function to decode morse code input by user
// takes user input morse code from textarea.decodeInput and passes into function decodeInput()
// prints result to textarea.decodeOutput
function morseDecode() {
   var text = $(".decodeInput").val();
   var output = decodeInput(morseTree, morseTree.root, text);
   $(".decodeOutput").html(output);
}

// function to decode morse
/* parameters
      tree : the tree to be built, returned to function call at function termiantion
      node : node that is the active site of function commands
      input: current state of user input left to be decoded
*/
function decodeInput(tree, node, input) {

   if (input.length == 0) {
      return "";
   }
   else {
      var char = input.charAt(0);

      if (char == '/') {
         return " " + decodeInput(tree, tree.root, input.slice(1, input.length));
      }

      else if (char == '.') {
         return decodeInput(tree, node.left, input.slice(1, input.length));
      }

      else if (char == '-') {
         return decodeInput(tree, node.right, input.slice(1, input.length));
      }

      else if (char == ' ') {
         return node.value + decodeInput(tree, tree.root, input.slice(1, input.length));
      }
   }
}

$(".encodeButton").click(morseEncode);
$(".decodeButton").click(morseDecode);
