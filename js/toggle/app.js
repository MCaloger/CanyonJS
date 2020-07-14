const canyon = new Canyon()

canyon.store.color = canyon.field("color", "white")


canyon.actions.toggleColor = canyon.action("toggleColor", ["click"], () => {
    const color = canyon.store.color.get()
    if(color === "white") {
        canyon.store.color.set("black")
    } else {
        canyon.store.color.set("white")
    }
})


canyon.watchers.colorWatcher = canyon.watch([canyon.store.color], () => {
    function e4() {
        var h=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
        var k=['x','x','x','x','x','x','x','x','-','x','x','x','x','-','4','x','x','x','-','y','x','x','x','-','x','x','x','x','x','x','x','x','x','x','x','x'];
        var u='',i=0,rb=Math.random()*0xffffffff|0;
        while(i++<36) {
            var c=k[i-1],r=rb&0xf,v=c=='x'?r:(r&0x3|0x8);
            u+=(c=='-'||c=='4')?c:h[v];rb=i%8==0?Math.random()*0xffffffff|0:rb>>4
        }
        return u
    }

    let id = () => e4()
    let color = () => canyon.store.color.get()
    let opposite = () => {
        if(color() == "white") {
            return "black"
        } else {
            return "white"
        }
    } 

    let toggleColor = () => canyon.actions.toggleColor.bind

    let message = () => "toggle"

    console.log('object', id(), opposite(), color(), toggleColor())

    let generatedStyle = canyon.template(`
    <style>
        #{id} {
            color: {color};
        }

        #{id}:hover {
            color: {opposite};
        }
    </style>
    `, color, id, opposite)

    canyon.render(generatedStyle, document.getElementById("styleContainer"))
    
    let button = canyon.template(`
        
        <button id="{id}" data-action="{toggleColor}">
            Toggle
        </button>
        
    `, id, message, toggleColor, color)

    canyon.render(button, document.getElementById("container"))
})

