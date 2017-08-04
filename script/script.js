var MorseCoder {

   var source: "e.t-i..a.-n-.m--s...u..-r.-.w.--d-..k-.-g--.o---h....v...-f..-.l.-..p.--.j.---b-...x-..-c-.-.y-.--z--..q--.-5.....4....-3...--2..---1.----6-....7--...8---..9----.0-----",

   BinaryTree: function (rootNode) {
      var root = rootNode;
   },

   Node: function (input) {
      var value = input;
      var right = null;
      var left = null;
   },


   // function to build a binary tree used to encode and decode Morse code
   /* parameters
         treeRoot : root of entire binary tree to be returned at end of function
         currentNode : node to be site of action by function
         string : current state of string to be processed by function
         char : char to be added to tree
   */
   buildTree: function (treeRoot, currentNode, string, char) {

      // base case: final character added to tree, return tree via root
      if (string.length == 0) {
         currentNode.value = char;
         return treeRoot;
      }

      else {

         var currentChar = string.charAt(0);

         if (currentChar == ".") {
            if (currentNode.left == null) {
               var newNode = MorseCoder.Node();
               currentNode.left = newNode;
               return MorseCoder.buildTree(treeRoot, newNode, string.slice(1, string.length), char);
            }
            else {
               return MorseCoder.buildTree(treeRoot, currentNode.left, string.slice(1, string.length), char);
            }
         }
         else if (currentChar == "-") {
            if (currentNode.right == null) {
               var newNode = MorseCoder.Node();
               currentNode.right = newNode;
               return MorseCoder.buildTree(treeRoot, newNode, string.slice(1, string.length), char);
            }
            else {
               return MorseCoder.buildTree(treeRoot, currentNode.right, string.slice(1, string.length), char);
            }
         }
         else {
            if (currentNode !== treeRoot) {
               currentNode.value = char;
            }
            return MorseCoder.buildTree(treeRoot, treeRoot, string.slice(1, string.length), currentChar);
         }
      }
   },

}

var morseRoot = MorseCoder.Node();
var morseTree = MorseCoder.buildTree(morseRoot, morseRoot, MorseCoder.source, "");
