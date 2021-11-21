document.addEventListener('DOMContentLoaded', () => {

	let timer, score, distance, snakeDirection = 'right', type = 'inner',
	food, html = "", snakePosition = [0,1], totalPosition = [],
	availablePosition = [], SnakeDiv, isPause = false, board = document.querySelector('.board');

    for(let i = 0; i < 100; i++) {
    	html += '<div></div>';
    	totalPosition.push(i)
    }

    board.innerHTML = html;
    SnakeDiv = document.querySelectorAll('.board div');
    availablePosition = totalPosition.filter(e => !snakePosition.includes(e))
    
    const startGame = () => {
    	snakePosition.forEach(e => SnakeDiv[e].classList.add('snake'))
    	setScore(0); setDistance(0); clearInterval(timer); isPause = true;

    	food = availablePosition[Math.floor(Math.random() * availablePosition.length)]
    	SnakeDiv[food].classList.add('food')

    	timer = setInterval(addIndex, 500) 
    }

    const resetGame = () => {
        clearInterval(timer)
        setDistance(0); setScore(0);
        food && SnakeDiv[food].classList.remove('food')
        snakePosition.forEach(e => SnakeDiv[e].classList.remove('snake'))
        snakeDirection = 'right'
        snakePosition = [0,1];
        snakePosition.forEach(e => SnakeDiv[e].classList.add('snake'))
    }

    const pauseGame = () => {
        timer = isPause ? clearInterval(timer) : setInterval(addIndex, 500)
        isPause = !isPause;
    }

    const drawGame = index => {
    	SnakeDiv[snakePosition[0]].classList.remove('snake')
    	SnakeDiv[index].classList.add('snake')
    }

    const addIndex = () => {
    	let pos = snakePosition[snakePosition.length-1];

    	if (snakeDirection == 'down') {
    		if (pos - 90 > 0) {
                pos = pos - 90;
            } else {
                pos = pos + 10
            }
    	} else if (snakeDirection == 'top') {
            if (pos - 10 > 0) {
                pos = pos - 10;
            } else {
                pos = pos + 90
            }
    	} else if (snakeDirection == 'left') {
            if (pos%10==0) {
                pos = pos + 9;
            } else {
                pos = pos - 1
            }
    	} else if (snakeDirection == 'right') {
            if ((pos+1)%10==0) {
                pos = pos - 9;
            } else {
    		    pos = pos + 1
            }
    	}

    	drawGame(pos);
    	if (snakePosition.some(e => e == pos)) {
    		resetGame();
    		alert('Game is over ! Play again by pressing Enter')
    		return;
    	}

        snakePosition.push(pos)
    	pos == food ? setFood() : snakePosition.shift(1)
        availablePosition = totalPosition.filter(e => !snakePosition.includes(e))
        setDistance(distance+1)
    }

    const setFood = () => {
    	setScore(score + 1);
    	food && SnakeDiv[food].classList.remove('food')
    	food = availablePosition[Math.floor(Math.random() * availablePosition.length)]
    	SnakeDiv[food].classList.add('food')
    }

    const setScore = num => {
    	score = num;
    	document.querySelector('.score').innerHTML = num
    }

    const setDistance = num => {
    	distance = num;
    	document.querySelector('.distance').innerHTML = num
    }

    // game controller
    window.addEventListener('keyup', e => {
    	if (e.key == 'ArrowUp') {
            snakeDirection = 'top';
    	} else if (e.key == 'ArrowDown') {
            snakeDirection = 'down';
    	} else if (e.key == 'ArrowLeft') {
            snakeDirection = 'left';
    	} else if (e.key == 'ArrowRight') {
            snakeDirection = 'right';
    	} else if (e.code == 'Space') {
            pauseGame()
    	} else if (e.code == 'KeyR') {
            resetGame()
    	} else if (e.code == 'Enter') {
            startGame()
    	}
    })
})