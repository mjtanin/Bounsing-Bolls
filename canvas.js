const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

canvas.height = innerHeight - 20;
canvas.width = innerWidth - 20;

addEventListener('resize', () => {
    canvas.height = innerHeight - 20;
    canvas.width = innerWidth - 20;

})

c.beginPath()
c.fillStyle = 'red';
c.fillRect(200, 200, 100, 100);
// c.fillStyle = 'green';
// c.fillRect(350, 300, 100, 100);
// c.fillStyle = 'blue';
// c.fillRect(500, 400, 100, 100);

// c.beginPath()
// c.moveTo(50, 100);
// c.lineTo(100, 300);
// c.lineTo(300, 500);
// c.strokeStyle = 'aqua';
// c.stroke();


// let x = Math.random() * innerWidth;
// let y = Math.random() * innerHeight;
// let dx = 4;
// let dy = 4;

// function animation() {
//     requestAnimationFrame(animation)
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     c.beginPath()
//     c.arc(x, y, 30, Math.PI * 2, false);
//     c.strokeStyle = 'black';
//     c.stroke();
//     c.fillStyle = 'rgba(255, 5, 136, 0.8)';
//     c.fill();

    
//     if(x > innerWidth - 50 || x < 0 + 30 ) {
//         dx = -dx;
//     }
//     if(y > innerHeight - 50 || y < 0 + 30) {
//         dy = -dy;
//     }

//     x += dx
//     y += dy
// }

// animation();

function Circle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.radius = radius;

    this.draw = function() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        // c.strokeStyle = 'black';
        // c.stroke();
        c.shadowColor = this.color;
        c.shadowBlur = 15
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    this.update = function() {
        if(this.x > innerWidth - 50 || this.x < 0 + 30 ) {
            this.dx = -this.dx;
        }
        if(this.y > innerHeight - 50 || this.y < 0 + 30) {
            this.dy = -this.dy;
        }

        if(this.radius > 3) {
            this.radius -= 0.01;
        }
        if(this.radius < 3 ){
            this.radius = (Math.random() * 10) + 1;
        }
    
        this.x += this.dx
        this.y += this.dy

        this.draw()
    }

}

let circleArray = [];

function randomColor(){
    const r = Math.floor((Math.random() * 256));
    const g = Math.floor((Math.random() * 256));
    const b = Math.floor((Math.random() * 256));
    const a = 1 //(Math.round(Math.random() * 100)) / 100;

    return `rgba(${r}, ${g}, ${b}, ${a})`;
}



for(let i = 0; i < 100; i++){
    const x = Math.random() * innerWidth;
    const y = Math.random() * innerHeight;
    const radius = Math.random() * 10 + 1;
    const dx = Math.ceil(Math.random() * 1);
    const dy = Math.ceil(Math.random() * 1);
    const circle = new Circle(x, y, dx, dy, radius, randomColor());
    circleArray.push(circle)

}


let cirArr = []
canvas.addEventListener('mousemove', (e) => {
    let x = e.x,
        y = e.y;
    const dx = Math.ceil(Math.random() * 4);
    const dy = Math.ceil(Math.random() * 4);
    const radius = Math.random() * 20 + 1;

    const circle = new Circle(x, y, dx, dy, radius, randomColor())
    cirArr.push(circle);
    if(cirArr.length > 50) {
        cirArr.shift()
    };

})

let rotate = 0;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'rgba(10, 10, 10, 1)'
    c.fillRect(0, 0, innerWidth, innerHeight);

    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();

    }

    for(let i = 0; i < cirArr.length; i++){
        cirArr[i].update();

    }

    rotate += 0.01;
}

animate()
