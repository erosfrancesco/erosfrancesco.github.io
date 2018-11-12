var tween = this.tweens.add({
        targets: image,
        x: 600,
        ease: 'Power1',
        duration: 3000,
        delay: 2000
    });
    

timerEvent = this.time.addEvent({ delay: 1000, callback: () => {console.log('hello there');} });


// TODO:
- make an external lib for animation
- make Action Management System a plugin