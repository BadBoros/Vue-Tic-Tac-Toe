var blocks = { type: 0 };

var vm = new Vue({

  el: "#app",

  data: {

    blocks: Array.from(
      { length: 9 },
      () => ({
        type: 0
      })
    ),
    turn: 1,
    talks: [],
    nowTalk: ""

  },

  mounted() {

    this.restart()

  },

  watch: {

    blocks: {

      deep: true

    }

  },

  methods: {

    restart() {

      this.blocks = Array.from(
        { length: 9 },
        (d, i) => ({
          // type: 1 - parseInt(Math.random() * 3)
          id: i + 1,
          type: 0
        })
      )

    },

    playGo(block) {

      if (block.type == 0 && this.patternData.length <= 0) {

        block.type = this.turn
        this.turn = -this.turn

      }

      else if (this.winText == 'Game Tie!') {

        return this.restart()

      }

      else {

        alert("Not Allow!")
        if (this.patternData.length > 0) return this.restart()

      }

    },

    pushTalk(t) {

      if (this.nowTalk == "") return false
      this.nowTalk = ""

    }

  },

  computed: {

    patternData() {

      // return this.turn == 1 ? "O's turn" : "X's turn"
      var verifyList = "123, 456, 789, 147, 258, 369, 159, 357"

      var result = verifyList
        .split(",")
        .map((vtext) => {
          var add = this.blocks
            .filter((d, i) => (vtext.indexOf(i + 1) != -1))
            .map((d, i) => d.type)
            .reduce((a, b) => a + b)
          return {
            rule: vtext,
            value: add
          }
        })

      result = result.filter((acc) => Math.abs(acc.value) == 3)
      return result

    },

    winText() {

      var gameover = this.blocks.filter(function (obj) {
        return obj.type == 0;
      });

      if (this.patternData.length > 0) {

        var winner = this.patternData[0].value;

        return (winner > 0 ? 'O' : 'X') + ' Wins!';
        this.playGo = function () {
          return false;
        };

      }

      if (this.patternData.length == 0 && gameover == '') {

        return 'Game Tie!';

      } else {

        return (this.turn == 1 ? 'O' : 'X') + "'s Turn";

      }

    }

  }
  
});