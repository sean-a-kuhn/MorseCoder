var MorseCodeTree {

   // string used to create Morse Tree. series of characters each followed by its respective Morse Code
   source: "e.t-i..a.-n-.m--s...u..-r.-.w.--d-..k-.-g--.o---h....v...-f..-.l.-..p.--.j.---b-...x-..-c-.-.y-.--z--..q--.-", //5.....4....-3...--2..---1.----6-....7--...8---..9----.0-----,--..--:---...?..--..'.----.\".-..-./-..-.@.--.-.=-...-\\--....-\\..-.-.-",

   MorseBinaryTree: function (node) {
      var MorseBinaryTree = this;
      MorseBinaryTree.root = node;
   },

   MorseNode: function (input) {
      var MorseNode = this;
      MorseNode.value = input;
      MorseNode.right = null;
      MorseNode.left = null;
   },

   /* function to return binary tree used to encode and decode Morse
   *  wrapper function for function buildTree()
   *  var tree is to be the Morse Code binary tree, and var root is its root node
   */

   morseTree: function () {
      var root = MorseCodeTree.MorseNode();
      var tree = MorseCodeTree.MorseBinaryTree(root);
      return MorseCodeTree.buildTree(tree, root, MorseCodeTree.source, "");
   },

   // function to build a binary tree used to encode and decode Morse
   /* parameters
         tree : the tree to be built, returned to function call at function termiantion
         currentNode : node that is the active site of function commands
         string : current state of string to be processed by function
         char : char to be added to tree
   */
   buildTree: function (tree, currentNode, string, char) {

      // base case: final character added to tree, return tree via root
      if (string.length == 0) {
         currentNode.value = char;
         return tree;
      }

      else {

         var currentChar = string.charAt(0);

         if (currentChar == ".") {
            if (currentNode.left == null) {
               var newNode = MorseCoder.Node();
               currentNode.left = newNode;
               return MorseCodeTree.buildTree(tree, newNode, string.slice(1, string.length), char);
            }
            else {
               return MorseCodeTree.buildTree(tree, currentNode.left, string.slice(1, string.length), char);
            }
         }
         else if (currentChar == "-") {
            if (currentNode.right == null) {
               var newNode = MorseCoder.Node();
               currentNode.right = newNode;
               return MorseCodeTree.buildTree(tree, newNode, string.slice(1, string.length), char);
            }
            else {
               return MorseCodeTree.buildTree(tree, currentNode.right, string.slice(1, string.length), char);
            }
         }
         else if (currentChar == "\\") {
            return MorseCodeTree.buildTree(tree, currentNode, string.slice(2, string.length), string.charAt(1));
         }
         else {
            if (currentNode !== tree.root) {
               currentNode.value = char;
            }
            return MorseCodeTree.buildTree(tree, tree.root, string.slice(1, string.length), currentChar);
         }
      }
   },
};

var MorseCoder {

   morseTree: MorseCodeTree.morseTree(),

   encode: function () {},

   encodeInput: function () {},

   // function to decode morse code input by user
   // takes user input morse code from textarea.decodeInput and passes into function decodeInput()
   // prints result to textarea.decodeOutput
   decode: function () {
      var text = $('.decodeInput').val();
      var output = "oh haiiiii";// MorseCoder.decodeInput(MorseCoder.morseTree, MorseCoder.morseTree.root, text);
      $('.decodeOutput').html(output);
   },

   // function to decode morse
   /* parameters
         tree : the tree to be built, returned to function call at function termiantion
         node : node that is the active site of function commands
         input: current state of user input left to be decoded
   */
   decodeInput: function (tree, node, input) {

      if (input.length == 0) {
         return "";
      }
      else {
         var char = input.charAt(0);

         if (char == "/") {
            return " " + decodeInput(tree, tree.root, input.slice(1, input.length));
         }

         else if (char == ".") {
            return decodeInput(tree, node.left, input.slice(1, input.length));
         }

         else if (char == "-") {
            return decodeInput(tree, node.right, input.slice(1, input.length));
         }

         else if (char == " ") {
            return node.value + decodeInput(tree, tree.root, input.slice(1, input.length));
         }
      }
   }

};

$('.encodeButton').click(MorseCoder.encode);
$('.decodeButton').click(MorseCoder.decode);
