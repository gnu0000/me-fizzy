"use strict";

// rewrite of https://codepen.io/waisbren89/pen/gwvVpP
// by Bennett Waisbren //  https://codepen.io/waisbren89
//
// Craig Fitzgerald

class Fizzy {
   constructor() {
      this.InitAttributes();
      this.InitEvents();
      this.InitState ();
   }

   InitAttributes() {
      this.canvas         = $('#box1 canvas').get(0);
      this.canvas2        = $('#box2 canvas').get(0);
      this.ctx            = this.canvas.getContext("2d");
      this.ctx2           = this.canvas2.getContext("2d");
      this.particles      = {};
      this.particleIndex  = 0,
      this.mouse          = {x:0, y:0}
      this.createRate     = 100; // 100 per sec 
      this.particleIndex  = 0;
      this.lastTime       = 0;
      this.lastCreateTime = 0;
      this.info           = 0;
   }

   InitEvents() {
      $(window).on("resize"                   , (e) => this.Resize(e));
      $(this.canvas).on("mousemove touchmove" , (e) => this.MouseMove(e));
      $('#info').on("click"                   , (e) => this.ToggleInfo(e));
   }

   InitState() {
      this.Resize();
      this.mouse = {x:this.canvas.width/2, y:this.canvas.height/2};
      this.Draw(performance.now());
   }

   Draw(timestamp) {
      if (timestamp - this.lastCreateTime > 1000 / this.createRate) {
         console.log("creating a particle");
         this.particles[this.particleIndex] = new Particle(this.particleIndex++, this.canvas, this.canvas2, this.mouse);
         this.lastCreateTime = timestamp;
      }
      let timeDelta = timestamp - this.lastTime;
      this.lastTime = timestamp;
      
      this.ctx.globalCompositeOperation = 'source-over';
      this.DrawCanvas();
      this.ctx.globalCompositeOperation = 'lighter';

      for (var i in this.particles) {
         let particle = this.particles[i];
         particle.Update(timeDelta);
         if (particle.killMe)
            delete this.particles[i];
      }
      requestAnimationFrame((t) => this.Draw(t));
   }

   DrawCanvas() {
      this.ctx.fillStyle = 'rgba(0,0,0,1)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx2.fillStyle = 'rgba(0,0,0,1)';
      this.ctx2.fillRect(0, 0, this.canvas.width, this.canvas.height);
   }

   MouseMove(e) {
      e = e.originalEvent;
      [this.mouse.x, this.mouse.y] = [e.clientX, e.clientY];
   }

   Resize() {
      let x = $("#box1").outerWidth();
      let y = $("#box1").outerHeight();
      this.canvas.width  = x;
      this.canvas.height = y;
      this.canvas2.width  = x;
      this.canvas2.height = y/4;

      this.ctx2.transform(1, 0, 0, -1, 0, y);
   }

   ToggleInfo() {
      let d = $('#docs');
      (this.info = 1 - this.info) ? d.show() : d.hide();
   }
}


class Particle {
   constructor(index, canvas, canvas2, mouse) {
      this.GRAVITY = 0.5;
      this.MODULUS = 0.5;

      this.index    = index;
      this.canvas   = canvas;
      this.canvas2  = canvas2;
      this.ctx      = canvas.getContext("2d");
      this.ctx2     = canvas2.getContext("2d");
      this.killMe   = 0;
      this.radius   = 8;
      this.pos      = {...mouse};
      this.velocity = {x: this.Random(-40,40), y: this.Random(-40,40)};
      this.hue      = Math.floor(this.Random(30, 60));
      this.light    = Math.floor(this.Random(50, 100));
   }

   Update(timeDelta) {
      this.Draw();
      this.UpdateMetrics(timeDelta);
   }

   Draw() {
      this.color = `hsla(${this.hue},100%,${this.light}%,1)`;
      this.DrawParticle(this.ctx);
      this.DrawParticle(this.ctx2);
   }

   DrawParticle(ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
      ctx.fill();
   }

   UpdateMetrics(timeDelta) {
      this.pos.x      += this.velocity.x * timeDelta / 100;
      this.pos.y      += this.velocity.y * timeDelta / 100;
      this.velocity.y += timeDelta * this.GRAVITY;
      this.radius     -=  timeDelta/300;
      this.killMe      = this.radius < 1.5 || this.pos.x < 0 || this.pos.x > this.canvas.width;

      let bHeight = this.canvas.height - this.radius;
      if (this.pos.y > bHeight) {
         this.velocity.y *= - this.MODULUS;
         this.pos.y = bHeight - (this.pos.y - bHeight);
      }
   }

   Random(min, max) {
      max = max + 1;
      return Math.random() * (max - min+ 1) + min;
   }
}


$(function() {
   let p = new Fizzy();
});
