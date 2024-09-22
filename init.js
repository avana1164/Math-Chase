(function () {

    //element value will be accessed through the Overworld constructor
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });

    overworld.init();
}) ();