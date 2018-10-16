# Work in progress
## Features


### - Turn System: 
  Atb attached by default
  #### Events:
  ##### - onCharacterUpdate
    Triggered every tick of the Turn System.
  ##### - onCharacterTurn
    Triggered when a character must initiate its turn
  ##### - onCharacterDone
    Triggered when a character must terminate its turn
  ##### - onCharacterDeath
    Triggered when a character is about to die


### - Atb Turn System
  Meh.

### - Character registry
  Players and Enemies. 
  Provides some methods to manage characters, useful for the Battle main loop. 
  Keep in mind that other methods could be added in the future.
  
  #### Useful Methods
  ##### - add
    Add a character to the registry. Then execute addCallback function, passing character as parameter.
  ##### - remove
    Remove a character from the registry. Before execute removeCallback function, passing character as parameter.
  ##### - forEach
    Iterator. Same as javascript Array.forEach method.
  ##### - find
    Return the first character that matches the provided filters. Same as javascript Array.find method.
  ##### - findIndex
    Same as above, only return the character index instead of the character
  ##### - random
    Return a random character
  ##### - randomIndex
    Return a random character index



## Bugs
  #### - **F\*\*\*** Battle Animator. Took time to figure this one
    removeFirstAction method didn't work properly. Fixed

