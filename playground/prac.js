function doSomething() {
    return new Promise( (resolve, reject) => {
        setTimeout(resolve, 2000)
    })
}

doSomething()
.then(() => {
    console.log("hey");
})




