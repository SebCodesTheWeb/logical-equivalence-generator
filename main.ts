let TREE_LENGTH = 2;

class Tree {
    root: NodeObject | null | undefined;

    constructor() {
        this.root == null;
    }

    insertRow() {
        
        //First checking if there is a root, otherwise isnerting one
        if(this.root == null) {
            let newNode = new NodeObject("TREE_ROOT");
            this.root = newNode;
        } else {
            this.initalizeTwoChildren(this.root);
        }
    }   

    /** 
     Inserts a new node child to a parent element
     @param parentNode Parent that needs children
     @param newNode This is the node that will be added, either containging 0 or 1
     @param direction This tells if it will add to the left or right child. 0 = left, 1 = right
    */
    insertNode(parentNode: NodeObject, newNode: NodeObject, direction: string = "left") {
        if(direction == "left") {
            if(parentNode.left === null) {
                parentNode.left = newNode;
            }
            else {
                this.initalizeTwoChildren(parentNode.left);
            }
        } else {
            if(parentNode.right === null) {
                parentNode.right = newNode;
            }
            else {
                this.initalizeTwoChildren(parentNode.right);
            }
        }
    }

    //Running two times for child on each side
    initalizeTwoChildren(parentNode: NodeObject) {
        let leftChild: NodeObject = new NodeObject(0);
        let rightChild: NodeObject = new NodeObject(1);

        this.insertNode(parentNode, leftChild, "left");
        this.insertNode(parentNode, rightChild, "right");
    }
}

class NodeObject {
    left: NodeObject | null;
    right: NodeObject | null;
    value: number | string;

    //Initializing children to null
    constructor(value: number | string) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

//n is the number of rows in the tree
function generateTree(n: number) {
    let binaryTree = new Tree();
    binaryTree.insertRow();

    for(let i = 0; i < n; i++) {
        binaryTree.insertRow();
    }

    return binaryTree;
}

//Function fo generating the different combinations
function generateBranches() {
    //Creating list of combinations
    visitChildren(currentTree.root, TREE_LENGTH);
    
    //Adding last [1, 1, 1, 1] that got lost in algorithm
    let buffer: number[] = [];
    for(let i = 0; i < TREE_LENGTH; i++) {
        buffer.push(1);
    }
    branches.push(buffer);
}

/** 
 Inserts a new node child to a parent element
 @param depth The depth is row number counting from the bottom and up, so the bottom layer is 0, and top layer is number of rows
 @param node This is the node whose children will be visited, starting of with the root
 */
let recordedValues: any[] = [];
let branches: any[] = []; 
function visitChildren(node: any, depth: number): number {
    if(node == null) return 1;
    
    //Adding combination
    if(recordedValues.length == TREE_LENGTH) {

        //2 dimensinonal array with all the combinations
        let buffer: number[] = [];
        for(let i = 0; i < recordedValues.length; i++) {
            buffer.push(recordedValues[i]);
        }
        branches.push(buffer);

        //Popping elements based on depth, for new iteration
        for(let j = 0; j < depth+1; j++) {
            recordedValues.pop();
        }
    }

    //Traversing to next child
    if(node.value != "TREE_ROOT") {
        recordedValues.push(node.value);
    }
    if(node.left != null) {
        visitChildren(node.left, depth-1);
    }    
    if(node.right != null) {
        visitChildren(node.right, depth-1);
    }    
    return 0;
}










let currentTree: Tree = generateTree(TREE_LENGTH);
generateBranches();
outputData();

function outputData() {
    const columns: HTMLElement | null = document.getElementById("columns");
    for(let i = 0; i < TREE_LENGTH; i++) {
        columns.innerHTML += `<th>p${i+1}</th>`;
    }
    for(let i = 0; i < branches.length; i++) {
        document.getElementById("table-data").innerHTML += `<tr id="a${i}"></tr>`
        for(let k = 0; k < branches[i].length; k++) {
            console.log(branches[i][k]);
    
            let falseOrTrue: string = "N";
            if(branches[i][k] == false) {
                falseOrTrue = "F";
            } else {
                falseOrTrue = "T";
            }
    
            document.getElementById(`a${i}`).innerHTML += `<td>${falseOrTrue}</td>`;
        }
    }
}


document.getElementById("number-of-statements")?.addEventListener("change", function() {
    TREE_LENGTH = document.getElementById("number-of-statements").value;
    branches = [];
    recordedValues = [];

    currentTree = generateTree(TREE_LENGTH);
    generateBranches();

    document.getElementById("table-data").innerHTML = "";
    document.getElementById("table-data").innerHTML += `        <tr id="columns">
    </tr>`
    outputData();

})