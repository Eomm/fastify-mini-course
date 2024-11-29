// Shared context: variables accessible by both closures
let sharedCounter = 0;

function createClosureA() {
  // Private state for Closure A
  let privateStateA = 0;

  return function incrementA() {
    privateStateA++; // Only Closure A can modify this
    sharedCounter++; // Shared between both closures
    console.log(
      `Closure A -> Private: ${privateStateA}, Shared: ${sharedCounter}`,
    );
  };
}

function createClosureB() {
  // Private state for Closure B
  let privateStateB = 100;

  return function incrementB() {
    privateStateB += 2; // Only Closure B can modify this
    sharedCounter++; // Shared between both closures
    console.log(
      `Closure B -> Private: ${privateStateB}, Shared: ${sharedCounter}`,
    );
  };
}

// Instantiate both closures
const closureA = createClosureA();
const closureB = createClosureB();

// Interact with each closure
closureA(); // Closure A -> Private: 1, Shared: 1
closureB(); // Closure B -> Private: 102, Shared: 2
closureA(); // Closure A -> Private: 2, Shared: 3
closureB(); // Closure B -> Private: 104, Shared: 4
