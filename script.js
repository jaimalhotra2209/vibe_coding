class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds (work mode default)
        this.timerId = null;
        this.isRunning = false;
        
        // DOM Elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.workModeButton = document.getElementById('work-mode');
        this.restModeButton = document.getElementById('rest-mode');
        
        // Event Listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.workModeButton.addEventListener('click', () => this.setWorkMode());
        this.restModeButton.addEventListener('click', () => this.setRestMode());
        
        this.updateDisplay();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.reset();
                    // You could add a notification sound here
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        if (this.workModeButton.classList.contains('active')) {
            this.timeLeft = 25 * 60; // 25 minutes
        } else {
            this.timeLeft = 5 * 60; // 5 minutes
        }
        this.updateDisplay();
    }
    
    setWorkMode() {
        this.workModeButton.classList.add('active');
        this.restModeButton.classList.remove('active');
        this.reset();
    }
    
    setRestMode() {
        this.restModeButton.classList.add('active');
        this.workModeButton.classList.remove('active');
        this.reset();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 