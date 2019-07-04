function Dot(obj){
    let param = {
        number: obj.number || 20,
        speed: obj.speed || 60,
        radius: obj.radius || 5,
        color: obj.color || '#AFEEEE'
    }
    this.param = param;
}

Dot.prototype.init = function(){
    let canvas = document.createElement('canvas')
    document.getElementsByTagName('body')[0].append(canvas);
    canvas.width = document.body.clientWidth - 10;
    canvas.height = document.body.clientHeight - 10;
    canvas.style.position = 'fixed';
    canvas.style.zIndex = '-10000';
    canvas.style.top = 0;
    canvas.style.left = 0;
    let ctx = canvas.getContext('2d');
    this.param.ctx = ctx;
}

Dot.prototype.dot = function(x,y){
    let ctx = this.param.ctx,
        radius = this.param.radius,
        color = this.param.color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,2*Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.stroke();
}

Dot.prototype.createNumber = function(){
    let number = this.param.number
        canvas = this.param.ctx.canvas, 
        arr = [];
    for(let i =0;i < number;i++){
        arr.push({
            x: parseInt(Math.random() * canvas.width),
            y: parseInt(Math.random() * canvas.height),
            xVector: Boolean(parseInt(Math.random()*2)),
            yVector: Boolean(parseInt(Math.random()*2))
        })
    }
    return arr;
}

Dot.prototype.clear = function(){
    let ctx = this.param.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
}

Dot.prototype.draw = function(arr){
    arr.forEach(item=>{
        let x = item.x, y = item.y;
        this.dot(x,y)
    })
}

Dot.prototype.mouseEvent = function(){
    document.addEventListener('mousemove',(e)=>{
        let x = e.clientX, y = e.clientY;
        this.dot(x,y)
    })
}

const vector = function(position,vector,border, radius){
    let distance, prevVector = vector;
    if(position > border - radius || position < radius){
        vector = !vector
    }
    distance = prevVector == vector ? 1 : parseInt(Math.random() * 6);
    position = vector ? position + distance : position - distance;
    return [position, vector];
}

Dot.prototype.calcPosition = function(arr){
    let xBorder = this.param.ctx.canvas.width,
        yBorder = this.param.ctx.canvas.height,
        radius = this.param.radius;
    arr.forEach(item=>{
        let [x, xVector] = vector(item.x, item.xVector, xBorder, radius),
            [y, yVector] = vector(item.y, item.yVector, yBorder, radius); 
        item.x =x, item.y = y, item.xVector = xVector, item.yVector = yVector;
    })
    return arr;
}

Dot.prototype.do = function(){
    this.init();
    this.mouseEvent();
    let that = this;
    let animation = () => {
        let arr = this.arr === undefined ? this.createNumber() : this.arr;
        this.clear();
        this.arr = this.calcPosition(arr);
        this.draw(arr);
        requestAnimationFrame(animation);    
    }
    animation()
}

var dot = function(param){
    var dot = new Dot(param);
    dot.do();
}