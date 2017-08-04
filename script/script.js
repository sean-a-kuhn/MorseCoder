var MorseCodeTree {

   // string used to create Morse Tree. series of characters each followed by its respective Morse Code
   var source: "e.t-i..a.-n-.m--s...u..-r.-.w.--d-..k-.-g--.o---h....v...-f..-.l.-..p.--.j.---b-...x-..-c-.-.y-.--z--..q--.-", //5.....4....-3...--2..---1.----6-....7--...8---..9----.0-----,--..--:---...?..--..'.----.\".-..-./-..-.@.--.-.=-...-\\--....-\\..-.-.-",

   Node: function (input) {
      var value = input;
      var right = null;
      var left = null;
   },

   /* function to return binary tree used to encode and decode Morse
   *  wrapper function for function buildTree()
   *  var morseRoot is root node of Morse Tree
   */

   MorseTree: function () {
      var morseRoot = MorseCodeTree.Node();
      return MorseCodeTree.buildTree(morseRoot, morseRoot, MorseCodeTree.source, "");
   },

   // function to build a binary tree used to encode and decode Morse
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
               return MorseCodeTree.buildTree(treeRoot, newNode, string.slice(1, string.length), char);
            }
            else {
               return MorseCodeTree.buildTree(treeRoot, currentNode.left, string.slice(1, string.length), char);
            }
         }
         else if (currentChar == "-") {
            if (currentNode.right == null) {
               var newNode = MorseCoder.Node();
               currentNode.right = newNode;
               return MorseCodeTree.buildTree(treeRoot, newNode, string.slice(1, string.length), char);
            }
            else {
               return MorseCodeTree.buildTree(treeRoot, currentNode.right, string.slice(1, string.length), char);
            }
         }
         else if (currentChar == "\\") {
            return MorseCodeTree.buildTree(treeRoot, currentNode, string.slice(2, string.length), string.charAt(1));
         }
         else {
            if (currentNode !== treeRoot) {
               currentNode.value = char;
            }
            return MorseCodeTree.buildTree(treeRoot, treeRoot, string.slice(1, string.length), currentChar);
         }
      }
   },


   },
}

var MorseCoder {

   var morseTree = MorseCodeTree.MorseTree();

   encode: function () {},

   // function to decode morse code input by user
   // takes user input morse code from textarea.decodeInput and passes into function decodeInput()
   // prints result to textarea.decodeOutput
   decode: function () {
      var text = $('.decodeInput').val();
      var output = MorseCoder.decodeInput(MorseCoder.morseTree, MorseCoder.morseTree, text);
      $('.decodeOutput').html(output);
   },

   decodeInput: function (treeRoot, node, input) {

      if (input.length == 0) {
         return "";
      }
      else {
         var char = input.charAt(0);

         if (char == "/") {
            return " " + decodeInput(treeRoot, treeRoot, input.slice(1, input.length));
         }

         else if (char == ".") {
            return decodeInput(treeRoot, node.left, input.slice(1, input.length));
         }

         else if (char == "-") {
            return decodeInput(treeRoot, node.right, input.slice(1, input.length));
         }

         else if (char == " ") {
            return node.value + decodeInput(treeRoot, treeRoot, input.slice(1, input.length));
         }
   },

}

$('.encodeButton').click(MorseCoder.encode);
$('.decodeButton').click(MorseCoder.decode);
