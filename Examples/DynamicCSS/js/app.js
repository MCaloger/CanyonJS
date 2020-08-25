canyon.store.color = canyon.field("color", "white")

canyon.actions.toggleColor = canyon.action("toggleColor", ["click"], () => {
    const color = canyon.store.color.get()
    if(color === "white") {
        canyon.store.color.set("black")
    } else {
        canyon.store.color.set("white")
    }
})

canyon.actions.copyColor = canyon.action("copyColor", ["click"], () => {

})

canyon.watchers.colorWatcher = canyon.watch([canyon.store.color], () => {

    let idGenerator = () => {
        let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        let id = '';

        for(let i = 0 ; i < 16 ; i++){
            id += alphabet[Math.floor(Math.random() * alphabet.length)];
        }

        return id
    }

    let colorGenerator = () => {
        let colors = '0123456789abcdf'.split('')
        let color = ''
        for(let i = 0 ; i < 6 ; i++){
            color += colors[Math.floor(Math.random() * colors.length)];
        }
        return color
    }

    let id = idGenerator()
    let color = canyon.store.color.get()
    let opposite = () => {
        if(color() == "white") {
            return "black"
        } else {
            return "white"
        }
    } 

    let color1 = colorGenerator()
    let color2 = colorGenerator()

    let toggleColor = canyon.actions.toggleColor.bind

    let message = "toggle"

    let button = canyon.template(`
        
        <div id="{id}" class="card-1">
            <style>
                html {
                    height: 100%;
                }
                body {
                    height: 100%;
                    margin: 0;
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    background: linear-gradient(45deg, #{color1}, #{color2});
                    display:flex;
                    align-items: center;
                    justify-content: center;

                    font-family: monospace;
                }
                #{id} {
                    color: linear-gradient(45deg, #{color1}, #{color2});
                    background: white;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    border-radius: 10px;

                    width: 100px;
                    height: 100px;

                    padding: 5px;
                    
                }

                #Generate {
                    user-select: none;
                    border: 1px solid black;
                    padding: 5px;
                    background: #{color1};
                    color: #{color2};
                    transition: ease-in .1s;
                }

                #Generate:hover {
                    background: #{color2};
                    color: #{color1};
                    transition: ease-in .1s;
                }

                .card-1 {
                    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
                  }
            </style>    
            <div style="flex: 1; display: flex; flex-firection: row; align-items: center;">
                <div style="background:#{color1}; border: 1px solid black; width: 25px; height: 25px; margin-right: 5px;"></div>
                <div>#{color1}</div>
            </div>
            <div style="flex: 1; display: flex; flex-firection: row; align-items: center;">
                <div style="background:#{color2}; border: 1px solid black; width: 25px; height: 25px; margin-right: 5px;"></div>
                <div>#{color2}</div>
            </div>

            <div style="flex: 1; display: flex; flex-firection: row; align-items: center;">
                <div id="Generate" data-action="{toggleColor}">Generate</div>
            </div>
        </div>
        
        
    `, {id, message, toggleColor, color1, color2})

    
    canyon.render(button, document.getElementById("container"))
})

