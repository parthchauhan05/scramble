/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/
words =['owe', 'float', 'fantasy', 'cache', 'payment', 'acute', 'humor', 'curtain', 'brave', 'paint', 'tension', 'night', 'confuse', 'article', 'copper', 'example', 'extend', 'develop', 'father', 'primary'] 

const app = new Vue({
  el: "#app",
  data: {
    words: words,
    points: 0,
    strike:0,
    maxStrikes: 3,
    pass: 3,
    currentScrambleWord: null,
    currentWord: null,
    guessedWord: null, 
    restartMessage: null,
    successMessage: "Correct. Next Word!",
    wrongMessage: "Wrong. Try Again!",
    passedMessage: "Last Word Skipped!",
    success: false,
    wrong: false,
    restart: false,
    passed: false,
    noPasses: false
  }, 
  mounted: function() {
    const ls = localStorage.getItem('scramble')
    if (ls) {
      const scramble = JSON.parse(ls)
      this.words = scramble.words
      this.points = scramble.points
      this.strike = scramble.strike
      this.pass = scramble.pass
      this.currentWord = scramble.currentWord
      this.currentScrambleWord = scramble.currentScrambleWord
    }
    else{
      this.words = shuffle(words)
      this.currentWord = this.words[0]
      this.currentScrambleWord = shuffle(this.currentWord)
    }
  },
  watch: {
    strike: function() {
      localStorage.setItem('scramble', JSON.stringify({words: this.words, points: this.points, strike: this.strike, pass: this.pass, currentWord: this.currentWord, currentScrambleWord: this.currentScrambleWord}))
    },
    words: function() {
      localStorage.setItem('scramble', JSON.stringify({words: this.words, points: this.points, strike: this.strike, pass: this.pass, currentWord: this.currentWord, currentScrambleWord: this.currentScrambleWord}))
    },

  },
  methods: {
    keyupCheck: function(e){
      if(!this.restart){
      if(e.keyCode==13){
        if(this.guessedWord){
          this.success = false
          this.wrong = false
          this.passed = false
          this.noPasses = false
          if(this.currentWord == this.guessedWord.toLowerCase().trim()){
            this.points++
            this.words.shift()
            if(this.words.length>0){
              this.currentWord = this.words[0]
              this.currentScrambleWord = shuffle(this.currentWord)
            } else {
              this.currentWord = null
              this.currentScrambleWord = null
              this.restartMessage = "You finished all words"
              this.restart = true
            }
            this.success = true
          } else {
            this.strike++
            if(this.strike >= this.maxStrikes){
              this.restartMessage = "Maximum Strikes Reached"
              this.restart = true
            }
            this.wrong = true
          }
          this.guessedWord = null
        }
      }
      }
    },
    passButton: function (e) {
      if(!this.restart){
      this.success = false
      this.wrong = false
      this.passed = false
      this.noPasses = false
      if(this.pass>0){
        this.pass--
        this.words.shift()
        if(this.words.length>0){
          this.currentWord = this.words[0]
          this.currentScrambleWord = shuffle(this.currentWord)
        } else {
          this.currentWord = null
          this.currentScrambleWord = null
          this.restartMessage = "You finished all words"
          this.restart = true
        }
        this.passed = true
      } else {
        this.success = false
        this.wrong = false
        this.passed = false,
        this.noPasses = true
      }
    }
    },
    restartGame: function(e) {
      this.words = shuffle(words)
      this.points = 0
      this.strike = 0
      this.pass = 3
      this.currentWord = this.words[0]
      this.currentScrambleWord = shuffle(this.currentWord)
      this.guessedWord = null
      this.success = false
      this.wrong = false
      this.restart = false
      this.passed = false
    }
  }
})
